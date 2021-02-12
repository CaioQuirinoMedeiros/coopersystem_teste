import * as React from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  Text,
  ListRenderItemInfo,
} from 'react-native';
import {formatarNumero} from '../../utils/formatarNumero';

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
          style={[
            styles.investimentoItem,
            investimento.indicadorCarencia === 'S' &&
              styles.investimentoItemDesabilitado,
          ]}
          disabled={investimento.indicadorCarencia === 'S'}
          onPress={() => {
            navigation.navigate('resgate', {investimento});
          }}>
          <View>
            <Text style={styles.investimentoTitulo}>{investimento.nome}</Text>
            <Text style={styles.investimentoSubtitulo}>
              {investimento.objetivo}
            </Text>
          </View>
          <Text style={styles.investimentoTitulo}>
            {formatarNumero(investimento.saldoTotalDisponivel)}
          </Text>
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
      contentContainerStyle={styles.investimentosListaContainer}
      onRefresh={getInvestimentos}
      refreshing={carregandoInvestimentos}
      ItemSeparatorComponent={() => (
        <View style={styles.investimentosSeparador} />
      )}
      ListHeaderComponent={
        <View style={styles.investimentosHeader}>
          <Text style={styles.investimentosHeaderTexto}>Investimentos</Text>
          <Text style={styles.investimentosHeaderTexto}>R$</Text>
        </View>
      }
    />
  );
};
