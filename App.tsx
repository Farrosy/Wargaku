import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {DashboardScreen} from './src/screens/DashboardScreen';
import {LoginScreen} from './src/screens/LoginScreen';
import {RegisterScreen} from './src/screens/RegisterScreen';

type Screen = 'login' | 'register' | 'dashboard';

function App() {
  const [screen, setScreen] = useState<Screen>('login');

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      {screen === 'login' && (
        <LoginScreen onLogin={() => setScreen('dashboard')} onRegister={() => setScreen('register')} />
      )}
      {screen === 'register' && (
        <RegisterScreen onRegister={() => setScreen('dashboard')} onLogin={() => setScreen('login')} />
      )}
      {screen === 'dashboard' && <DashboardScreen />}
    </SafeAreaProvider>
  );
}

export default App;
