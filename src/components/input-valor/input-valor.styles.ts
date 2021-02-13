import {StyleSheet} from 'react-native';
import {colors, spacing} from '../../theme';

export const styles = StyleSheet.create({
  container: {
    marginVertical: spacing[3],
  },

  error: {
    color: colors.vermelho1,
    marginTop: 3,
    fontWeight: '700',
    fontSize: 12,
  },

  input: {
    borderBottomWidth: 1,
    fontWeight: '700',
    letterSpacing: -0.54,
    paddingBottom: 3,
    fontSize: 16,
    color: colors.preto2,
    paddingTop: spacing[1],
    borderColor: colors.branco2,
  },

  inputError: {
    borderColor: colors.vermelho1,
  },

  label: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.cinza2,
  },

  labelFocused: {
    color: colors.azul1,
  },
});
