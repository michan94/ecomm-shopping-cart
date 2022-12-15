import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {inject, observer} from 'mobx-react';
import CartItemCard from '../components/CartItemCard';

//{item, user, addToCart, deleteFromCart}

const CartScreen = inject('cartItemsStore')(
  observer(({cartItemsStore: {cartItemDelete, currUserCart}}) => {
    const renderItem = ({item}) => (
      <>
        <CartItemCard
          item={item.itemId}
          deleteFromCart={cartItemDelete}
          itemToDelete={item}
        />
        <Text>Time Since Added: {item.relativeTimeSince}</Text>
      </>
    );

    return (
      <View>
        <FlatList
          data={currUserCart}
          keyExtractor={(cartItem) => cartItem.id}
          renderItem={renderItem}
          style={{top: 50}}
        />
      </View>
    );
  }),
);

// Inject from rootStore
export default CartScreen;
