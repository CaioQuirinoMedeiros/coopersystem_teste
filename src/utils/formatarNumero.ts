export interface OpcoesFormatarNumero {
  /**
   * Se verdadeiro, valores negativos serão ignorados
   */
  ignorarNegativo?: boolean;

  /**
   * Precisão de casas decimais. Padrão de 2.
   */
  precisao?: number;

  /**
   * Caracter do separador de casa decimal. Padrão ",".
   */
  separadorDecimal?: string;

  /**
   * Caracter do separador de milhares. Padrão ".".
   */
  separadorMilhares?: string;

  /**
   * Prefixo adicionado no valor.
   */
  prefixo?: string;
}

/**
 * Função que formata um número com diversas opções configuráveis
 * @param input valor númerico a ser formatado
 * @param options opções para a formatação do número
 */
export const formatarNumero = (
  input: number,
  options?: OpcoesFormatarNumero,
) => {
  const {
    precisao = 2,
    separadorDecimal = ',',
    separadorMilhares = '.',
    prefixo = '',
    ignorarNegativo,
  } = options || {};

  const negativo = ignorarNegativo ? false : input < 0;
  const sinal = negativo ? '- ' : '';

  const string = Math.abs(input).toFixed(precisao);

  const partes = string.split('.');
  const buffer = [];

  let numeroInteiro = partes[0];
  while (numeroInteiro.length > 0) {
    buffer.unshift(
      numeroInteiro.substr(Math.max(0, numeroInteiro.length - 3), 3),
    );
    numeroInteiro = numeroInteiro.substr(0, numeroInteiro.length - 3);
  }

  let numeroFormatado = '';
  numeroFormatado = buffer.join(separadorMilhares);

  const numeroDecimal = partes[1];
  if (!!precisao && numeroDecimal) {
    numeroFormatado += separadorDecimal + numeroDecimal;
  }

  numeroFormatado = `${sinal}${prefixo}${numeroFormatado}`;

  return numeroFormatado;
};
