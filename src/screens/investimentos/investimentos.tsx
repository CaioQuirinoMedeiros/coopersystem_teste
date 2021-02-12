import * as React from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  Text,
  ListRenderItemInfo,
} from 'react-native';

import {styles} from './investimentos.styles';
import {
  InvestimentosProps,
  Investimento,
  GetInvestimentosResponse,
} from './investimentos.types';

const investimentosUrl = 'http://www.mocky.io/v2/5e76797e2f0000f057986099';

export const Investimentos: React.FC<InvestimentosProps> = (props) => {
  const {navigation} = props;

  const [investimentos, setInvestimentos] = React.useState<Investimento[]>([]);
  const [carregandoInvestimentos, setCarregandoInvestimentos] = React.useState(
    false,
  );

  const getInvestimentos = React.useCallback(async () => {
    try {
      setCarregandoInvestimentos(true);
      const response = await fetch(investimentosUrl);
      const data = (await response.json()) as GetInvestimentosResponse;

      setInvestimentos(data.response.data.listaInvestimentos);
    } catch {
    } finally {
      setCarregandoInvestimentos(false);
    }
  }, []);

  React.useEffect(() => {
    getInvestimentos();
  }, [getInvestimentos]);

  const renderInvestimento = React.useCallback(
    ({item: investimento}: ListRenderItemInfo<Investimento>) => {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('resgate', {investimento});
          }}>
          <View>
            <Text>{investimento.nome}</Text>
            <Text>{investimento.objetivo}</Text>
          </View>
          <Text>{investimento.saldoTotalDisponivel}</Text>
        </TouchableOpacity>
      );
    },
    [navigation],
  );

  return (
    <FlatList
      data={investimentos}
      renderItem={renderInvestimento}
      keyExtractor={(investimento, index) => `${investimento.nome}${index}`}
      style={styles.container}
      onRefresh={getInvestimentos}
      refreshing={carregandoInvestimentos}
      ListHeaderComponent={
        <View>
          <Text>Investimentos</Text>
          <Text>R$</Text>
        </View>
      }
    />
  );
};
