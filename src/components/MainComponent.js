import React, { Component } from 'react';
import Staffs from './StaffListComponent';
import StaffDetail from './StaffDetailComponent';
import Departments from './DepartmentComponent';
import Salary from './SalaryComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postStaff, deleteStaff, fetchStaffs, fetchDepartments } from '../redux/ActionCreators';
import DeptStaffs from './DeptDetailComponent';

const mapStateToProps = state => {
  return {
    staffs: state.staffs,
  };
};

const mapDispatchToProps = dispatch => ({
  postStaff: newStaff => {
    dispatch(postStaff(newStaff));
  },
  deleteStaff: id => {
    dispatch(deleteStaff(id));
  },
  fetchStaffs: () => {
    dispatch(fetchStaffs());
  },
});

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchStaffs();
  }

  render() {
    const StaffsList = () => {
      return (
        <Staffs
          addStaff={this.props.addStaff}
          staffs={this.props.staffs.staffs}
          onClick={staffId => this.onStaffSelect(staffId)}
          staffsLoading={this.props.staffs.isLoading}
          staffsErrMess={this.props.staffs.errMess}
          postStaff={this.props.postStaff}
          onDelete={this.props.deleteStaff}
        />
      );
    };

    const StaffWithId = ({ match }) => {
      return (
        <StaffDetail
          staff={
            this.props.staffs.staffs.filter(
              staff => staff.id === parseInt(match.params.staffId, 10)
            )[0]
          }
          isLoading={this.props.staffs.isLoading}
          errMess={this.props.staffs.errMess}
        />
      );
    };

    const DepartmentList = () => {
      return <Departments onClick={departmentId => this.onDepartmentSelect(departmentId)} />;
    };

    const DeptStaffsList = ({ match }) => {
      return (
        <DeptStaffs departmentId={match.params.departmentId} onDelete={this.props.deleteStaff} />
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/staffs" component={StaffsList} />
          <Route path="/staffs/:staffId" component={StaffWithId} />
          <Route exact path="/departments" component={DepartmentList} />
          <Route path="/departments/:departmentId" component={DeptStaffsList} />
          <Route path="/salary" component={() => <Salary />} />
          <Redirect to="/staffs" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
