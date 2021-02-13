import {ReactText} from 'react';
import {ViewProps} from 'react-native';

export interface InformacaoProps extends ViewProps {
  label?: ReactText;
  valor?: ReactText;
}
