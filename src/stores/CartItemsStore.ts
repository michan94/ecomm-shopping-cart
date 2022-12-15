import axios from 'axios';
import {flow, types, getRoot, destroy, getSnapshot} from 'mobx-state-tree';
import {View} from 'react-native';
import jsonServer from '../api/jsonServer';
import CartItemsModel from '../models/CartItemsModel';

const CartItemsStore = types
  .model({
    cartItems: types.array(CartItemsModel),
  })
  .actions((self) => ({
    getSelectedUser: flow(function* () {
      const rootStore = getRoot(self);
      const userStore = rootStore.userStore;
      return userStore.selectedUser;
    }),
    afterCreate: flow(function* () {
      try {
        yield self.getSelectedUser();
        self.getCartItems();
      } catch (err) {
        console.error('Error fetching Cart Items');
      }
    }),
    getCartItems: flow(function* () {
      try {
        const response = yield jsonServer.get('/cartItems');
      } catch (err) {
        console.error('Error getting CartItems');
      }
      self.cartItems = response.data;
      console.log(`Initial Cart Size: ${self.cartItems.length}`);
    }),
    cartItemDelete: flow(function* cartItemDelete(cartItem) {
      try {
        // Delete the id, NOT by itemId
        console.log(`Deleting item of id: ${cartItem.id}`);
        const response = yield jsonServer.delete(`/cartItems/${cartItem.id}`);
        destroy(cartItem);
        console.log(
          `${selectedUser.name} Cart size after delete: ${self.currUserCart.length}`,
        );
      } catch (err) {
        console.error('Error Deleting');
      }
    }),
    // 1. Get the selected user from itemStore
    // 2. Get the cart of the selected user
    // 3. Add to the cart
    cartItemAdd: flow(function* cartItemAdd(itemToAdd) {
      try {
        const selectedUser = yield self.getSelectedUser();
        const newItem = {
          userId: selectedUser.id,
          itemId: itemToAdd.id, // This is the actual item from the list of available items (e.g. Ergonomic Soft Keyboard)
          item: getSnapshot(itemToAdd), // This is the item IN THE CART (e.g. item #153 )
        };
        const response = yield jsonServer.post(`/cartItems`, newItem);
        console.log(`Response Data: ${response.data.id}`);
        self.cartItems.push(response.data);
        console.log(`New Item's ID: ${itemToAdd.id}`);
        console.log(
          `${selectedUser.name} Cart size after add: ${self.currUserCart.length}`,
        );
      } catch (err) {
        console.error('Error Adding');
      }
    }),
  }))
  .views((self) => {
    const userStore = getRoot(self).userStore;
    return {
      get currUserCart() {
        const currUser = userStore.selectedUser;
        const currUserItems = self.cartItems.filter((cartItem) => {
          return cartItem.userId.id == currUser.id;
        });
        return currUserItems;
      },
      get currUserCartSize() {
        return self.currUserCart.length;
      },
    };
  });

export default CartItemsStore;
