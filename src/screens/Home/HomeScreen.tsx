import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BottomNavbar, PageName} from '../../components/BottomNavbar/BottomNavbar';
import {ProfileScreen} from '../Profile/ProfileScreen';
import {ReservationsScreen} from '../Reservations/ReservationsScreen';
import {TicketsScreen} from '../Tickets/TicketsScreen';

export function HomeScreen({onLogout}: {onLogout: () => void}) {
  const [activePage, setActivePage] = useState<PageName>('Beranda');

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        {activePage === 'Beranda' && (
          <View>
            <Text style={styles.brand}>BARBER ONE</Text>
            <Text style={styles.title}>Selamat datang!</Text>
            <Text style={styles.subtitle}>Senang melihat Anda kembali.</Text>
          </View>
        )}
        {activePage === 'Reservasi' && <ReservationsScreen />}
        {activePage === 'Tiket Saya' && <TicketsScreen />}
        {activePage === 'Profil' && <ProfileScreen onLogout={onLogout} />}
      </View>
      <BottomNavbar activePage={activePage} onPageChange={setActivePage} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {backgroundColor: '#f7f7f5', flex: 1},
  content: {flex: 1, justifyContent: 'center', padding: 24},
  brand: {color: '#8b6b43', fontSize: 13, fontWeight: '800', letterSpacing: 2, marginBottom: 16},
  title: {color: '#20201d', fontSize: 30, fontWeight: '800'},
  subtitle: {color: '#777770', fontSize: 15, marginTop: 8},
});
