import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

export function ProfileScreen({onLogout}: {onLogout: () => void}) {
  return (
    <View style={styles.page}>
      <Text style={styles.eyebrow}>BARBER ONE</Text>
      <Text style={styles.title}>Profil</Text>
      <Text style={styles.description}>Kelola akun Barber One Anda.</Text>
      <Pressable accessibilityRole="button" onPress={onLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Keluar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {flex: 1, justifyContent: 'center', padding: 24},
  eyebrow: {color: '#8b6b43', fontSize: 13, fontWeight: '800', letterSpacing: 2, marginBottom: 16},
  title: {color: '#20201d', fontSize: 30, fontWeight: '800'},
  description: {color: '#777770', fontSize: 15, lineHeight: 22, marginTop: 8},
  logoutButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#8b6b43',
    borderRadius: 10,
    marginTop: 24,
    paddingHorizontal: 28,
    paddingVertical: 13,
  },
  logoutText: {color: '#ffffff', fontSize: 15, fontWeight: '700'},
});
