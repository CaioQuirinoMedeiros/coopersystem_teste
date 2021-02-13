import {formatarNumero} from './formatarNumero';

/**
 * Função que formata um número na moeda BRL. Exemplo: `2384.25` -> `"R$ 2.384,25"`
 * @param valor valor numérico a ser formatado
 */
export const formatarReal = (valor: number | null) => {
  if (!valor && valor !== 0) {
    return '';
  }

  return formatarNumero(valor, {prefixo: 'R$ '});
};
