import {StyleSheet} from 'react-native';

import {colors, spacing, viewportWidth} from '../../theme';

export const styles = StyleSheet.create({
  alertaContainer: {
    backgroundColor: colors.branco1,
    width: viewportWidth * 0.9,
    alignSelf: 'center',
  },

  botao: {
    backgroundColor: colors.amarelo1,
    minHeight: 54,
    justifyContent: 'center',
    alignItems: 'center',
  },

  botaoTexto: {
    color: colors.azul1,
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: '700',
    textAlign: 'center',
  },

  mensagem: {
    fontSize: 16,
    color: colors.azul2,
    lineHeight: 24,
    letterSpacing: -0.54,
    marginHorizontal: spacing[4],
    marginBottom: spacing[6],
  },

  modal: {
    margin: 0,
    position: 'relative',
  },

  titulo: {
    fontSize: 30,
    color: colors.azul2,
    fontWeight: '700',
    letterSpacing: -0.54,
    textTransform: 'uppercase',
    textAlign: 'center',
    margin: spacing[4],
    marginBottom: spacing[3],
  },
});
