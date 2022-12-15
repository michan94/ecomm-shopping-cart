import React from 'react';
import {View, StyleSheet} from 'react-native';
import UserPicker from './UserPicker';
import styled from '@emotion/native';
import {IconButton} from 'react-native-paper';
import {inject, observer} from 'mobx-react';
import CartItemsStore from '../stores/CartItemsStore';
import {useNavigation} from '@react-navigation/native';

const NavigationContainer = styled.View``;

const NavBar = styled.View`
  position: absolute;
  margin: 10px;
  flex: 1;
  height: 40px;
  width: 500px;
  font-weight: bold;
  padding: 10px;
  flex-direction: row;
  align-self: stretch;
`;

const CartSizeView = styled.TouchableOpacity`
  justify-content: center;
  align-self: center;
  top: 10px;
  right: 100px;
`;

const CartSizeText = styled.Text`
  color: red;
`;

// Inject is to inject. Observer is for props. Need to include things from inject in Observer. Everything after `=> {` is the actual body
const NavigationBar = inject('cartItemsStore')(
  observer(({cartItemsStore: {currUserCartSize}}) => {
    const {navigate} = useNavigation();
    return (
      <View>
        <NavBar>
          <UserPicker />
          <IconButton
            icon="basket"
            onPress={() => navigate('Cart')}
            labelStyle={{fontSize: 40}}
            style={styles.basket}
          />
          <CartSizeView>
            <CartSizeText>{`Size: ${currUserCartSize}`}</CartSizeText>
          </CartSizeView>
        </NavBar>
      </View>
    );
  }),
);

const styles = StyleSheet.create({
  basket: {
    flex: 1,
    bottom: 10,
  },
});

export default NavigationBar;

// https://stackoverflow.com/questions/31101445/in-react-native-how-do-i-put-a-view-on-top-of-another-view-with-part-of-it-lyi
