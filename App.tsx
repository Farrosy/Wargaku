import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {HomeScreen} from './src/screens/Home/HomeScreen';
import {LoginScreen} from './src/screens/Auth/LoginScreen';
import {RegisterScreen} from './src/screens/Auth/RegisterScreen';

type Screen = 'login' | 'register' | 'home';

function App() {
  const [screen, setScreen] = useState<Screen>('login');

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      {screen === 'login' && (
        <LoginScreen onLogin={() => setScreen('home')} onRegister={() => setScreen('register')} />
      )}
      {screen === 'register' && (
        <RegisterScreen onRegister={() => setScreen('home')} onLogin={() => setScreen('login')} />
      )}
      {screen === 'home' && <HomeScreen onLogout={() => setScreen('login')} />}
    </SafeAreaProvider>
  );
}

export default App;
