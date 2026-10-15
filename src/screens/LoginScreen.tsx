import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import {AuthInput} from '../components/AuthInput';
import {PrimaryButton} from '../components/PrimaryButton';

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
          <Text style={styles.subtitle}>Masuk untuk mengelola aktivitas barbershop Anda.</Text>
        </View>
        <AuthInput label="Email" placeholder="nama@email.com" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
        <AuthInput label="Kata sandi" placeholder="Masukkan kata sandi" secureTextEntry value={password} onChangeText={setPassword} />
        <PrimaryButton title="Masuk" onPress={onLogin} />
        <Text style={styles.footer}>Belum punya akun? <Text onPress={onRegister} style={styles.link}>Daftar</Text></Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  page: {backgroundColor: '#f7f7f5', flex: 1},
  content: {flexGrow: 1, justifyContent: 'center', padding: 24},
  heading: {marginBottom: 34},
  brand: {color: '#8b6b43', fontSize: 13, fontWeight: '800', letterSpacing: 2, marginBottom: 24},
  title: {color: '#20201d', fontSize: 30, fontWeight: '800', marginBottom: 8},
  subtitle: {color: '#777770', fontSize: 15, lineHeight: 22},
  footer: {color: '#777770', fontSize: 14, marginTop: 24, textAlign: 'center'},
  link: {color: '#8b6b43', fontWeight: '700'},
});
