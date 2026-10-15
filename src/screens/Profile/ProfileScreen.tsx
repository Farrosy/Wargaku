import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {styles} from './style';

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
