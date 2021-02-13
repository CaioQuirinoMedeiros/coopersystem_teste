import {StyleSheet} from 'react-native';
import {colors, spacing} from '../../theme';

export const styles = StyleSheet.create({
  acaoContainer: {
    backgroundColor: colors.branco1,
    marginBottom: spacing[3],
  },

  botao: {
    backgroundColor: colors.amarelo1,
    minHeight: 54,
    justifyContent: 'center',
    paddingVertical: spacing[3],
    alignItems: 'center',
  },

  botaoTexto: {
    color: colors.azul1,
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: '700',
    textAlign: 'center',
  },

  container: {
    flex: 1,
  },

  informacaoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: spacing[4],
    marginLeft: spacing[4],
    minHeight: 46,
    borderBottomWidth: 1,
    borderColor: colors.branco2,
  },

  informacaoLabel: {
    color: colors.preto2,
    fontSize: 16,
    letterSpacing: -0.54,
    fontWeight: '500',
  },

  informacaoValor: {
    color: colors.cinza2,
    fontSize: 16,
    letterSpacing: -0.54,
    fontWeight: '600',
  },

  inputContainer: {
    paddingLeft: spacing[4],
    marginBottom: spacing[3],
    marginTop: spacing[3],
  },

  inputErro: {
    color: colors.vermelho1,
    marginTop: 3,
    fontWeight: '700',
    fontSize: 12,
  },

  input: {
    borderBottomWidth: 1,
    // height: 46,
    fontWeight: '700',
    letterSpacing: -0.54,
    paddingBottom: 3,
    fontSize: 16,
    color: colors.preto2,
    paddingTop: spacing[1],
    // borderWidth: 1,
    borderColor: colors.branco2,
  },

  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.cinza2,
  },

  itemContainer: {
    backgroundColor: colors.branco1,
  },

  tituloSecao: {
    margin: spacing[4],
    fontSize: 14,
    color: colors.cinza3,
    letterSpacing: -0.54,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
