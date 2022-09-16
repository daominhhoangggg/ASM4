import * as ActionTypes from './ActionTypes';
import { DEPARTMENTS } from '../shared/staffs';
import { STAFFS } from '../shared/staffs';
import { baseUrl } from '../shared/baseUrl';

//Thêm nhân viên
export const addStaff = staff => ({
  type: ActionTypes.ADD_STAFF,
  payload: staff,
});

//Upload
export const postStaff =
  (
    name,
    doB,
    salaryScale,
    startDate,
    department,
    annualLeave,
    overTime
  ) =>
  dispatch => {
    const newStaff = {
      id: 100,
      name: name,
      doB: doB,
      salaryScale: salaryScale,
      startDate: startDate,
      departmentId: DEPARTMENTS.filter(
        dept => dept.name === department
      )[0].id,
      annualLeave: annualLeave,
      overTime: overTime,
      image: '/assets/images/alberto.png',
      salary:
        salaryScale * 3000000 + overTime * 200000,
    };

    return fetch(baseUrl + 'staffs', {
      method: 'POST',
      body: JSON.stringify(newStaff),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    })
      .then(
        response => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              'Error ' +
                response.status +
                ': ' +
                response.statusText
            );
            error.response = response;
            throw error;
          }
        },
        error => {
          throw error;
        }
      )
      .then(response => response.json())
      .then(response => {
        dispatch(addStaff(response));
      })
      .catch(error => {
        console.log('post staff', error.message);
        alert(
          "Your staff's information could not be uploaded\nError: " +
            error.message
        );
      });
  };

//Xóa nhân viên

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
export const fetchDepartments =
  () => dispatch => {
    dispatch(departmentsLoading(true));

    return fetch(baseUrl + 'departments')
      .then(response => response.json())
      .then(departments =>
        dispatch(addDepartments(departments))
      );
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
