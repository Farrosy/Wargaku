import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './style';

export function TicketsScreen() {
  return (
    <View style={styles.page}>
      <Text style={styles.eyebrow}>BARBER ONE</Text>
      <Text style={styles.title}>Tiket Saya</Text>
      <Text style={styles.description}>Tiket reservasi Anda akan tampil di sini.</Text>
    </View>
  );
}
