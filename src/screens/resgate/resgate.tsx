import * as React from 'react';
import {View, Text} from 'react-native';

import {styles} from './resgate.styles';
import {ResgateProps} from './resgate.types';

export const Resgate: React.FC<ResgateProps> = (props) => {
  const {route} = props;
  const investimento = route.params.investimento;

  return (
    <View style={styles.container}>
      <Text>{investimento.nome}</Text>
    </View>
  );
};
