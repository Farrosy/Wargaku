import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './style';

export function ReservationsScreen() {
  return (
    <View style={styles.page}>
      <Text style={styles.eyebrow}>BARBER ONE</Text>
      <Text style={styles.title}>Reservasi</Text>
      <Text style={styles.description}>Reservasi barbershop Anda akan tersedia di sini.</Text>
    </View>
  );
}
