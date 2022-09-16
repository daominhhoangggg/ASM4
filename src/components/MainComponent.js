import React, { Component } from 'react';
import Staffs from './StaffListComponent';
import StaffDetail from './StaffDetailComponent';
import Departments from './DepartmentComponent';
import Salary from './SalaryComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addStaff, fetchStaffs, fetchDepartments, fetchSalary } from '../redux/ActionCreators';
import DeptStaffs from './DeptDetailComponent';

const mapStateToProps = state => {
  return {
    staffs: state.staffs,
    departments: state.departments,
    salary: state.salary,
  };
};

const mapDispatchToProps = dispatch => ({
  addStaff: (name, doB, salaryScale, startDate, department, annualLeave, overTime, image) =>
    dispatch(addStaff(name, doB, salaryScale, startDate, department, annualLeave, overTime, image)),
  fetchStaffs: () => {
    dispatch(fetchStaffs());
  },
  fetchDepartments: () => {
    dispatch(fetchDepartments());
  },
  fetchSalary: () => {
    dispatch(fetchSalary());
  },
});

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepartments();
    this.props.fetchSalary();
  }

  render() {
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
          departments={this.props.departments.departments}
        />
      );
    };

    const DepartmentList = () => {
      return (
        <Departments
          staffs={this.props.staffs.staffs}
          departments={this.props.departments.departments}
          onClick={departmentId => this.onDepartmentSelect(departmentId)}
          deptLoading={this.props.departments.isLoading}
          deptErrMess={this.props.departments.errMess}
        />
      );
    };

    const DeptStaffsList = ({ match }) => {
      return (
        <DeptStaffs
          department={
            this.props.departments.departments.filter(
              department => department.id === match.params.departmentId
            )[0]
          }
          deptStaffs={this.props.staffs.staffs.filter(
            staff => staff.departmentId === match.params.departmentId
          )}
        />
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path="/staffs"
            component={() => (
              <Staffs
                addStaff={this.props.addStaff}
                staffs={this.props.staffs.staffs}
                onClick={staffId => this.onStaffSelect(staffId)}
                staffsLoading={this.props.staffs.isLoading}
                staffsErrMess={this.props.staffs.errMess}
              />
            )}
          />
          <Route path="/staffs/:staffId" component={StaffWithId} />
          <Route exact path="/departments" component={DepartmentList} />
          <Route path="/departments/:departmentId" component={DeptStaffsList} />
          <Route
            path="/salary"
            component={() => (
              <Salary
                staffs={this.props.salary.salary}
                isLoading={this.props.salary.isLoading}
                errMess={this.props.salary.errMess}
              />
            )}
          />
          <Redirect to="/staffs" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
