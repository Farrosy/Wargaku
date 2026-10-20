import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {BottomNavbar, PageName} from '../../components/BottomNavbar/BottomNavbar';
import {HomeContent} from './HomeContent';
import {ProfileScreen} from '../Profile/ProfileScreen';
import {ReservationsScreen} from '../Reservations/ReservationsScreen';
import {TicketsScreen} from '../Tickets/TicketsScreen';
import {PaymentResultStatus, PaymentScreen} from '../Payment/PaymentScreen';
import {AuthUser} from '../../services/auth';

export function HomeScreen({onLogout, token, user}: {onLogout: () => void; token: string; user: AuthUser}) {
  const [activePage, setActivePage] = useState<PageName>('Beranda');
  const [payment, setPayment] = useState<{url: string; ticketCode: string} | null>(null);

  // Saat user belum menyelesaikan pembayaran, tampilkan layar Payment penuh.
  if (payment) {
    return (
      <View style={styles.page}>
        <PaymentScreen
          url={payment.url}
          ticketCode={payment.ticketCode}
          onDone={() => {
            setPayment(null);
            setActivePage('Reservasi');
          }}
          onResult={(status: PaymentResultStatus) => {
            setPayment(null);
            setActivePage('Tiket Saya');
            const messages: Record<PaymentResultStatus, string> = {
              success: 'Pembayaran berhasil dan tiket kamu sudah aktif.',
              pending: 'Pembayaran masih diproses. Tiket akan aktif setelah lunas.',
              failed: 'Pembayaran gagal. Kamu bisa coba reservasi ulang.',
            };
            Alert.alert('Status Pembayaran', messages[status]);
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        {activePage === 'Beranda' && <HomeContent user={user} onNavigate={setActivePage} />}
        {activePage === 'Reservasi' && (
          <ReservationsScreen
            token={token}
            user={user}
            onPayment={(url, ticketCode) => setPayment({url, ticketCode})}
          />
        )}
        {activePage === 'Tiket Saya' && <TicketsScreen token={token} onMakeReservation={() => setActivePage('Reservasi')} />}
        {activePage === 'Profil' && <ProfileScreen onLogout={onLogout} />}
      </View>
      <BottomNavbar activePage={activePage} onPageChange={setActivePage} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {backgroundColor: '#f7f7f5', flex: 1},
  content: {flex: 1, justifyContent: 'center', paddingVertical: 20},
});
