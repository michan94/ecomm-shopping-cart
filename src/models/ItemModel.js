import {types} from 'mobx-state-tree';
import DepartmentModel from './DepartmentModel';
import TimeHelperModel from './TimeHelperModel';

const ItemModel = types.compose(
  types
    .model('Item', {
      // id, createdAt, name, image, price, currency, department, updatedAt
      id: types.identifier,
      createdAt: types.maybe(types.string),
      name: types.maybe(types.string),
      image: types.maybe(types.string),
      price: types.maybe(types.number),
      currency: types.maybe(types.string),
      department: types.maybe(DepartmentModel),
    })
    .views((self) => ({
      get localPrice() {
        return self.currency + self.price;
      },
    }))
    .actions((self) => ({
      setName(newName) {
        self.name = newName;
      },
      setPrice(newPrice) {
        self.price = newPrice;
      },
      setDepartment(newDepartment) {
        this.department = newDepartment;
      },
    })),
  TimeHelperModel,
);

export default ItemModel;
