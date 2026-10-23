import React, {useEffect, useState} from 'react';
import {Alert, StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {HomeScreen} from './src/screens/Home/HomeScreen';
import {LoginScreen} from './src/screens/Auth/LoginScreen';
import {RegisterScreen} from './src/screens/Auth/RegisterScreen';
import {AuthUser, setOnUnauthorized} from './src/services/auth';
import {CashierScreen} from './src/screens/Cashier/CashierScreen';

type Screen = 'login' | 'register' | 'home' | 'cashier';

function App() {
  const [screen, setScreen] = useState<Screen>('login');
  const [session, setSession] = useState<{token: string; user: AuthUser} | null>(null);

  // Saat token expired (server balas 401), akhiri sesi dan kembali ke login screen.
  useEffect(() => {
    setOnUnauthorized(() => {
      setSession(null);
      setScreen(current => (current === 'home' || current === 'cashier' ? 'login' : current));
      Alert.alert('Sesi berakhir', 'Sesi Anda telah berakhir. Silakan masuk kembali.');
    });
    return () => setOnUnauthorized(null);
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      {screen === 'login' && (
        <LoginScreen onLogin={(token, user) => { setSession({token, user}); setScreen(user.role === 'kasir' ? 'cashier' : 'home'); }} onRegister={() => setScreen('register')} />
      )}
      {screen === 'register' && (
        <RegisterScreen onRegister={() => setScreen('login')} onLogin={() => setScreen('login')} />
      )}
      {screen === 'home' && session && <HomeScreen token={session.token} user={session.user} onLogout={() => { setSession(null); setScreen('login'); }} />}
      {screen === 'cashier' && session && <CashierScreen token={session.token} user={session.user} onLogout={() => { setSession(null); setScreen('login'); }} />}
    </SafeAreaProvider>
  );
}

export default App;
