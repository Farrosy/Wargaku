import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './style';

export function CostSummaryCard({price, serviceName, dateLabel, time, barberName, submitting, onSubmit}: {price: number; serviceName: string; dateLabel: string; time: string; barberName: string; submitting: boolean; onSubmit: () => void}) {
  const formattedPrice = `Rp ${price.toLocaleString('id-ID')}`;
  return (
    <View style={styles.bottomCard}>
      <View style={styles.bottomRow}>
        <View>
          <Text style={styles.cardLabel}>RINGKASAN BIAYA</Text>
          <Text style={styles.totalPrice}>{formattedPrice} <Text style={styles.perPerson}>/ 1 Orang</Text></Text>
        </View>
        <View style={styles.alignRight}>
          <View style={styles.badgeTime}>
            <Text style={styles.badgeTimeText}>{time ? `${time} WIB • ${dateLabel}` : 'Pilih tanggal & jam'}</Text>
          </View>
          <Text style={styles.kapsterText}>Kapster: {barberName || 'Pilih barber'}</Text>
        </View>
      </View>
      
      <TouchableOpacity style={[styles.button, submitting && {opacity: 0.6}]} disabled={submitting || !serviceName || !time || !barberName} onPress={onSubmit} activeOpacity={0.8}>
        <Text style={styles.buttonText}>{submitting ? 'Memproses…' : 'Buat Reservasi →'}</Text>
      </TouchableOpacity>
      <Text style={styles.footerNote}>{serviceName || 'Pilih layanan'} · Reservasi dikonfirmasi oleh backend</Text>
    </View>
  );
}
