import React from 'react';
import {StatusBar} from 'react-native';

import {RootNavigator} from './navigation';
import {colors} from './theme';

const App = () => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor={colors.azul1}
      />
      <RootNavigator />
    </>
  );
};

export default App;
