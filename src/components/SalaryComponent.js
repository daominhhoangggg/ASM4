import React, { Component } from 'react';
import { Card, CardHeader, CardText } from 'reactstrap';
import formatDecimal from 'format-decimal';
import { Loading } from './LoadingComponent';
import { fetchSalary } from '../redux/ActionCreators';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

function RenderSalary({ staff }) {
  return (
    <Card className="mb-3 p-3">
      <h4>{staff.name}</h4>
      <CardText>Mã nhân viên: {staff.id}</CardText>
      <CardText>Hệ số lương: {staff.salaryScale}</CardText>
      <CardText>Số ngày làm thêm: {staff.overTime}</CardText>
      <CardHeader>{`${formatDecimal(staff.salary, {
        decimal: '.',
        thousands: ',',
        precision: 0,
      })} VND`}</CardHeader>
    </Card>
  );
}

const mapStateToProps = state => {
  return {
    salary: state.salary,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchSalary: () => {
    dispatch(fetchSalary());
  },
});

class Salary extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchSalary();
  }

  render() {
    const salary = this.props.salary.salary.map(staff => {
      return (
        <div key={staff.id} className="col-12 col-md-6 col-lg-4">
          <RenderSalary staff={staff} />
        </div>
      );
    });

    if (this.props.salary.isLoading) {
      return (
        <div className="container my-3">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if (this.props.salary.errMess) {
      <div className="container my-3">
        <div className="row">
          <h4>{this.props.salary.errMess}</h4>
        </div>
      </div>;
    } else {
      return (
        <div className="container my-3">
          <div className="row">{salary}</div>
        </div>
      );
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Salary));
