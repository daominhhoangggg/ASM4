import React, { Component } from 'react';
import { Button, Label, Modal, ModalBody, ModalHeader, Row, Col, Form, FormGroup, FormFeedback, Input } from 'reactstrap';
import { DEPARTMENTS, STAFFS } from '../shared/staffs';

class NewStaffForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      departments: DEPARTMENTS,
      isModalOpen: false,
      name: '',
      doB: '',
      startDate: '',
      salaryScale: '',
      department: '',
      annualLeave: '',
      overTime: '',
      touched: {
        name: false,
        doB: false,
        startDate: false,
      },
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleBlur = field => evt => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  validate(name, doB, startDate) {
    const errors = {
      name: '',
      doB: '',
      startDate: '',
    };

    if (this.state.touched.name && name.length === 0) errors.name = 'Yêu cầu nhập';
    else if (this.state.touched.name && name.length < 3) errors.name = 'Yêu cầu nhiều hơn 2 kí tự';
    else if (this.state.touched.name && name.length > 10) errors.name = 'Yêu cầu ít hơn 11 kí tự';

    if (this.state.touched.doB && doB.length === 0) errors.doB = 'Yêu cầu nhập';
    if (this.state.touched.startDate && startDate.length === 0) errors.startDate = 'Yêu cầu nhập';

    return errors;
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.name === 'department' ? `DEPARTMENT[${DEPARTMENTS.indexOf(DEPARTMENTS.filter(department => department.name === target.value)[0]) + 1}]` : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    const newStaff = {
      name: this.state.name,
      doB: this.state.doB,
      startDate: this.state.startDate,
      salaryScale: this.state.salaryScale,
      department: this.state.department,
      annualLeave: this.state.annualLeave,
      overTime: this.state.overTime,
      image: '/assets/images/alberto.png',
    };

    STAFFS.push(newStaff);
  }

  render() {
    const departmentOptions = this.state.departments.map(department => {
      return <option>{department.name}</option>;
    });
    const errors = this.validate(this.state.name, this.state.doB, this.state.startDate);
    return (
      <div className="col-md-3">
        <Button onClick={this.toggleModal}>
          <span className="fa fa-plus fa-lg"></span>
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Thêm nhân viên</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Label htmlFor="name" md={4}>
                  Tên
                </Label>
                <Col md={8}>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={this.state.name}
                    placeholder="Điền tên nhân viên"
                    invalid={errors.name !== ''}
                    onBlur={this.handleBlur('name')}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.name}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="doB" md={4}>
                  Ngày sinh
                </Label>
                <Col md={8}>
                  <Input
                    type="date"
                    id="doB"
                    name="doB"
                    value={this.state.doB}
                    placeholder="dd/mm/yyyy"
                    invalid={errors.doB !== ''}
                    onBlur={this.handleBlur('doB')}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.doB}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="startDate" md={4}>
                  Ngày vào công ty
                </Label>
                <Col md={8}>
                  <Input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={this.state.startDate}
                    placeholder="dd/mm/yyyy"
                    invalid={errors.startDate !== ''}
                    onBlur={this.handleBlur('startDate')}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.startDate}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="department" md={4}>
                  Phòng ban
                </Label>
                <Col md={8}>
                  <Input type="select" id="department" name="department" onChange={this.handleInputChange}>
                    {departmentOptions}
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="salaryScale" md={4}>
                  Hệ số lương
                </Label>
                <Col md={8}>
                  <Input type="text" id="salaryScale" name="salaryScale" placeholder="1" value={this.state.salaryScale} onChange={this.handleInputChange} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="annualLeave" md={4}>
                  Số ngày nghỉ còn lại
                </Label>
                <Col md={8}>
                  <Input type="text" id="annualLeave" name="annualLeave" placeholder="0" value={this.state.annualLeave} onChange={this.handleInputChange} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="overTime" md={4}>
                  Số ngày đã làm thêm
                </Label>
                <Col md={8}>
                  <Input type="text" id="overTime" name="overTime" placeholder="0" value={this.state.overTime} onChange={this.handleInputChange} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md={{ size: 10, offset: 2 }}>
                  <Button type="submit" color="primary" onClick={this.toggleModal}>
                    Thêm
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default NewStaffForm;
