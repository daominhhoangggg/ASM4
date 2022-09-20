import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardText } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { fetchDepartments } from '../redux/ActionCreators';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

function RenderDepartment({ department }) {
  return (
    <Card className="zoom">
      <Link to={`/departments/${department.id}`}>
        <CardHeader>{department.name}</CardHeader>
        <CardBody>
          <CardText>Số lượng nhân viên: {department.numberOfStaff}</CardText>
        </CardBody>
      </Link>
    </Card>
  );
}

const mapStateToProps = state => {
  return {
    departments: state.departments,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchDepartments: () => {
    dispatch(fetchDepartments());
  },
});

class Departments extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchDepartments();
  }

  render() {
    const departments = this.props.departments.departments.map(department => {
      return (
        <div key={department.id} className="col-12 col-md-6 col-lg-4 my-2">
          <RenderDepartment department={department} />
        </div>
      );
    });

    if (this.props.departments.isLoading) {
      return (
        <div className="container my-3">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if (this.props.departments.errMess) {
      return (
        <div className="container my-3">
          <div className="row">
            <h4>{this.props.errMess}</h4>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container my-3">
          <div className="row">
            <div className="col-12">
              <h3>Phòng ban</h3>
              <hr />
            </div>
          </div>
          <div className="row">{departments}</div>
        </div>
      );
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Departments));
