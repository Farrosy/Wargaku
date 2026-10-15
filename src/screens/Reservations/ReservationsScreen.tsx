import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export function ReservationsScreen() {
  return (
    <View style={styles.page}>
      <Text style={styles.eyebrow}>BARBER ONE</Text>
      <Text style={styles.title}>Reservasi</Text>
      <Text style={styles.description}>Reservasi barbershop Anda akan tersedia di sini.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {flex: 1, justifyContent: 'center', padding: 24},
  eyebrow: {color: '#8b6b43', fontSize: 13, fontWeight: '800', letterSpacing: 2, marginBottom: 16},
  title: {color: '#20201d', fontSize: 30, fontWeight: '800'},
  description: {color: '#777770', fontSize: 15, lineHeight: 22, marginTop: 8},
});
