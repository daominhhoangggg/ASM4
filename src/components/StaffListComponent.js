import React from 'react';
import { Card, CardImg, CardText, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderStaffListItem({ staff }) {
  return (
    <Card className="zoom">
      <Link to={`/staffs/${staff.id}`}>
        <CardImg width="100%" src={staff.image} alt={staff.name} />
        <CardText className="text-center p-1">{staff.name}</CardText>
      </Link>
    </Card>
  );
}

const Staffs = props => {
  const staffs = props.staffs.map(staff => {
    return (
      <div key={staff.id} className="col-12 col-md-2 my-2">
        <RenderStaffListItem staff={staff} />
      </div>
    );
  });

  return (
    <div className="container my-3">
      <div className="row">
        <div className="col-12">
          <h3>Nhân viên</h3>
          <hr />
        </div>
      </div>
      <div className="row">{staffs}</div>
    </div>
  );
};

export default Staffs;
