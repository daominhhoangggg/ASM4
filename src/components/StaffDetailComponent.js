import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Card, CardBody, CardImg, Col, Row } from 'reactstrap';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchDepartments } from '../redux/ActionCreators';

function RenderStaff({ staff, department }) {
  return (
    <div className="col-12 my-2">
      <Card>
        <Row className="no-gutters">
          <Col md="4">
            <CardImg top width="100%" src={staff.image} alt={staff.name} />
          </Col>
          <Col md="8">
            <CardBody>
              <h4>Họ và tên: {staff.name}</h4>
              <p>Ngày sinh: {dateFormat(staff.doB, 'dd/mm/yyyy')}</p>
              <p>Ngày vào công ty: {dateFormat(staff.startDate, 'dd/mm/yyyy')}</p>
              <p>Phòng ban: {department}</p>
              <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
              <p>Số ngày đã làm thêm: {staff.overTime}</p>
              <Button type="submit" className="btn-sm" color="success">
                Chỉnh sửa
              </Button>
            </CardBody>
          </Col>
        </Row>
      </Card>
    </div>
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

class StaffDetail extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchDepartments();
  }

  render() {
    if (this.props.isLoading) {
      return (
        <div className="container my-3">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if (this.props.errMess) {
      return (
        <div className="container my-3">
          <div className="row">
            <h4>{this.props.errMess}</h4>
          </div>
        </div>
      );
    } else if (this.props.staff != null && !this.props.departments.isLoading) {
      const departmentName = this.props.departments.departments.filter(dept => dept.id === this.props.staff.departmentId)[0].name;
      return (
        <div className="container my-3">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/staffs">Nhân viên</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{this.props.staff.name}</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div className="row">
            <RenderStaff staff={this.props.staff} department={departmentName} />
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StaffDetail));
