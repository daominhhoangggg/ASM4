import React from 'react';
import { Card, CardHeader, CardText } from 'reactstrap';
import formatDecimal from 'format-decimal';

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

const Salary = props => {
  const salary = props.staffs.map(staff => {
    return (
      <div key={staff.id} className="col-12 col-md-6 col-lg-4">
        <RenderSalary staff={staff} />
      </div>
    );
  });

  return (
    <div className="container my-3">
      <div className="row">{salary}</div>
    </div>
  );
};

export default Salary;
