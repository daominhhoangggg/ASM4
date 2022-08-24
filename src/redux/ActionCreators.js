import * as ActionTypes from './ActionTypes';
import { DEPARTMENTS } from '../shared/staffs';

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
