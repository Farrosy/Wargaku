import React, {useState} from 'react';
import {Alert, KeyboardAvoidingView, Platform, ScrollView, Text} from 'react-native';
import {AuthInput} from '../../components/AuthInput/AuthInput';
import {PrimaryButton} from '../../components/PrimaryButton/PrimaryButton';
import {styles} from './style';
import {register} from '../../services/auth';

type Props = {onRegister: () => void; onLogin: () => void};

export function RegisterScreen({onRegister, onLogin}: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!name.trim() || !phone.trim() || !password) {
      Alert.alert('Data belum lengkap', 'Nama, nomor telepon, dan kata sandi wajib diisi.');
      return;
    }
    setLoading(true);
    try {
      await register({name: name.trim(), phone: phone.trim(), email: email.trim() || undefined, password});
      Alert.alert('Pendaftaran berhasil', 'Silakan masuk dengan email atau nomor telepon dan kata sandi Anda.');
      onRegister();
    } catch (error) {
      Alert.alert('Pendaftaran gagal', error instanceof Error ? error.message : 'Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.page}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.brand}>BARBER ONE</Text>
        <Text style={styles.title}>Buat akun</Text>
        <Text style={styles.registerSubtitle}>Daftar untuk mulai menggunakan Barber One.</Text>
        <AuthInput label="Nama lengkap" placeholder="Nama Anda" autoCapitalize="words" value={name} onChangeText={setName} />
        <AuthInput label="Nomor telepon" placeholder="08xxxxxxxxxx" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
        <AuthInput label="Email (opsional)" placeholder="nama@email.com" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
        <AuthInput label="Kata sandi" placeholder="Buat kata sandi" secureTextEntry value={password} onChangeText={setPassword} />
        <PrimaryButton title="Daftar" onPress={submit} disabled={loading} />
        <Text style={styles.footer}>Sudah punya akun? <Text onPress={onLogin} style={styles.link}>Masuk</Text></Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
