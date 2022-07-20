import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap";
import dateFormat from "dateformat";

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
        <div className="row border p-3">
          <div className="col-12 col-md-6">
            <CardImg width="120%" src={staff.image} alt={staff.name} />
          </div>
          <div className="col-12 col-md-6">
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
          </div>
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
    const menu =
      this.state.selectedStaff === null ? (
        this.props.staffs.map((staff) => {
          return (
            <Button
              outline
              color="secondary"
              key={staff.id}
              className="col-12 col-md-3 m-2 p-2"
              onClick={() => this.staffSelect(staff)}
            >
              {staff.name}
            </Button>
          );
        })
      ) : (
        <Button
          outline
          color="primary"
          className="col-auto col-md-auto m-2 p-2 rounded text-center border"
          onClick={() => this.staffSelect(null)}
        >
          Trở về
        </Button>
      );

    return (
      <div className="container">
        <div className="row">{menu}</div>
        <div className="row">{this.renderStaff(this.state.selectedStaff)}</div>
      </div>
    );
  }
}

export default Menu;
