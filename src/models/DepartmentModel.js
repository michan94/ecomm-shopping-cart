import {types} from 'mobx-state-tree';
import {ALLDEPARTMENTS} from '../constants/allDepartments';

//Department can only be one of allDepartments
const Department = types.enumeration(ALLDEPARTMENTS);

export const DepartmentOutline = types
  .model({
    id: types.string,
    department: types.maybe(Department),
    isActive: true,
  })
  .actions((self) => ({
    setDepartmentName(departmentName) {
      self.department = departmentName;
    },
    toggleActive() {
      self.isActive = !self.isActive;
    },
  }));

export default Department;
