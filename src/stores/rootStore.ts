import {types} from 'mobx-state-tree';
import DepartmentStore from './DepartmentStore';
import ItemStore from './ItemStore';
import UserStore from './UserStore';
import CartItemsStore from './CartItemsStore';

const RootStore = types.model('RootStore').props({
  userStore: types.optional(UserStore, {}),
  cartItemsStore: types.optional(CartItemsStore, {}),
  itemStore: types.optional(ItemStore, {}),
  departmentStore: types.optional(DepartmentStore, {}),
});

export default RootStore;
