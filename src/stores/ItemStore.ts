import {types, flow, getRoot} from 'mobx-state-tree';
import ItemModel from '../models/ItemModel';
import jsonServer from '../api/jsonServer';

const ItemStore = types
  .model('ItemStore', {
    items: types.array(ItemModel), //Could be empty as well
  })
  .actions((self) => {
    return {
      afterCreate: flow(function* () {
        try {
          const response = yield jsonServer.get('/items');
          self.items = response.data;
        } catch (err) {
          console.error('Error getting items');
        }
      }),
    };
  })
  .views((self) => {
    const deptStore = getRoot(self).departmentStore;
    return {
      get filteredDeptItems() {
        // How to get access to another store from here?
        // https://bit.ly/3zhcJnL
        let result = [];
        for (const item of self.items) {
          if (deptStore.allActiveDepartments.includes(item.department)) {
            result.push(item);
          }
        }
        return result;
      },
    };
  });

export default ItemStore;

/*
1) Get and store items
2) Display data via String
i) Use `afterCreate` to get data
ii) Use `views` to display data
*/
