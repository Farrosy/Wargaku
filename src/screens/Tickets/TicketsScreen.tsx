import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, Pressable, ScrollView, Text, View} from 'react-native';
import {getMyTickets, getReviews, MyTickets, TicketBooking} from '../../services/auth';
import {ReviewModal} from './ReviewModal';
import {styles} from './style';

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN', 'JUL', 'AGU', 'SEP', 'OKT', 'NOV', 'DES'];

function rupiah(amount: number) {
  return new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR', maximumFractionDigits: 0}).format(amount || 0);
}

function dateLabel(value: string) {
  return new Date(`${value}T12:00:00`).toLocaleDateString('id-ID', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'});
}

function TicketStatus({ticket}: {ticket: TicketBooking}) {
  const paid = ticket.payment_status === 'Lunas';
  const failed = ticket.payment_status === 'Gagal';
  return <Text style={[styles.statusBadge, paid ? styles.statusPaid : failed ? styles.statusFailed : styles.statusPending]}>{paid ? 'LUNAS' : failed ? 'PEMBAYARAN GAGAL' : 'MENUNGGU PEMBAYARAN'}</Text>;
}

export function TicketsScreen({token, onMakeReservation, onOpenDetail}: {token: string; onMakeReservation?: () => void; onOpenDetail?: (bookingId: number) => void}) {
  const [data, setData] = useState<MyTickets | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [year, setYear] = useState('SEMUA');

  // Booking yang sudah pernah direview, agar tombol beri review tidak muncul dua kali.
  const [reviewedIds, setReviewedIds] = useState<Set<number>>(new Set());
  const [reviewBooking, setReviewBooking] = useState<TicketBooking | null>(null);

  const refreshReviewed = useCallback((bookingId?: number) => {
    // Optimis: booking yang baru direview langsung dianggap sudah direview agar badge berubah seketika.
    if (bookingId) {
      setReviewedIds(previous => {
        const next = new Set(previous);
        next.add(bookingId);
        return next;
      });
    }
    // Sinkronisasi dengan server (ambil daftar review terkini).
    getReviews()
      .then(list => setReviewedIds(new Set(list.map(item => item.booking_id))))
      .catch(() => {});
  }, []);

  useEffect(() => { refreshReviewed(); }, [refreshReviewed]);

  const loadTickets = useCallback(() => {
    setLoading(true);
    getMyTickets(token)
      .then(result => {setData(result); setError('');})
      .catch(err => setError(err instanceof Error ? err.message : 'Gagal memuat data tiket.'))
      .finally(() => setLoading(false));
  }, [token]);

  useEffect(() => { loadTickets(); }, [loadTickets]);

  const historyYears = useMemo(() => ['SEMUA', ...Array.from(new Set((data?.history || []).map(item => item.booking_date.slice(0, 4))))], [data]);
  const history = (data?.history || []).filter(item => year === 'SEMUA' || item.booking_date.startsWith(year));
  const active = data?.active?.payment_status === 'Gagal' ? null : data?.active;

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.eyebrow}>BARBER ONE  /  AKUN SAYA</Text>
      <Text style={styles.title}>Tiket Saya</Text>
      <Text style={styles.description}>Halo, {data?.user.name || 'Pelanggan'}. Lihat jadwal dan kunjungan Anda.</Text>

      {data && <View style={styles.statsRow}>
        <View style={styles.statCard}><Text style={styles.statIcon}>✂</Text><Text style={styles.statValue}>{data.stats.visits} kali</Text><Text style={styles.statLabel}>KUNJUNGAN</Text></View>
        <View style={styles.statCard}><Text style={styles.statIcon}>★</Text><Text style={styles.statValue} numberOfLines={1}>{data.stats.favorite_barber || '-'}</Text><Text style={styles.statLabel}>BARBER FAVORIT</Text></View>
      </View>}

      {loading && !data ? <View style={styles.centered}><ActivityIndicator color="#7b5821" /><Text style={styles.muted}>Memuat tiket Anda...</Text></View> : null}
      {!!error && <View style={styles.errorCard}><Text style={styles.errorText}>{error}</Text><Pressable style={styles.retryButton} onPress={loadTickets}><Text style={styles.retryText}>Coba Lagi</Text></Pressable></View>}

      <View style={styles.sectionHeading}><Text style={styles.sectionTitle}>Tiket Aktif</Text><Text style={styles.sectionCaption}>RESERVASI MENDATANG</Text></View>
      {active ? <View style={styles.activeCard}>
        <View style={styles.cardTop}><Text style={styles.ticketCode}>TIKET  #{active.ticket_code}</Text><TicketStatus ticket={active} /></View>
        <Text style={styles.serviceName}>{active.service_name}</Text>
        <View style={styles.datePanel}><Text style={styles.dateIcon}>▦</Text><View style={styles.dateCopy}><Text style={styles.dateCaption}>JADWAL RESERVASI</Text><Text style={styles.dateText}>{dateLabel(active.booking_date)}</Text></View></View>
        <View style={styles.detailRow}><Text style={styles.detailLabel}>WAKTU</Text><Text style={styles.detailValue}>{active.booking_time} WIB</Text></View>
        <View style={styles.detailRow}><Text style={styles.detailLabel}>BARBER</Text><Text style={styles.detailValue}>{active.barber_name} · {active.chair_number ? `Kursi #${String(active.chair_number).padStart(2, '0')}` : 'Senopati'}</Text></View>
        <View style={styles.cardDivider} />
        <View style={styles.totalRow}><Text style={styles.detailLabel}>TOTAL</Text><Text style={styles.totalValue}>{rupiah(active.total_amount)}</Text></View>
        {onOpenDetail ? <Pressable style={styles.detailButton} onPress={() => onOpenDetail(active.id)}><Text style={styles.detailButtonText}>Lihat Detail Reservasi  →</Text></Pressable> : null}
      </View> : <View style={styles.emptyCard}><Text style={styles.emptyIcon}>▤</Text><Text style={styles.emptyTitle}>Belum Ada Tiket Aktif</Text><Text style={styles.muted}>Reservasi mendatang Anda akan tampil di sini.</Text>{onMakeReservation ? <Pressable style={styles.reserveButton} onPress={onMakeReservation}><Text style={styles.reserveButtonText}>Buat Reservasi</Text></Pressable> : null}</View>}

      <View style={[styles.sectionHeading, styles.historyHeading]}><View><Text style={styles.sectionTitle}>Riwayat Kunjungan</Text><Text style={styles.historyDescription}>Arsip kunjungan dan transaksi Anda.</Text></View></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
        {historyYears.map(item => <Pressable key={item} onPress={() => setYear(item)} style={[styles.filter, year === item && styles.filterActive]}><Text style={[styles.filterText, year === item && styles.filterTextActive]}>{item}</Text></Pressable>)}
      </ScrollView>
      {history.length === 0 ? <Text style={styles.noHistory}>Belum ada riwayat kunjungan pada periode ini.</Text> : history.map(item => {
        const [, month, day] = item.booking_date.split('-').map(Number);
        return <View key={item.id} style={styles.historyCard}>
          <View style={styles.historyDate}><Text style={styles.historyMonth}>{MONTHS[month - 1]}</Text><Text style={styles.historyDay}>{String(day).padStart(2, '0')}</Text></View>
          <View style={styles.historyInfo}><Text style={styles.historyService} numberOfLines={2}>{item.service_name}</Text><Text style={styles.historyMeta}>{item.barber_name} · {item.booking_time}</Text><Text style={[styles.historyStatus, item.payment_status === 'Gagal' && styles.failedText]}>{item.payment_status === 'Gagal' ? 'PEMBAYARAN GAGAL' : `SELESAI${item.payment_status === 'Lunas' ? ' · LUNAS' : ''}`}</Text>
            {/* Aksi review: hanya untuk kunjungan yang terbayar dan belum direview */}
            {item.payment_status !== 'Gagal' && (reviewedIds.has(item.id)
              ? <Text style={styles.reviewedBadge}>★  SUDAH DIREVIEW</Text>
              : <Pressable accessibilityRole="button" style={styles.reviewMiniButton} onPress={() => setReviewBooking(item)}>
                  <Text style={styles.reviewMiniText}>★  BERI REVIEW</Text>
                </Pressable>)}
          </View>
          <Text style={styles.historyPrice}>{rupiah(item.total_amount)}</Text>
        </View>;
      })}
      <ReviewModal visible={!!reviewBooking} token={token} booking={reviewBooking} onClose={() => setReviewBooking(null)} onSubmitted={refreshReviewed} />
    </ScrollView>
  );
}
