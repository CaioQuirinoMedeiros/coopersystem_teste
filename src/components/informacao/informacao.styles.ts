import {StyleSheet} from 'react-native';

import {colors, spacing} from '../../theme';

export const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: colors.branco2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: spacing[4],
    minHeight: 46,
  },

  label: {
    color: colors.preto2,
    fontSize: 16,
    letterSpacing: -0.54,
    fontWeight: '500',
  },

  valor: {
    color: colors.cinza2,
    fontSize: 16,
    letterSpacing: -0.54,
    fontWeight: '600',
  },
});
