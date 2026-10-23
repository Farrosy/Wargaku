import React, {useEffect, useState} from 'react';
import {Alert, StatusBar, Text, useWindowDimensions, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {HomeScreen} from './src/screens/Home/HomeScreen';
import {LoginScreen} from './src/screens/Auth/LoginScreen';
import {RegisterScreen} from './src/screens/Auth/RegisterScreen';
import {AuthUser, setOnUnauthorized} from './src/services/auth';
import {CashierScreen} from './src/screens/Cashier/CashierScreen';

type Screen = 'login' | 'register' | 'home' | 'cashier';

function App() {
  const {width} = useWindowDimensions();
  const isTabletSize = width >= 600;
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
      {screen === 'cashier' && session && (isTabletSize ? (
        <CashierScreen token={session.token} user={session.user} onLogout={() => { setSession(null); setScreen('login'); }} />
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#f7f6f2'}}>
          <Text style={{fontSize: 20, fontWeight: '700', color: '#24231f', textAlign: 'center'}}>Kasir hanya tersedia di tablet</Text>
          <Text style={{marginTop: 8, fontSize: 15, color: '#66645e', textAlign: 'center'}}>Gunakan perangkat dengan lebar layar minimal 600 dp untuk mengakses kasir.</Text>
          <Text onPress={() => { setSession(null); setScreen('login'); }} style={{marginTop: 24, fontSize: 16, fontWeight: '600', color: '#8a5a2b'}}>Keluar</Text>
        </View>
      ))}
    </SafeAreaProvider>
  );
}

export default App;
