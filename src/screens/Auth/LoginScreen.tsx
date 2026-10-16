import React, {useState} from 'react';
import {Alert, KeyboardAvoidingView, Linking, Platform, ScrollView, Text, View} from 'react-native';
import {AuthInput} from '../../components/AuthInput/AuthInput';
import {PrimaryButton} from '../../components/PrimaryButton/PrimaryButton';
import {styles} from './style';
import {AuthUser, login} from '../../services/auth';

type Props = {onLogin: (token: string, user: AuthUser) => void; onRegister: () => void};

export function LoginScreen({onLogin, onRegister}: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Data belum lengkap', 'Masukkan email atau nomor telepon dan kata sandi.');
      return;
    }
    setLoading(true);
    try {
      const result = await login(email.trim(), password);
      if (result.user.role !== 'user') {
        Alert.alert('Akses melalui web', 'Akun kasir hanya dapat digunakan melalui web.', [
          {text: 'Nanti', style: 'cancel'},
          {text: 'Buka web', onPress: () => { void Linking.openURL('https://google.com').catch(() => Alert.alert('Gagal membuka tautan', 'Silakan buka https://google.com secara manual.')); }},
        ]);
        return;
      }
      onLogin(result.access_token, result.user);
    } catch (error) {
      Alert.alert('Login gagal', error instanceof Error ? error.message : 'Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.page}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.heading}>
          <Text style={styles.brand}>BARBER ONE</Text>
          <Text style={styles.title}>Selamat datang</Text>
          <Text style={styles.loginSubtitle}>Masuk untuk melanjutkan menggunakan Barber One.</Text>
        </View>
        <AuthInput label="Email atau nomor telepon" placeholder="nama@email.com / 08xxxxxxxxxx" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
        <AuthInput label="Kata sandi" placeholder="Masukkan kata sandi" secureTextEntry value={password} onChangeText={setPassword} />
        <PrimaryButton title="Masuk" onPress={submit} disabled={loading} />
        <Text style={styles.footer}>Belum punya akun? <Text onPress={onRegister} style={styles.link}>Daftar</Text></Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
