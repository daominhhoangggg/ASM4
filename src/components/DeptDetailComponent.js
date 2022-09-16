import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardImg, CardText } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderDeptStaffs({ staff }) {
  return (
    <Card className="zoom">
      <Link to={`/staffs/${staff.id}`}>
        <CardImg width="100%" src={staff.image} alt={staff.name} />
        <CardText className="text-center p-1">{staff.name}</CardText>
      </Link>
    </Card>
  );
}

const DeptStaffs = props => {
  if (props.department != null) {
    const list = props.deptStaffs.map(staff => {
      return (
        <div className="col-6 col-md-4 col-lg-2 my-2">
          <RenderDeptStaffs staff={staff} />
        </div>
      );
    });
    return (
      <div className="container my-3">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/departments">Phòng ban</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.department.name}</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="row">{list}</div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default DeptStaffs;
