import React, { Component } from 'react';
import { Button, Label, Modal, ModalBody, ModalHeader, Row, Col } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { DEPARTMENTS } from '../shared/staffs';

const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;
const isNumber = val => !isNaN(Number(val));

class NewStaffForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      departments: DEPARTMENTS,
      isModalOpen: false,
      name: '',
      doB: '',
      startDate: '',
      salaryScale: 1,
      department: 'Sale',
      annualLeave: 0,
      overTime: 0,
      touched: {
        name: false,
        doB: false,
        startDate: false,
      },
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmit(values) {
    const newStaff = {
      id: Math.floor(Math.random() * 100 + 10),
      name: values.name,
      doB: values.doB,
      salaryScale: Number(values.salaryScale),
      startDate: values.startDate,
      departmentId: DEPARTMENTS.filter(dept => dept.name === values.department)[0].id,
      annualLeave: Number(values.annualLeave),
      overTime: Number(values.overTime),
      image: '/assets/images/alberto.png',
      salary: Number(values.salaryScale) * 3000000 + Number(values.overTime) * 200000,
    };
    console.log(newStaff);
    this.props.postStaff(newStaff);
  }

  render() {
    const departmentOptions = this.state.departments.map(department => {
      return <option>{department.name}</option>;
    });
    return (
      <div className="col-md-3">
        <Button onClick={this.toggleModal}>
          <span className="fa fa-plus fa-lg"></span>
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Th??m nh??n vi??n</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={values => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="name" md={4}>
                  T??n
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".name"
                    id="name"
                    name="name"
                    placeholder="??i???n t??n nh??n vi??n"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(10),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{
                      required: 'Y??u c???u',
                      minLength: 'Y??u c???u nhi???u h??n 2 k?? t???',
                      maxLength: 'Y??u c???u ??t h??n 11 k?? t???',
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="doB" md={4}>
                  Ng??y sinh
                </Label>
                <Col md={8}>
                  <Control
                    model=".doB"
                    type="date"
                    id="doB"
                    name="doB"
                    value={this.state.tenState}
                    placeholder="dd/mm/yyyy"
                    className="form-control"
                    validators={{
                      required,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".doB"
                    show="touched"
                    messages={{
                      required: 'Y??u c???u nh???p',
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="startDate" md={4}>
                  Ng??y v??o c??ng ty
                </Label>
                <Col md={8}>
                  <Control
                    model=".startDate"
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={this.state.tenState}
                    placeholder="dd/mm/yyyy"
                    className="form-control"
                    validators={{
                      required,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".startDate"
                    show="touched"
                    messages={{
                      required: 'Y??u c???u nh???p',
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="department" md={4}>
                  Ph??ng ban
                </Label>
                <Col md={8}>
                  <Control.select
                    model=".department"
                    id="department"
                    name="department"
                    className="form-control"
                    defaultValue="Sale"
                  >
                    {departmentOptions}
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="salaryScale" md={4}>
                  H??? s??? l????ng
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".salaryScale"
                    id="salaryScale"
                    name="salaryScale"
                    placeholder="1"
                    className="form-control"
                    defaultValue={1}
                    validators={{ isNumber }}
                  />
                  <Errors
                    className="text-danger"
                    model=".salaryScale"
                    show="touched"
                    messages={{
                      isNumber: 'S??? kh??ng h???p l???',
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="annualLeave" md={4}>
                  S??? ng??y ngh??? c??n l???i
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".annualLeave"
                    id="annualLeave"
                    name="annualLeave"
                    placeholder="0"
                    className="form-control"
                    defaultValue={0}
                    validators={{ isNumber }}
                  />
                  <Errors
                    className="text-danger"
                    model=".annualLeave"
                    show="touched"
                    messages={{
                      isNumber: 'S??? kh??ng h???p l???',
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="overTime" md={4}>
                  S??? ng??y ???? l??m th??m
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".overTime"
                    id="overTime"
                    name="overTime"
                    placeholder="0"
                    className="form-control"
                    defaultValue={0}
                    validators={{ isNumber }}
                  />
                  <Errors
                    className="text-danger"
                    model=".overTime"
                    show="touched"
                    messages={{
                      isNumber: 'S??? kh??ng h???p l???',
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{ size: 10, offset: 2 }}>
                  <Button type="submit" color="primary" onClick={this.toggleModal}>
                    Th??m
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default NewStaffForm;
