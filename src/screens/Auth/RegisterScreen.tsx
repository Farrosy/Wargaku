import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, Text} from 'react-native';
import {AuthInput} from '../../components/AuthInput/AuthInput';
import {PrimaryButton} from '../../components/PrimaryButton/PrimaryButton';
import {styles} from './style';

type Props = {onRegister: () => void; onLogin: () => void};

export function RegisterScreen({onRegister, onLogin}: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.page}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.brand}>BARBER ONE</Text>
        <Text style={styles.title}>Buat akun</Text>
        <Text style={styles.registerSubtitle}>Daftar untuk mulai menggunakan Barber One.</Text>
        <AuthInput label="Nama lengkap" placeholder="Nama Anda" autoCapitalize="words" value={name} onChangeText={setName} />
        <AuthInput label="Email" placeholder="nama@email.com" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
        <AuthInput label="Kata sandi" placeholder="Buat kata sandi" secureTextEntry value={password} onChangeText={setPassword} />
        <PrimaryButton title="Daftar" onPress={onRegister} />
        <Text style={styles.footer}>Sudah punya akun? <Text onPress={onLogin} style={styles.link}>Masuk</Text></Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
