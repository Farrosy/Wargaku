import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Pressable, ScrollView, Text, View} from 'react-native';
import {BookingDetail, getBookingDetail} from '../../services/auth';
import {detailStyles as styles} from './detailStyle';

function rupiah(amount: number) {
  return new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR', maximumFractionDigits: 0}).format(amount || 0);
}

function bookingStatus(booking: BookingDetail) {
  if (booking.status === 'Sedang Dilayani') return booking.chair_number ? `Sedang Dilayani · Kursi ${booking.chair_number}` : 'Sedang Dilayani';
  if (booking.status === 'Dikonfirmasi' || (booking.status === 'Menunggu' && booking.payment_status === 'Lunas')) return booking.chair_number ? `Menunggu Kedatangan · Kursi ${booking.chair_number}` : 'Menunggu Kedatangan';
  if (booking.status === 'Batal') return 'Dibatalkan';
  if (booking.payment_status === 'Gagal') return 'Pembayaran Gagal';
  return 'Menunggu Pembayaran';
}

export function TicketDetailScreen({token, bookingId, onBack, onResumePayment}: {token: string; bookingId: number; onBack: () => void; onResumePayment?: (url: string, ticketCode: string) => void}) {
  const [booking, setBooking] = useState<BookingDetail | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getBookingDetail(token, bookingId)
      .then(result => {if (mounted) {setBooking(result); setError('');}})
      .catch(err => {if (mounted) {setError(err instanceof Error ? err.message : 'Gagal memuat detail reservasi.');}})
      .finally(() => {if (mounted) {setLoading(false);}});
    return () => {mounted = false;};
  }, [bookingId, token]);

  return <ScrollView style={styles.page} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
    <Pressable accessibilityRole="button" onPress={onBack} style={styles.backButton}><Text style={styles.backText}>‹  Kembali ke Tiket Saya</Text></Pressable>
    <Text style={styles.eyebrow}>BARBER ONE  /  DETAIL RESERVASI</Text>
    <Text style={styles.title}>Detail Reservasi</Text>
    {loading ? <View style={styles.loading}><ActivityIndicator color="#7b5821" /><Text style={styles.muted}>Memuat detail reservasi...</Text></View> : null}
    {!!error && <View style={styles.errorCard}><Text style={styles.errorText}>{error}</Text><Pressable onPress={() => {setLoading(true); setError(''); getBookingDetail(token, bookingId).then(setBooking).catch(err => setError(err instanceof Error ? err.message : 'Gagal memuat detail reservasi.')).finally(() => setLoading(false));}}><Text style={styles.retry}>Coba lagi</Text></Pressable></View>}
    {booking && <>
      <View style={styles.statusCard}><Text style={styles.statusLabel}>STATUS RESERVASI</Text><Text style={styles.statusValue}>{bookingStatus(booking)}</Text></View>
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Informasi Reservasi</Text>
        <Detail label="LAYANAN" value={booking.service_name} secondary={`${booking.duration_minutes} menit`} />
        <Detail label="JADWAL" value={new Date(`${booking.booking_date}T12:00:00`).toLocaleDateString('id-ID', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'})} secondary={`${booking.booking_time} WIB`} />
        <Detail label="BARBER" value={booking.barber_name} secondary="Senopati" />
        <Detail label="PEMESAN" value={booking.customer_name} secondary={booking.customer_phone} />
        {!!booking.notes && <Detail label="CATATAN" value={booking.notes} />}
        <View style={styles.codeBox}><Text style={styles.codeLabel}>KODE TIKET RESERVASI</Text><Text style={styles.codeValue}>{booking.ticket_code}</Text></View>
      </View>
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Status Pembayaran</Text>
        <View style={styles.totalRow}><Text style={styles.muted}>TOTAL</Text><Text style={styles.total}>{rupiah(booking.total_amount || booking.price)}</Text></View>
        <Text style={[styles.paymentMethod, booking.payment_status === 'Menunggu' && styles.paymentPending]}>{booking.payment_status === 'Lunas' ? `✓  Dibayar via ${booking.payment_method || 'Midtrans'}` : `◷  ${booking.payment_status || 'Menunggu pembayaran'} · Midtrans`}</Text>
        {booking.payment_expires_at && booking.payment_status === 'Menunggu' ? <Text style={styles.expiry}>Sesi pembayaran berlaku hingga {new Date(booking.payment_expires_at).toLocaleString('id-ID')}</Text> : null}
        {booking.payment_status === 'Menunggu' && booking.payment_redirect_url && onResumePayment ? <Pressable accessibilityRole="button" style={styles.paymentButton} onPress={() => onResumePayment(booking.payment_redirect_url!, booking.ticket_code)}><Text style={styles.paymentButtonText}>Lanjutkan Pembayaran →</Text></Pressable> : null}
      </View>
    </>}
  </ScrollView>;
}

function Detail({label, value, secondary}: {label: string; value: string; secondary?: string}) {
  return <View style={styles.detailRow}><Text style={styles.detailIcon}>•</Text><View style={styles.detailCopy}><Text style={styles.detailLabel}>{label}</Text><Text style={styles.detailValue}>{value}</Text>{secondary ? <Text style={styles.detailSecondary}>{secondary}</Text> : null}</View></View>;
}
