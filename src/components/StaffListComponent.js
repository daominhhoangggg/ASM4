import React, { useState } from 'react';
import { Card, CardImg, CardText, Form, FormGroup, Col, Button, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import NewStaffForm from './NewStaffFormComponent';
import { addStaff } from '../redux/ActionCreators';
import { Loading } from './LoadingComponent';

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
  const [keywords, setKeywords] = useState('');
  const [key, setKey] = useState('');

  const onChangeSearch = value => {
    setKey(value);
  };

  const onSearch = e => {
    setKeywords(key);
    setKey('');

    e.preventDefault();
  };

  const staffs = props.staffs
    .filter(staff => {
      return staff.name.toLowerCase().includes(keywords.toLowerCase());
    })
    .map(staff => {
      return (
        <div key={staff.id} className="col-6 col-md-4 col-lg-2 my-2">
          <RenderStaffListItem staff={staff} />
        </div>
      );
    });

  if (props.staffsLoading) {
    return (
      <div className="container my-3">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.staffsErrMess) {
    return (
      <div className="container my-3">
        <div className="row">
          <h4>{props.staffs.errMess}</h4>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container my-3">
        <div className="row">
          <div className="col-md-3">
            <h3>Nhân viên</h3>
          </div>
          <NewStaffForm addStaff={props.addStaff} departments={props.departments} />
          <div className="col-md-6">
            <Form onSubmit={onSearch}>
              <FormGroup row>
                <Col md={10}>
                  <Input
                    type="search"
                    name="search"
                    placeholder="Tìm nhân viên"
                    value={key}
                    onChange={e => {
                      onChangeSearch(e.target.value);
                    }}
                  />
                </Col>
                <Col md={2}>
                  <Button type="submit" color="primary">
                    <span className="fa fa-search fa-md"></span>
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </div>
        </div>
        <hr />
        <div className="row">{staffs}</div>
      </div>
    );
  }
};

export default Staffs;
