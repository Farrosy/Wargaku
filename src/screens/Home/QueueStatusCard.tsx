import React from 'react';
import {Text, View} from 'react-native';
import {Barber} from '../../services/auth';
import {styles} from './style';

type Props = {
  barbers: Barber[];
};

// Status kursi studio: setiap barber mewakili satu kursi.
// available === true  -> kursi siap langsung (hijau).
// available === false -> kursi sedang menangani tamu (aktif).
export function QueueStatusCard({barbers}: Props) {
  const available = barbers.filter(barber => barber.available);
  const busy = barbers.length - available.length;
  const waitMinutes = busy === 0 ? 0 : 15 + (busy - 1) * 15;

  return (
    <View style={styles.queueCard}>
      <View style={styles.queueHead}>
        <View style={styles.queueHeadLeft}>
          <Text style={styles.queueIcon}>🪑</Text>
          <Text style={styles.queueTitle}>Status Antrean Studio</Text>
        </View>
        <View style={styles.queueBadge}>
          <View style={styles.queueBadgeDot} />
          <Text style={styles.queueBadgeText}>
            {waitMinutes === 0 ? 'Langsung Melayani' : `Waktu Tunggu ~${waitMinutes} Mnt`}
          </Text>
        </View>
      </View>

      {barbers.length === 0 ? (
        <Text style={styles.queueEmpty}>Belum ada data kursi.</Text>
      ) : (
        <View style={styles.chairGrid}>
          {barbers.map((barber, index) => (
            <View key={barber.id} style={styles.chairTile}>
              <Text style={styles.chairLabel}>Kursi {index + 1}</Text>
              <View style={[styles.chairDot, barber.available ? styles.chairDotAvailable : styles.chairDotBusy]} />
              <Text style={[styles.chairStatus, barber.available ? styles.chairStatusAvailable : styles.chairStatusBusy]}>
                {barber.available ? 'Tersedia' : 'Aktif'}
              </Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.queueFoot}>
        <View style={styles.queueFootLeft}>
          <Text style={styles.queueFootIcon}>⏱</Text>
          <Text style={styles.queueFootText}>Sesi Berjalan: {busy} Tamu</Text>
        </View>
        <Text style={styles.queueFootHighlight}>{available.length} Kursi Siap Langsung</Text>
      </View>
    </View>
  );
}
