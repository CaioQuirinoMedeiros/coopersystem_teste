import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Investimentos} from '../screens/investimentos';
import {Resgate} from '../screens/resgate';
import {Investimento} from '../screens/investimentos/investimentos.types';

export type MainNavigator = {
  investimentos: undefined;
  resgate: {
    investimento: Investimento;
  };
};

const Main = createStackNavigator<MainNavigator>();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Main.Navigator
        initialRouteName="investimentos"
        screenOptions={{
          title: 'Resgate',
          headerTitleAlign: 'center',
        }}>
        <Main.Screen name="investimentos" component={Investimentos} />
        <Main.Screen name="resgate" component={Resgate} />
      </Main.Navigator>
    </NavigationContainer>
  );
};
