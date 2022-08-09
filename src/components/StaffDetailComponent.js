import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardImg, CardTitle, Col, Media, Row } from 'reactstrap';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';

function RenderStaff({ staff }) {
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
              <p>Phòng ban: {staff.department.name}</p>
              <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
              <p>Số ngày đã làm thêm: {staff.overTime}</p>
            </CardBody>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

const StaffDetail = props => {
  if (props.staff != null) {
    return (
      <div className="container my-3">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/staffs">Nhân viên</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="row">
          <RenderStaff staff={props.staff} />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default StaffDetail;
