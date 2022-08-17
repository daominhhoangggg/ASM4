import React, { Component } from 'react';
import { Button, Card, CardImg, CardText, Label, Modal, ModalBody, ModalHeader, Row, Col } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { DatePicker } from 'reactstrap-date-picker';

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

class NewStaffForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmit(values) {
    console.log('Current State is: ' + JSON.stringify(values));
    alert('Current State is: ' + JSON.stringify(values));
  }

  render() {
    return (
      <div className="col-md-3">
        <Button onClick={this.toggleModal}>
          <span className="fa fa-plus fa-lg"></span>
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Thêm nhân viên</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={values => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor=".name" md={4}>
                  Tên
                </Label>
                <Col md={8}>
                  <Control.text model=".name" name="name" className="form-control" />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor=".doB" md={4}>
                  Ngày sinh
                </Label>
                <Col>
                  <DatePicker id="doB" />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor=".startDate" md={4}>
                  Ngày vào công ty
                </Label>
                <Col>
                  <DatePicker id="startDate" />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor=".departments" md={4}>
                  Phòng ban
                </Label>
                <Col md={8}>
                  <Control.select model=".departments" name="departments" className="form-control" />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor=".departments" md={4}>
                  Hệ số lương
                </Label>
                <Col md={8}>
                  <Control.text model=".departments" name="departments" className="form-control" />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor=".departments" md={4}>
                  Số ngày nghỉ còn lại
                </Label>
                <Col md={8}>
                  <Control.text model=".departments" name="departments" className="form-control" />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor=".departments" md={4}>
                  Số ngày đã làm thêm
                </Label>
                <Col md={8}>
                  <Control.text model=".departments" name="departments" className="form-control" />
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const Staffs = props => {
  const staffs = props.staffs.map(staff => {
    return (
      <div key={staff.id} className="col-sm-4 col-md-2 my-2">
        <RenderStaffListItem staff={staff} />
      </div>
    );
  });

  return (
    <div className="container my-3">
      <div className="row">
        <div className="col-md-3">
          <h3>Nhân viên</h3>
        </div>
        <NewStaffForm />
      </div>
      <hr />
      <div className="row">{staffs}</div>
    </div>
  );
};

export default Staffs;
