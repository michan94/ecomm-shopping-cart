import {getParent, types} from 'mobx-state-tree';
import ItemModel from './ItemModel';
import UserModel from './UserModel';
import TimeHelperModel from './TimeHelperModel';

const CartItemsModel = types.compose(
  types
    .model({
      //at path "/id" snapshot <function toString> is not assignable to type: `identifier` (Value is not a valid identifier, expected a string), expected an instance of `identifier` or a snapshot like `identifier` instead.]
      // Changing it to types.string makes it work?????
      id: types.identifier,
      createdAt: types.maybeNull(types.string),
      userId: types.maybeNull(types.reference(UserModel)),
      itemId: types.maybeNull(types.reference(ItemModel)),
      status: types.maybeNull(types.string),
    })
    .actions((self) => ({
      remove() {
        getParent(self, 2).remove(self);
      },
    })),
  TimeHelperModel,
);

export default CartItemsModel;
