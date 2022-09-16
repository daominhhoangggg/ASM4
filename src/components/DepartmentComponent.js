import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardText } from 'reactstrap';
import { Loading } from './LoadingComponent';

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

const Departments = props => {
  const departments = props.departments.map(department => {
    return (
      <div key={department.id} className="col-12 col-md-6 col-lg-4 my-2">
        <RenderDepartment department={department} />
      </div>
    );
  });

  if (props.deptLoading) {
    return (
      <div className="container my-3">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.deptErrMess) {
    return (
      <div className="container my-3">
        <div className="row">
          <h4>{props.departments.errMess}</h4>
        </div>
      </div>
    );
  } else {
    console.log(props.deptLoading);
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
};

export default Departments;
