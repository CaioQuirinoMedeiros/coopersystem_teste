import {TouchableOpacityProps} from 'react-native';
import {ModalProps as RNModalProps} from 'react-native-modal';

export interface AlertaModalProps extends Partial<RNModalProps> {
  titulo?: string;
  mensagem?: string;
  botoes?: AlertaBotao[];
}

export interface AlertaBotao extends TouchableOpacityProps {
  texto: string;
}

export interface ExibirProps {
  titulo: string;
  mensagem?: string;
  botoes?: AlertaBotao[];
}
