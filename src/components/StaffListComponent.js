import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";
import dateFormat from "dateformat";
import { DEPARTMENTS } from "../shared/staffs";

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedStaff: null,
    };
  }

  staffSelect(staff) {
    this.setState({ selectedStaff: staff });
  }

  renderStaff(staff) {
    if (staff != null) {
      return (
        <div className="col-12 col-md-5 m-1">
          <Card>
            <CardBody>
              <CardTitle>Họ và tên: {staff.name}</CardTitle>
              <CardText>
                Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}
              </CardText>
              <CardText>
                Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}
              </CardText>
              <CardText>Phòng ban: {staff.department.name}</CardText>
              <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
              <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
            </CardBody>
          </Card>
        </div>
      );
    } else {
      return (
        <div className="col-12 col-md-5 m-1">
          Bấm vào tên nhân viên để xem thông tin.
        </div>
      );
    }
  }

  render() {
    const menu = this.props.staffs.map((staff) => {
      return (
        <div key={staff.id} className="col-12 col-md-5 m-1">
          <Card onClick={() => this.staffSelect(staff)}>
            <CardTitle>{staff.name}</CardTitle>
          </Card>
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row">{menu}</div>
        <div className="row">{this.renderStaff(this.state.selectedStaff)}</div>
      </div>
    );
  }
}

export default Menu;
