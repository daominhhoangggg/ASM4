import React, { Component } from 'react';
import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Col,
} from 'reactstrap';
import {
  Control,
  LocalForm,
  Errors,
} from 'react-redux-form';
import { DEPARTMENTS } from '../shared/staffs';

const required = val => val && val.length;
const maxLength = len => val =>
  !val || val.length <= len;
const minLength = len => val =>
  val && val.length >= len;

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
      department: '',
      annualLeave: 0,
      overTime: 0,
      touched: {
        name: false,
        doB: false,
        startDate: false,
      },
    };

    this.toggleModal =
      this.toggleModal.bind(this);
    this.handleSubmit =
      this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmit(values) {
    this.toggleModal();
    this.props.postStaff(
      values.name,
      values.doB,
      values.salaryScale,
      values.startDate,
      values.department,
      values.annualLeave,
      values.overTime
    );
  }

  render() {
    const departmentOptions =
      this.state.departments.map(department => {
        return <option>{department.name}</option>;
      });
    return (
      <div className="col-md-3">
        <Button onClick={this.toggleModal}>
          <span className="fa fa-plus fa-lg"></span>
        </Button>
        <Modal
          isOpen={this.state.isModalOpen}
          toggle={this.toggleModal}
        >
          <ModalHeader toggle={this.toggleModal}>
            Thêm nhân viên
          </ModalHeader>
          <ModalBody>
            <LocalForm
              onSubmit={values =>
                this.handleSubmit(values)
              }
            >
              <Row className="form-group">
                <Label htmlFor="name" md={4}>
                  Tên
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".name"
                    id="name"
                    name="name"
                    placeholder="Điền tên nhân viên"
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
                      required: 'Yêu cầu',
                      minLength:
                        'Yêu cầu nhiều hơn 2 kí tự',
                      maxLength:
                        'Yêu cầu ít hơn 11 kí tự',
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="doB" md={4}>
                  Ngày sinh
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
                      required: 'Yêu cầu nhập',
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="startDate" md={4}>
                  Ngày vào công ty
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
                      required: 'Yêu cầu nhập',
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label
                  htmlFor="department"
                  md={4}
                >
                  Phòng ban
                </Label>
                <Col md={8}>
                  <Control.select
                    model=".department"
                    id="department"
                    name="department"
                    className="form-control"
                  >
                    {departmentOptions}
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label
                  htmlFor="salaryScale"
                  md={4}
                >
                  Hệ số lương
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".salaryScale"
                    id="salaryScale"
                    name="salaryScale"
                    placeholder="1"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label
                  htmlFor="annualLeave"
                  md={4}
                >
                  Số ngày nghỉ còn lại
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".annualLeave"
                    id="annualLeave"
                    name="annualLeave"
                    placeholder="0"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="overTime" md={4}>
                  Số ngày đã làm thêm
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".overTime"
                    id="overTime"
                    name="overTime"
                    placeholder="0"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{ size: 10, offset: 2 }}>
                  <Button
                    type="submit"
                    color="primary"
                    onClick={this.toggleModal}
                  >
                    Thêm
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
