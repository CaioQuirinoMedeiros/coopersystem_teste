import * as React from 'react';
import {View, Text} from 'react-native';

import {styles} from './informacao.styles';
import {InformacaoProps} from './informacao.types';

export const Informacao: React.FC<InformacaoProps> = (props) => {
  const {style, label, valor, ...rest} = props;

  return (
    <View style={[styles.container, style]} {...rest}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.valor}>{valor}</Text>
    </View>
  );
};
