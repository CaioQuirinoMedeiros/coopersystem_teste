import {CurrencyInputProps} from 'react-native-currency-input';

export interface InputValorProps extends CurrencyInputProps {
  error?: string;
  label?: string;
}
