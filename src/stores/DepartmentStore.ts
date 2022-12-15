import {flow} from 'mobx';
import {types} from 'mobx-state-tree';
import {ALLDEPARTMENTS} from '../constants/allDepartments';
import {DepartmentOutline} from '../models/DepartmentModel';

const DepartmentStore = types
  .model({
    departments: types.array(DepartmentOutline),
  })
  .views((self) => ({
    get activeDepartments() {
      return self.departments.filter((dept) => dept.isActive);
    },
    get allActiveDepartments() {
      return self.activeDepartments.map((dept) => dept.department);
    },
  }))
  .actions((self) => {
    return {
      afterCreate: flow(function* () {
        self.departments = ALLDEPARTMENTS.map((dept) =>
          DepartmentOutline.create({
            id: dept,
            department: dept,
            isActive: true,
          }),
        );
      }),
    };
  });

export default DepartmentStore;

// types.optional(type, defaultValue, optionalValues?)
