import * as ActionTypes from './ActionTypes';
import { DEPARTMENTS } from '../shared/staffs';
import { STAFFS } from '../shared/staffs';
import { baseUrl } from '../shared/baseUrl';

//Thêm nhân viên
export const addStaff = staff => ({
  type: ActionTypes.ADD_STAFF,
  payload: staff,
});

export const postStaff = newStaff => dispatch => {
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
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
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
      alert("Your staff's information could not be uploaded\nError: " + error.message);
    });
};

//Xóa nhân viên
export const deleteStaffSuccess = staffs => ({
  type: ActionTypes.DELETE_STAFF,
  payload: staffs,
});

export const deleteStaff = id => dispatch => {
  if (confirm('Bạn chắc chắn muốn xóa nhân viên này?')) {
    return fetch(baseUrl + `staffs/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(response => {
        dispatch(deleteStaffSuccess(response));
      });
  } else return;
};

//Cập nhật thông tin nhân viên
export const updateStaffSuccess = staffs => ({
  type: ActionTypes.UPDATE_STAFF,
  payload: staffs,
});

export const updateStaff = id => dispatch => {
  return fetch(baseUrl + `staffs/${id}`, {
    method: 'PATCH',
  });
};

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
    .then(departments => {
      dispatch(addDepartments(departments));
    });
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

//Departments' Staffs
export const fetchDeptStaffs = departmentId => dispatch => {
  dispatch(deptStaffsLoading(true));

  return fetch(baseUrl + `departments/${departmentId}`)
    .then(response => response.json())
    .then(deptStaffs => dispatch(addDeptStaffs(deptStaffs)));
};

export const deptStaffsLoading = () => ({
  type: ActionTypes.DEPTSTAFFS_LOADING,
});

export const deptStaffsFailed = errmess => ({
  type: ActionTypes.DEPTSTAFFS_FAILED,
  payload: errmess,
});

export const addDeptStaffs = deptStaffs => ({
  type: ActionTypes.ADD_DEPTSTAFFS,
  payload: deptStaffs,
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
