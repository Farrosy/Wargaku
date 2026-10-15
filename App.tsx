import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {DashboardScreen} from './src/screens/Dashboard/DashboardScreen';
import {LoginScreen} from './src/screens/Auth/LoginScreen';
import {RegisterScreen} from './src/screens/Auth/RegisterScreen';

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
