import * as React from 'react';
import {
  View,
  FlatList,
  Text,
  ListRenderItemInfo,
  TouchableOpacity,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CurrencyInput from 'react-native-currency-input';

import {colors, spacing} from '../../theme';
import {formatarNumero} from '../../utils/formatarNumero';

import {styles} from './resgate.styles';
import {ResgateProps, Acao} from './resgate.types';

export const Resgate: React.FC<ResgateProps> = (props) => {
  const {route} = props;
  const investimento = route.params.investimento;

  const {bottom} = useSafeAreaInsets();

  const [acoes, setAcoes] = React.useState<Acao[]>(
    investimento.acoes.map((acao) => ({
      id: acao.id,
      nome: acao.nome,
      saldo: acao.percentual * investimento.saldoTotalDisponivel,
      resgate: 0,
    })),
  );

  const resgateTotal = React.useMemo(() => {
    return acoes.reduce((acc, acao) => {
      return acc + (acao.resgate || 0);
    }, 0);
  }, [acoes]);

  const renderAcao = React.useCallback(
    ({item: acao}: ListRenderItemInfo<Acao>) => {
      const acimaDoLimite = acao.resgate && acao.resgate > acao.saldo;
      return (
        <View style={styles.acaoContainer}>
          <View style={styles.informacaoItem}>
            <Text style={styles.informacaoLabel}>Ação</Text>
            <Text style={styles.informacaoValor}>{acao.nome}</Text>
          </View>
          <View style={styles.informacaoItem}>
            <Text style={styles.informacaoLabel}>Saldo acumulado</Text>
            <Text style={styles.informacaoValor}>
              {formatarNumero(acao.saldo, {unidade: 'R$ '})}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Valor a resgatar</Text>
            <CurrencyInput
              unit="R$ "
              style={[
                styles.input,
                !!acimaDoLimite && {borderColor: colors.vermelho1},
              ]}
              value={acao.resgate}
              onChangeValue={(valor) => {
                setAcoes((prevAcoes) =>
                  prevAcoes.map((prevAcao) =>
                    prevAcao.id === acao.id
                      ? {...prevAcao, resgate: valor}
                      : prevAcao,
                  ),
                );
              }}
            />
            {!!acimaDoLimite && (
              <Text
                style={
                  styles.inputErro
                }>{`Valor não pode ser maior que ${formatarNumero(acao.saldo, {
                unidade: 'R$ ',
              })}`}</Text>
            )}
          </View>
        </View>
      );
    },
    [],
  );

  const ListHeaderComponent = React.useMemo(
    () => (
      <View>
        <Text style={styles.tituloSecao}>Dados do investimento</Text>
        <View style={styles.itemContainer}>
          <View style={styles.informacaoItem}>
            <Text style={styles.informacaoLabel}>Nome</Text>
            <Text style={styles.informacaoValor}>{investimento.nome}</Text>
          </View>
          <View style={styles.informacaoItem}>
            <Text style={styles.informacaoLabel}>Saldo total disponível</Text>
            <Text style={styles.informacaoValor}>
              {formatarNumero(investimento.saldoTotalDisponivel, {
                unidade: 'R$ ',
              })}
            </Text>
          </View>
        </View>
        <Text style={styles.tituloSecao}>Resgate do seu jeito</Text>
      </View>
    ),
    [investimento.nome, investimento.saldoTotalDisponivel],
  );

  const ListFooterComponent = React.useMemo(
    () => (
      <View style={styles.acaoContainer}>
        <View style={styles.informacaoItem}>
          <Text style={styles.informacaoLabel}>Valor total a resgatar</Text>
          <Text style={styles.informacaoValor}>
            {formatarNumero(resgateTotal, {unidade: 'R$ '})}
          </Text>
        </View>
      </View>
    ),
    [resgateTotal],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={acoes}
        showsVerticalScrollIndicator={false}
        keyExtractor={(acao) => acao.id}
        renderItem={renderAcao}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
      />
      <TouchableOpacity
        style={[styles.botao, {paddingBottom: bottom || spacing[3]}]}
        activeOpacity={0.75}>
        <Text style={styles.botaoTexto}>Confirmar resgate</Text>
      </TouchableOpacity>
    </View>
  );
};
