import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {BottomNavbar, PageName} from '../../components/BottomNavbar/BottomNavbar';
import {HomeContent} from './HomeContent';
import {ProfileScreen} from '../Profile/ProfileScreen';
import {ReservationsScreen} from '../Reservations/ReservationsScreen';
import {TicketsScreen} from '../Tickets/TicketsScreen';
import {TicketDetailScreen} from '../Tickets/TicketDetailScreen';
import {PaymentResultStatus, PaymentScreen} from '../Payment/PaymentScreen';
import {AuthUser} from '../../services/auth';

export function HomeScreen({onLogout, token, user}: {onLogout: () => void; token: string; user: AuthUser}) {
  const [activePage, setActivePage] = useState<PageName>('Beranda');
  const [selectedServiceId, setSelectedServiceId] = useState<number | undefined>();
  const [ticketDetailId, setTicketDetailId] = useState<number | null>(null);
  const [payment, setPayment] = useState<{url: string; ticketCode: string} | null>(null);
  const [paymentReturnPage, setPaymentReturnPage] = useState<PageName>('Reservasi');

  // Saat user belum menyelesaikan pembayaran, tampilkan layar Payment penuh.
  if (payment) {
    return (
      <View style={styles.page}>
        <PaymentScreen
          url={payment.url}
          ticketCode={payment.ticketCode}
          onDone={() => {
            setPayment(null);
            setActivePage(paymentReturnPage);
          }}
          onResult={(status: PaymentResultStatus) => {
            setPayment(null);
            if (status === 'success') {
              setActivePage('Tiket Saya');
              Alert.alert('Status Pembayaran', 'Pembayaran berhasil dan tiket kamu sudah aktif.');
              return;
            }
            setActivePage(paymentReturnPage);
            Alert.alert('Pembayaran Belum Selesai', 'Kamu bisa melanjutkan pembayaran dari detail tiket.');
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        {activePage === 'Beranda' && <HomeContent user={user} onNavigate={(page, serviceId) => { setSelectedServiceId(serviceId); setActivePage(page); }} />}
        {activePage === 'Reservasi' && (
          <ReservationsScreen
            token={token}
            user={user}
            initialServiceId={selectedServiceId}
            onPayment={(url, ticketCode) => { setPaymentReturnPage('Reservasi'); setPayment({url, ticketCode}); }}
          />
        )}
        {activePage === 'Tiket Saya' && (ticketDetailId === null
          ? <TicketsScreen token={token} onMakeReservation={() => setActivePage('Reservasi')} onOpenDetail={setTicketDetailId} />
          : <TicketDetailScreen token={token} bookingId={ticketDetailId} onBack={() => setTicketDetailId(null)} onResumePayment={(url, ticketCode) => { setPaymentReturnPage('Tiket Saya'); setPayment({url, ticketCode}); }} />)}
        {activePage === 'Profil' && <ProfileScreen token={token} user={user} onLogout={onLogout} />}
      </View>
      <BottomNavbar activePage={activePage} onPageChange={setActivePage} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {backgroundColor: '#f7f7f5', flex: 1},
  content: {flex: 1, justifyContent: 'center', paddingVertical: 20},
});
