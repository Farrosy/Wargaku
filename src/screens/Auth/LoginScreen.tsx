import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, Text, View} from 'react-native';
import {AuthInput} from '../../components/AuthInput/AuthInput';
import {PrimaryButton} from '../../components/PrimaryButton/PrimaryButton';
import {styles} from './style';

type Props = {onLogin: () => void; onRegister: () => void};

export function LoginScreen({onLogin, onRegister}: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.page}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.heading}>
          <Text style={styles.brand}>BARBER ONE</Text>
          <Text style={styles.title}>Selamat datang</Text>
          <Text style={styles.loginSubtitle}>Masuk untuk mengelola aktivitas barbershop Anda.</Text>
        </View>
        <AuthInput label="Email" placeholder="nama@email.com" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
        <AuthInput label="Kata sandi" placeholder="Masukkan kata sandi" secureTextEntry value={password} onChangeText={setPassword} />
        <PrimaryButton title="Masuk" onPress={onLogin} />
        <Text style={styles.footer}>Belum punya akun? <Text onPress={onRegister} style={styles.link}>Daftar</Text></Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
