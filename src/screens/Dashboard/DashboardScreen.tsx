import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './style';

export function DashboardScreen() {
  return (
    <View style={styles.page}>
      <Text style={styles.brand}>BARBER ONE</Text>
      <Text style={styles.title}>Selamat datang!</Text>
      <Text style={styles.subtitle}>Senang melihat Anda kembali.</Text>
    </View>
  );
}
