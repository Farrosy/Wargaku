import React from 'react';
import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import {Barber} from '../../services/auth';
import {styles} from './style';

export function BarberInfoCard({barbers, selectedId, onSelect}: {barbers: Barber[]; selectedId?: number; onSelect: (barber: Barber) => void}) {
  return <View>
    <View style={styles.sectionHeader}>
      <View><Text style={styles.sectionTitle}>Pilih Master Barber</Text><Text style={styles.sectionSubtitle}>Pilih barber yang tersedia</Text></View>
      <View style={styles.badgeCount}><Text style={styles.badgeCountText}>{barbers.filter(item => item.available).length} tersedia</Text></View>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
      {barbers.map(barber => {
        const active = selectedId === barber.id;
        return <Pressable key={barber.id} disabled={!barber.available} onPress={() => onSelect(barber)} style={[styles.barberCard, active && styles.barberCardActive, !barber.available && {opacity: 0.45}]}>
          <View style={styles.barberTop}>
            <Image source={{uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCAM9IolqolOYbvU8er4YQxYSf3kSJUgkaBH7xGJuWoX1DnRCjPkq3SNRELZmkvitVWigwOEOZjGQXM7UxCAvU7ChCw8-D6QRH7GEHa-aqaVW0FAkYmRrMya6km06beavKO4vGoI1cn3ara98CsONqNsmW-_T1mC64iHY64cHRgG-P6dI6MFMk8l9rpruAoXez0kssofCcxEbLgOmba5RPlkKyhDERcO5k90VaTs4vP4OK_YLOurVD'} } style={styles.barberImg} />
            <View><Text style={active ? styles.barberNameActive : styles.barberName}>{barber.name}</Text><Text style={active ? styles.barberRoleActive : styles.barberRole}>Master Barber</Text></View>
          </View>
          <View style={active ? styles.barberBottomActive : styles.barberBottom}>
            <Text style={active ? styles.barberBottomTextActive : styles.barberBottomText}>Kursi • ⭐ {Number(barber.rating).toFixed(1)}</Text>
            <Text style={active ? styles.barberBottomTextActive : styles.barberBottomText}>{barber.available ? 'Tersedia' : 'Tidak tersedia'}</Text>
          </View>
        </Pressable>;
      })}
      {barbers.length === 0 && <Text style={styles.sectionSubtitle}>Belum ada data barber.</Text>}
    </ScrollView>
  </View>;
}
