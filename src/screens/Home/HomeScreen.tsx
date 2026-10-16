import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {BottomNavbar, PageName} from '../../components/BottomNavbar/BottomNavbar';
import {styles} from './style';
import {ProfileScreen} from '../Profile/ProfileScreen';
import {ReservationsScreen} from '../Reservations/ReservationsScreen';
import {TicketsScreen} from '../Tickets/TicketsScreen';
import {AuthUser} from '../../services/auth';

export function HomeScreen({onLogout, token, user}: {onLogout: () => void; token: string; user: AuthUser}) {
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
        {activePage === 'Reservasi' && <ReservationsScreen token={token} user={user} />}
        {activePage === 'Tiket Saya' && <TicketsScreen />}
        {activePage === 'Profil' && <ProfileScreen onLogout={onLogout} />}
      </View>
      <BottomNavbar activePage={activePage} onPageChange={setActivePage} />
    </View>
  );
}
