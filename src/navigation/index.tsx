import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import {Investimentos} from '../screens/investimentos';
import {Resgate} from '../screens/resgate';
import {Investimento} from '../screens/investimentos/investimentos.types';
import {colors} from '../theme';

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
          headerTintColor: colors.branco1,
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          },
          headerBackTitleVisible: false,
          headerStyle: {
            height: 100,
            backgroundColor: colors.azul1,
            borderBottomWidth: 4,
            borderBottomColor: colors.amarelo1,
            elevation: 0,
          },
          headerBackTitle: 'Voltar',
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        <Main.Screen name="investimentos" component={Investimentos} />
        <Main.Screen name="resgate" component={Resgate} />
      </Main.Navigator>
    </NavigationContainer>
  );
};
