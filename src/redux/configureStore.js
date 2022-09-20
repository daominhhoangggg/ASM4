import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Staffs } from './staffs';
import { Departments } from './departments';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Salary } from './salary';
import { DeptStaffs } from './deptstaffs';

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      staffs: Staffs,
      departments: Departments,
      salary: Salary,
      deptStaffs: DeptStaffs,
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};
