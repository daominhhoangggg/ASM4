import * as ActionTypes from './ActionTypes';
import { DEPARTMENTS } from '../shared/staffs';
import { STAFFS } from '../shared/staffs';
import { baseUrl } from '../shared/baseUrl';

export const addStaff = (name, doB, salaryScale, startDate, department, annualLeave, overTime) => ({
  type: ActionTypes.ADD_STAFF,
  payload: {
    name: name,
    doB: doB,
    salaryScale: salaryScale,
    startDate: startDate,
    department: DEPARTMENTS.filter(dept => dept.name === department)[0],
    annualLeave: annualLeave,
    overTime: overTime,
  },
});

//Staffs
export const fetchStaffs = () => dispatch => {
  dispatch(staffsLoading(true));

  return fetch(baseUrl + 'staffs')
    .then(response => response.json())
    .then(staffs => dispatch(addStaffs(staffs)));
};

export const staffsLoading = () => ({
  type: ActionTypes.STAFFS_LOADING,
});

export const staffsFailed = errmess => ({
  type: ActionTypes.STAFFS_FAILED,
  payload: errmess,
});

export const addStaffs = staffs => ({
  type: ActionTypes.ADD_STAFFS,
  payload: staffs,
});

//Departments
export const fetchDepartments = () => dispatch => {
  dispatch(departmentsLoading(true));

  return fetch(baseUrl + 'departments')
    .then(response => response.json())
    .then(departments => dispatch(addDepartments(departments)));
};

export const departmentsLoading = () => ({
  type: ActionTypes.DEPARTMENTS_LOADING,
});

export const departmentsFailed = errmess => ({
  type: ActionTypes.DEPARTMENTS_FAILED,
  payload: errmess,
});

export const addDepartments = departments => ({
  type: ActionTypes.ADD_DEPARTMENTS,
  payload: departments,
});

//Salary
export const fetchSalary = () => dispatch => {
  dispatch(salaryLoading(true));

  return fetch(baseUrl + 'staffsSalary')
    .then(response => response.json())
    .then(salary => dispatch(addSalary(salary)));
};

export const salaryLoading = () => ({
  type: ActionTypes.SALARY_LOADING,
});

export const salaryFailed = errmess => ({
  type: ActionTypes.SALARY_FAILED,
  payload: errmess,
});

export const addSalary = salary => ({
  type: ActionTypes.ADD_SALARY,
  payload: salary,
});
