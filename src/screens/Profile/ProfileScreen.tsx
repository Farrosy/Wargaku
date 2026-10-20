import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, Alert, Pressable, ScrollView, Text, View} from 'react-native';
import {AuthUser, getProfile, logout} from '../../services/auth';
import {styles} from './style';

export function ProfileScreen({token, user, onLogout}: {token: string; user: AuthUser; onLogout: () => void}) {
  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [loggingOut, setLoggingOut] = useState(false);

  const loadProfile = useCallback(() => {
    setLoading(true);
    getProfile(token)
      .then(result => {setProfile(result); setError('');})
      .catch(err => setError(err instanceof Error ? err.message : 'Gagal memuat profil.'))
      .finally(() => setLoading(false));
  }, [token]);

  useEffect(() => { loadProfile(); }, [loadProfile]);

  const handleLogout = async () => {
    if (loggingOut) { return; }
    setLoggingOut(true);
    let logoutError = '';
    try {
      await logout(token);
    } catch (err) {
      logoutError = err instanceof Error ? err.message : 'Tidak dapat menghubungi server.';
    } finally {
      setLoggingOut(false);
      onLogout();
    }
    if (logoutError) {
      Alert.alert('Anda sudah keluar', `Sesi lokal diakhiri, tetapi server belum dapat dihubungi. ${logoutError}`);
    }
  };

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>BARBER ONE</Text>
      <Text style={styles.title}>Profil</Text>
      <Text style={styles.description}>Informasi akun Barber One Anda.</Text>

      <View style={styles.profileCard}>
        <View style={styles.cardHeading}>
          <Text style={styles.cardTitle}>Informasi Profil</Text>
          {loading ? <ActivityIndicator size="small" color="#8b6b43" /> : null}
        </View>
        <ProfileField label="NAMA" value={profile.name} />
        <ProfileField label="NOMOR TELEPON" value={profile.phone} />
        <ProfileField label="EMAIL" value={profile.email || 'Belum ditambahkan'} last />
        {!!error && <View style={styles.errorBox}><Text style={styles.errorText}>{error}</Text><Pressable onPress={loadProfile}><Text style={styles.retryText}>Coba Lagi</Text></Pressable></View>}
      </View>

      <Pressable accessibilityRole="button" accessibilityState={{disabled: loggingOut}} disabled={loggingOut} onPress={handleLogout} style={[styles.logoutButton, loggingOut && styles.logoutButtonDisabled]}>
        {loggingOut ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.logoutText}>Keluar</Text>}
      </Pressable>
    </ScrollView>
  );
}

function ProfileField({label, value, last}: {label: string; value: string; last?: boolean}) {
  return <View style={[styles.profileField, last && styles.profileFieldLast]}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <Text style={styles.fieldValue}>{value}</Text>
  </View>;
}
