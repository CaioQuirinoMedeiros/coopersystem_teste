import * as React from 'react';
import {View, Text} from 'react-native';
import CurrencyInput from 'react-native-currency-input';

import {styles} from './input-valor.styles';
import {InputValorProps} from './input-valor.types';

export const InputValor: React.FC<InputValorProps> = (props) => {
  const {error, onFocus, onBlur, style, label, ...rest} = props;

  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View style={styles.container}>
      {!!label && (
        <Text style={[styles.label, !!isFocused && styles.labelFocused]}>
          {label}
        </Text>
      )}
      <CurrencyInput
        unit="R$ "
        style={[styles.input, style, !!error && styles.inputError]}
        onFocus={(e) => {
          setIsFocused(true);
          onFocus && onFocus(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur && onBlur(e);
        }}
        {...rest}
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};
