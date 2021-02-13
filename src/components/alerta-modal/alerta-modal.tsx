import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import RNModal from 'react-native-modal';

import {viewportHeight, viewportWidth} from '../../theme';

import {styles} from './alerta-modal.styles';
import {AlertaBotao, AlertaModalProps, ExibirProps} from './alerta-modal.types';

interface State {
  isVisible: boolean;
  titulo?: string;
  mensagem?: string;
  botoes?: AlertaBotao[];
}

export class AlertaModal extends React.Component<AlertaModalProps, State> {
  closePromise: (() => void) | null;
  openPromise: (() => void) | null;

  constructor(props: AlertaModalProps) {
    super(props);

    this.closePromise = null;
    this.openPromise = null;
    this.state = {
      isVisible: !!props.isVisible,
      titulo: props.titulo,
      mensagem: props.mensagem,
      botoes: props.botoes,
    };
  }

  componentDidUpdate(prevProps: AlertaModalProps, prevState: State) {
    if (
      !!this.props.isVisible &&
      !prevState.isVisible &&
      !this.state.isVisible
    ) {
      this.exibir();
    }

    const isVisibleAlterou = prevProps.isVisible !== this.props.isVisible;

    if (
      !this.props.isVisible &&
      typeof this.props.isVisible === 'boolean' &&
      isVisibleAlterou &&
      !!prevState.isVisible &&
      !!this.state.isVisible
    ) {
      this.fechar();
    }
  }

  exibir = async (exibirProps?: ExibirProps) => {
    if (exibirProps) {
      this.setState({
        titulo: exibirProps.titulo,
        mensagem: exibirProps.mensagem,
        botoes: exibirProps.botoes,
      });
    }

    if (this.state.isVisible) {
      return;
    }

    this.setState({isVisible: true});

    return new Promise<void>((resolve) => {
      this.openPromise = resolve;
    });
  };

  fechar = async () => {
    if (!this.state.isVisible) {
      return;
    }

    this.setState({isVisible: false});

    return new Promise<void>((resolve) => {
      this.closePromise = resolve;
    });
  };

  render() {
    const {
      style,
      onModalHide,
      onModalShow,
      onBackButtonPress,
      onBackdropPress,
      onSwipeComplete,
      ...rest
    } = this.props;
    const {titulo, mensagem, botoes} = this.state;

    return (
      <RNModal
        onBackdropPress={onBackdropPress || this.fechar}
        hasBackdrop
        onBackButtonPress={onBackButtonPress || this.fechar}
        onSwipeComplete={onSwipeComplete || this.fechar}
        style={styles.modal}
        onModalShow={() => {
          this.openPromise && this.openPromise();
          this.openPromise = null;
          onModalShow && onModalShow();
        }}
        onModalHide={() => {
          this.closePromise && this.closePromise();
          this.closePromise = null;
          onModalHide && onModalHide();
        }}
        {...rest}
        deviceWidth={viewportWidth}
        deviceHeight={viewportHeight}
        isVisible={this.state.isVisible}>
        <View style={[styles.alertaContainer, style]}>
          <Text style={styles.titulo}>{titulo}</Text>
          {!!mensagem && <Text style={styles.mensagem}>{mensagem}</Text>}
          {!!botoes &&
            botoes.map((botao) => {
              const {texto, onPress, ...botaoRest} = botao;
              return (
                <TouchableOpacity
                  onPress={async (e) => {
                    await this.fechar();
                    onPress && onPress(e);
                  }}
                  {...botaoRest}
                  style={[styles.botao, botao.style]}>
                  <Text style={styles.botaoTexto}>{texto}</Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </RNModal>
    );
  }
}
