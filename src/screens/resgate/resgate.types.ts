import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {MainNavigator} from '../../navigation';

export interface ResgateProps {
  route: RouteProp<MainNavigator, 'resgate'>;
  navigation: StackNavigationProp<MainNavigator, 'resgate'>;
}

export interface Acao {
  id: string;
  nome: string;
  saldo: number;
  resgate: number | null;
}
