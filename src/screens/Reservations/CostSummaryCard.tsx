import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './style';

export function CostSummaryCard() {
  return (
    <View style={styles.bottomCard}>
      <View style={styles.bottomRow}>
        <View>
          <Text style={styles.cardLabel}>RINGKASAN BIAYA</Text>
          <Text style={styles.totalPrice}>Rp 180.000 <Text style={styles.perPerson}>/ 1 Orang</Text></Text>
        </View>
        <View style={styles.alignRight}>
          <View style={styles.badgeTime}>
            <Text style={styles.badgeTimeText}>10:45 WIB • Sen, 24 Okt</Text>
          </View>
          <Text style={styles.kapsterText}>Kapster: Eko Prasetyo</Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.button} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Lanjut ke Pembayaran →</Text>
      </TouchableOpacity>
      <Text style={styles.footerNote}>Wajib bayar lunas sebelum tiket elektronik diterbitkan.</Text>
    </View>
  );
}