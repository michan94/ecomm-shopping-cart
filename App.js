import React from 'react';
import IndexScreen from './src/screens/IndexScreen';
import CartScreen from './src/screens/CartScreen';
import StoreProvider from './src/stores/index';
import styled from '@emotion/native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AppNavigation from './src/navigation/AppNavigation';

const ScreenView = styled.View`
  flex: 1;
`;

const App = () => {
  return (
    <StoreProvider>
      <ScreenView>
        <AppNavigation />
      </ScreenView>
    </StoreProvider>
  );
};

export default App;
