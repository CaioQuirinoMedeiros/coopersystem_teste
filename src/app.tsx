import React from 'react';
import {StatusBar} from 'react-native';

import {RootNavigator} from './navigation';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <RootNavigator />
    </>
  );
};

export default App;
