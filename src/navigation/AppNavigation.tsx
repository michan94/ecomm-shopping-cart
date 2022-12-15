import React from 'react';
import IndexScreen from '../screens/IndexScreen';
import CartScreen from '../screens/CartScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Index">
        <Stack.Screen
          name="Index"
          component={IndexScreen}
          options={{title: 'Index Screen'}}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{title: 'Cart'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
