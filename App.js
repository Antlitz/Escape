/**
 * @flow
 */

import React from 'react';
import type {Node} from 'react';
import Navigator from './src/Navigator/Navigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App: () => Node = () => {
  return (
    <SafeAreaProvider>
      <Navigator />
    </SafeAreaProvider>
  );
};

export default App;
