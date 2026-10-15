import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export function DashboardScreen() {
  return (
    <View style={styles.page}>
      <Text style={styles.brand}>BARBER ONE</Text>
      <Text style={styles.title}>Selamat datang!</Text>
      <Text style={styles.subtitle}>Senang melihat Anda kembali.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {alignItems: 'center', backgroundColor: '#f7f7f5', flex: 1, justifyContent: 'center', padding: 24},
  brand: {color: '#8b6b43', fontSize: 13, fontWeight: '800', letterSpacing: 2, marginBottom: 24},
  title: {color: '#20201d', fontSize: 30, fontWeight: '800', textAlign: 'center'},
  subtitle: {color: '#777770', fontSize: 15, marginTop: 8, textAlign: 'center'},
});
