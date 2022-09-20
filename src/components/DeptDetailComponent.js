import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardImg, CardText, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchDeptStaffs } from '../redux/ActionCreators';

function RenderDeptStaffs({ staff, onDelete }) {
  return (
    <Card className="zoom">
      <Link to={`/staffs/${staff.id}`}>
        <CardImg width="100%" src={staff.image} alt={staff.name} />
        <CardText className="text-center p-1">{staff.name}</CardText>
      </Link>
      <Button className="btn-sm" color="danger" onClick={() => onDelete(staff.id)}>
        Delete
      </Button>
    </Card>
  );
}

const mapStateToProps = state => {
  return {
    deptStaffs: state.deptStaffs,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchDeptStaffs: departmentId => {
    dispatch(fetchDeptStaffs(departmentId));
  },
});

class DeptStaffs extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchDeptStaffs(this.props.departmentId);
  }

  render() {
    if (this.props.deptStaffs.deptStaffs != null) {
      const list = this.props.deptStaffs.deptStaffs.map(staff => {
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
              <BreadcrumbItem active>{this.props.departmentId}</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div className="row">{list}</div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeptStaffs));
