import React from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {NativeBaseProvider} from 'native-base';
import {SafeAreaView, LogBox, StatusBar, useColorScheme} from 'react-native';

import {store} from './src/redux/store';
import RootNavigation from './src/routes/routes';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {colorModeManager, config, theme} from './src/themes/theme';

LogBox.ignoreLogs(['Reanimated 2']);

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NativeBaseProvider
      theme={theme}
      config={config}
      colorModeManager={colorModeManager}>
      <Provider store={store}>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        </SafeAreaView>
        <RootNavigation />
      </Provider>
    </NativeBaseProvider>
  );
};

export default App;
