import {StyleSheet} from 'react-native';
import {colors, spacing} from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.branco2,
  },

  investimentoItem: {
    flexDirection: 'row',
    backgroundColor: colors.branco1,
    padding: spacing[4],
    justifyContent: 'space-between',
    paddingBottom: spacing[4] - 2,
  },

  investimentoItemDesabilitado: {
    opacity: 0.6,
  },

  investimentosListaContainer: {
    backgroundColor: colors.branco1,
  },

  investimentoSubtitulo: {
    color: colors.cinza3,
    fontSize: 16,
    letterSpacing: -0.54,
  },

  investimentoTitulo: {
    color: colors.preto1,
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: -0.54,
  },

  investimentosHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing[4],
    backgroundColor: colors.branco2,
  },

  investimentosHeaderTexto: {
    fontSize: 16,
    color: colors.cinza3,
    letterSpacing: -0.54,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },

  investimentosSeparador: {
    height: 2,
    backgroundColor: colors.branco2,
    marginLeft: spacing[4],
  },
});
