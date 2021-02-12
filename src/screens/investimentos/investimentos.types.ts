import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MainNavigator} from '../../navigation';

export interface InvestimentosProps {
  route: RouteProp<MainNavigator, 'investimentos'>;
  navigation: StackNavigationProp<MainNavigator, 'investimentos'>;
}

export interface GetInvestimentosResponse {
  response: {
    status: string;
    data: {
      listaInvestimentos: Investimento[];
    };
  };
}

export interface Investimento {
  nome: string;
  objetivo: string;
  saldoTotalDisponivel: number;
  indicadorCarencia: 'N' | 'S';
  acoes: Array<{
    id: string;
    nome: string;
    percentual: number;
  }>;
}
