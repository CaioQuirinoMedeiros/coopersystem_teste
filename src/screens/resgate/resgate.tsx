import * as React from 'react';
import {
  View,
  FlatList,
  Text,
  ListRenderItemInfo,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {spacing} from '../../theme';
import {InputValor} from '../../components/input-valor';
import {Informacao} from '../../components/informacao';
import {AlertaModal} from '../../components/alerta-modal';
import {formatarReal} from '../../utils/formatarReal';

import {styles} from './resgate.styles';
import {ResgateProps, Acao} from './resgate.types';

const isIos = Platform.OS === 'ios';

export const Resgate: React.FC<ResgateProps> = (props) => {
  const {route, navigation} = props;
  const investimento = route.params.investimento;

  const {bottom} = useSafeAreaInsets();

  const [acoes, setAcoes] = React.useState<Acao[]>(
    investimento.acoes.map((acao) => ({
      id: acao.id,
      nome: acao.nome,
      saldo: (acao.percentual * investimento.saldoTotalDisponivel) / 100,
      resgate: 0,
    })),
  );

  const alertaModalRef = React.useRef<AlertaModal>(null);

  const resgateTotal = React.useMemo(() => {
    return acoes.reduce((acc, acao) => {
      return acc + (acao.resgate || 0);
    }, 0);
  }, [acoes]);

  const handleConfirmarResgate = React.useCallback(() => {
    if (!alertaModalRef.current) {
      return;
    }

    if (resgateTotal <= 0) {
      return alertaModalRef.current.exibir({
        titulo: 'Nenhum valor...',
        mensagem:
          'Você não preencheu os valores que deseja resgatar dos investimentos. Por favor, preencha ao menos um valor de resgate para continuar.',
        botoes: [{texto: 'Entendi'}],
      });
    }

    const mensagensErro = acoes
      .filter((acao) => {
        return acao.resgate && acao.resgate > acao.saldo;
      })
      .map(
        (acao) => `${acao.nome}: Valor máximo de ${formatarReal(acao.saldo)}`,
      );

    if (mensagensErro.length) {
      return alertaModalRef.current.exibir({
        titulo: 'Dados inválidos',
        mensagem:
          'Você preencheu um ou mais campos com valor acima do permitido:\n\n' +
          mensagensErro.join('\n'),
        botoes: [{texto: 'Corrigir'}],
      });
    }

    alertaModalRef.current.exibir({
      titulo: 'Resgate efetuado!',
      mensagem:
        'O valor solicitado estará disponível na sua conta em 5 dias uteis',
      botoes: [
        {
          texto: 'Novo resgate',
          onPress: () => {
            navigation.navigate('investimentos');
          },
        },
      ],
    });
  }, [acoes, navigation, resgateTotal]);

  const renderAcao = React.useCallback(
    ({item: acao}: ListRenderItemInfo<Acao>) => {
      const acimaDoLimite = acao.resgate && acao.resgate > acao.saldo;

      const error = acimaDoLimite
        ? `Valor não pode ser maior que ${formatarReal(acao.saldo)}`
        : undefined;

      return (
        <View style={styles.itemContainer}>
          <Informacao label={'Ação'} valor={acao.nome} />
          <Informacao
            label={'Saldo acumulado'}
            valor={formatarReal(acao.saldo)}
          />
          <InputValor
            label="Valor a resgatar"
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
            error={error}
          />
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
          <Informacao label={'Nome'} valor={investimento.nome} />
          <Informacao
            label={'Saldo total disponível'}
            valor={formatarReal(investimento.saldoTotalDisponivel)}
          />
        </View>
        <Text style={styles.tituloSecao}>Resgate do seu jeito</Text>
      </View>
    ),
    [investimento.nome, investimento.saldoTotalDisponivel],
  );

  const ListFooterComponent = React.useMemo(
    () => (
      <View style={styles.itemContainer}>
        <Informacao
          label={'Valor total a resgatar'}
          valor={formatarReal(resgateTotal)}
        />
      </View>
    ),
    [resgateTotal],
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={isIos ? 'padding' : undefined}
      keyboardVerticalOffset={82}>
      <FlatList
        data={acoes}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.acoesListaContainer}
        keyExtractor={(acao) => acao.id}
        renderItem={renderAcao}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
      />
      <TouchableOpacity
        style={[styles.botao, {paddingBottom: bottom || spacing[3]}]}
        activeOpacity={0.75}
        onPress={handleConfirmarResgate}>
        <Text style={styles.botaoTexto}>Confirmar resgate</Text>
      </TouchableOpacity>

      <AlertaModal ref={alertaModalRef} />
    </KeyboardAvoidingView>
  );
};
