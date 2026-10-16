import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {HomeScreen} from './src/screens/Home/HomeScreen';
import {LoginScreen} from './src/screens/Auth/LoginScreen';
import {RegisterScreen} from './src/screens/Auth/RegisterScreen';
import {AuthUser} from './src/services/auth';

type Screen = 'login' | 'register' | 'home';

function App() {
  const [screen, setScreen] = useState<Screen>('login');
  const [session, setSession] = useState<{token: string; user: AuthUser} | null>(null);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      {screen === 'login' && (
        <LoginScreen onLogin={(token, user) => { setSession({token, user}); setScreen('home'); }} onRegister={() => setScreen('register')} />
      )}
      {screen === 'register' && (
        <RegisterScreen onRegister={() => setScreen('login')} onLogin={() => setScreen('login')} />
      )}
      {screen === 'home' && session && <HomeScreen token={session.token} user={session.user} onLogout={() => { setSession(null); setScreen('login'); }} />}
    </SafeAreaProvider>
  );
}

export default App;
