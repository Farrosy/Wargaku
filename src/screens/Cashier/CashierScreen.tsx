import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Alert, Linking, Pressable, ScrollView, Text, TextInput, View} from 'react-native';
import {AuthUser, Barber, cashierRequest, Service} from '../../services/auth';
import {styles} from './style';

type QueueItem = {
  id: number; ticket_code: string; status: string; payment_status: string; payment_method?: string;
  customer_name: string; customer_phone?: string; service_name: string; barber_name: string;
  barber_id: number; chair_number?: number; booking_date: string; booking_time: string;
  duration_minutes: number; total_amount: number; started_at?: string; is_walk_in: boolean;
};
type Summary = {waiting: number; in_service: number; done: number; revenue: number; cash_count: number; non_cash_count: number};
const CHAIRS = 3;
const filters = [{key: 'all', label: 'Semua'}, {key: 'ongoing', label: 'Dilayani'}, {key: 'waiting', label: 'Menunggu'}, {key: 'done', label: 'Selesai'}];
const money = (value?: number) => `Rp ${new Intl.NumberFormat('id-ID').format(value || 0)}`;
const typeOf = (item: QueueItem) => item.status === 'Sedang Dilayani' ? 'ongoing' : item.status === 'Selesai' ? 'done' : 'waiting';

export function CashierScreen({token, user, onLogout}: {token: string; user: AuthUser; onLogout: () => void}) {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState<number | null>(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceId, setServiceId] = useState<number | null>(null);
  const [barberId, setBarberId] = useState<number | null>(null);
  const [payment, setPayment] = useState('Tunai');
  const [saving, setSaving] = useState(false);

  const loadDashboard = useCallback(async () => {
    try {
      const [s, q] = await Promise.all([
        cashierRequest<{summary?: Summary} & Summary>('/cashier/summary', token),
        cashierRequest<{queue: QueueItem[]}>('/cashier/queue', token),
      ]);
      setSummary(s.summary || s);
      setQueue(q.queue || []);
      setError('');
    } catch (e) { setError(e instanceof Error ? e.message : 'Gagal memuat dashboard kasir.'); }
    finally { setLoading(false); }
  }, [token]);

  useEffect(() => {
    void loadDashboard();
    void Promise.all([
      cashierRequest<{services: Service[]}>('/services', token),
      cashierRequest<{barbers: Barber[]}>('/barbers', token),
    ]).then(([s, b]) => { setServices(s.services || []); setBarbers(b.barbers || []); })
      .catch(e => setError(e instanceof Error ? e.message : 'Gagal memuat data walk-in.'));
    const timer = setInterval(() => { void loadDashboard(); }, 30000);
    return () => clearInterval(timer);
  }, [loadDashboard, token]);

  const usedChairs = useMemo(() => queue.reduce<Record<number, QueueItem>>((acc, item) => {
    if (item.status === 'Sedang Dilayani' && item.chair_number) acc[item.chair_number] = item;
    return acc;
  }, {}), [queue]);
  const busyBarbers = useMemo(() => new Set(Object.values(usedChairs).map(item => item.barber_id)), [usedChairs]);
  const freeChair = Array.from({length: CHAIRS}, (_, i) => i + 1).find(chair => !usedChairs[chair]);
  const counts = useMemo(() => queue.reduce<Record<string, number>>((acc, item) => {
    const type = typeOf(item); acc[type] += 1; acc.all += 1; return acc;
  }, {all: 0, ongoing: 0, waiting: 0, done: 0}), [queue]);
  const visible = queue.filter(item => (filter === 'all' || typeOf(item) === filter) &&
    `${item.customer_name} ${item.ticket_code}`.toLowerCase().includes(search.trim().toLowerCase()));

  const act = async (item: QueueItem, action: string) => {
    if (action === 'cancel') {
      Alert.alert('Batalkan antrean?', `Pembayaran ${item.ticket_code} tidak dikembalikan.`, [
        {text: 'Kembali', style: 'cancel'}, {text: 'Batalkan', style: 'destructive', onPress: () => { void runAction(item, action); }},
      ]);
      return;
    }
    await runAction(item, action);
  };
  const runAction = async (item: QueueItem, action: string) => {
    setBusyId(item.id);
    try { await cashierRequest(`/cashier/bookings/${item.id}/${action}`, token, undefined, 'PATCH'); await loadDashboard(); }
    catch (e) { Alert.alert('Aksi gagal', e instanceof Error ? e.message : 'Silakan coba lagi.'); }
    finally { setBusyId(null); }
  };
  const createWalkIn = async () => {
    if (!name.trim() || !serviceId || !barberId) { Alert.alert('Data belum lengkap', 'Nama, layanan, dan barber wajib dipilih.'); return; }
    setSaving(true);
    try {
      const result = await cashierRequest<{ticket_code: string}>('/cashier/walk-in', token, {
        customer_name: name.trim(), customer_phone: phone.trim(), service_id: serviceId, barber_id: barberId, payment_method: payment,
      });
      Alert.alert('Walk-in tersimpan', `${result.ticket_code} sudah lunas.`);
      setName(''); setPhone(''); setServiceId(null); setBarberId(null); setPayment('Tunai');
      await loadDashboard();
    } catch (e) { Alert.alert('Walk-in gagal', e instanceof Error ? e.message : 'Silakan coba lagi.'); }
    finally { setSaving(false); }
  };
  const selectedService = services.find(s => s.id === serviceId);
  const sendReminder = async (item: QueueItem) => {
    const digits = (item.customer_phone || '').replace(/\D/g, '');
    const number = digits.startsWith('62') ? digits : digits.startsWith('0') ? `62${digits.slice(1)}` : digits.startsWith('8') ? `62${digits}` : digits;
    if (number.length < 8) { Alert.alert('Nomor tidak tersedia', 'Nomor WhatsApp pelanggan belum tercatat.'); return; }
    const moment = typeOf(item) === 'ongoing' ? 'sudah dimulai' : 'sebentar lagi dimulai';
    const message = `Halo ${item.customer_name}, ini Barber One. Jadwal ${item.service_name} kamu jam ${item.booking_time} WIB bersama ${item.barber_name} ${moment}. Kami tunggu ya!`;
    try { await Linking.openURL(`https://wa.me/${number}?text=${encodeURIComponent(message)}`); }
    catch { Alert.alert('WhatsApp tidak dapat dibuka', 'Pastikan WhatsApp tersedia di perangkat.'); }
  };

  return <View style={styles.page}>
    <View style={styles.topbar}><View><Text style={styles.brand}>BARBER ONE · KASIR</Text><Text style={styles.welcome}>Selamat bertugas, {user.name}</Text></View>
      <View style={styles.topActions}><Pressable style={styles.refresh} onPress={() => { setLoading(true); void loadDashboard(); }}><Text style={styles.refreshText}>↻  Refresh</Text></Pressable><Pressable onPress={onLogout}><Text style={styles.logout}>Keluar</Text></Pressable></View>
    </View>
    <ScrollView contentContainerStyle={styles.content}>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View style={styles.metrics}>
        <Metric label="ANTREAN MENUNGGU" value={summary?.waiting ?? counts.waiting} detail="Sudah lunas, menunggu kursi" />
        <Metric label="KAPASITAS KURSI" value={`${summary?.in_service ?? Object.keys(usedChairs).length} / ${CHAIRS}`} detail={`${CHAIRS - Object.keys(usedChairs).length} kursi tersedia`} />
        <Metric label="SELESAI HARI INI" value={summary?.done ?? counts.done} detail="Sesi selesai" />
        <Metric label="OMZET SEMENTARA" value={money(summary?.revenue)} detail={`${summary?.cash_count ?? 0} tunai · ${summary?.non_cash_count ?? 0} non-tunai`} />
      </View>
      <View style={styles.columns}>
        <View style={styles.queueColumn}>
          <View style={styles.sectionHeading}><View><Text style={styles.sectionTitle}>Antrean & status kursi</Text><Text style={styles.muted}>Daftar booking dan rotasi kursi hari ini</Text></View><Text style={styles.live}>● LIVE</Text></View>
          <TextInput style={styles.search} value={search} onChangeText={setSearch} placeholder="Cari nama atau nomor tiket" placeholderTextColor="#8a8a83" />
          <View style={styles.filters}>{filters.map(f => <Pressable key={f.key} onPress={() => setFilter(f.key)} style={[styles.filter, filter === f.key && styles.filterActive]}><Text style={[styles.filterText, filter === f.key && styles.filterTextActive]}>{f.label} ({counts[f.key]})</Text></Pressable>)}</View>
          {loading && queue.length === 0 ? <Text style={styles.empty}>Memuat antrean...</Text> : visible.length === 0 ? <Text style={styles.empty}>Belum ada antrean untuk filter ini.</Text> : visible.map(item => <QueueCard key={item.id} item={item} busy={busyId === item.id} onAction={action => { void act(item, action); }} onReminder={() => { void sendReminder(item); }} />)}
          <Text style={styles.sectionTitle}>Rotasi kursi hari ini</Text>
          <View style={styles.chairs}>{Array.from({length: CHAIRS}, (_, i) => i + 1).map(chair => <View key={chair} style={[styles.chair, usedChairs[chair] && styles.chairBusy]}><Text style={styles.chairLabel}>KURSI {String(chair).padStart(2, '0')}</Text><Text style={styles.chairName}>{usedChairs[chair]?.barber_name || 'Kosong'}</Text><Text style={styles.muted}>{usedChairs[chair]?.customer_name || 'Tersedia / siap'}</Text></View>)}</View>
        </View>
        <View style={styles.walkinColumn}>
          <Text style={styles.sectionTitle}>Input walk-in cepat</Text><Text style={styles.muted}>{freeChair ? `Stasiun tersedia: Kursi ${String(freeChair).padStart(2, '0')}` : 'Semua kursi sedang terisi'}</Text>
          <Text style={styles.fieldLabel}>NAMA TAMU *</Text><TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nama pelanggan" maxLength={100} />
          <Text style={styles.fieldLabel}>NOMOR WHATSAPP / HP</Text><TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Opsional" keyboardType="phone-pad" maxLength={20} />
          <Text style={styles.fieldLabel}>PILIH LAYANAN</Text>
          {services.map(service => <Choice key={service.id} active={serviceId === service.id} title={service.name} detail={`${service.duration_minutes} menit`} price={money(service.price)} onPress={() => setServiceId(service.id)} />)}
          <Text style={styles.fieldLabel}>PILIH BARBER</Text><View style={styles.barberChoices}>{barbers.map(barber => { const disabled = !barber.available || busyBarbers.has(barber.id); return <Pressable key={barber.id} disabled={disabled} onPress={() => setBarberId(barber.id)} style={[styles.barberChoice, barberId === barber.id && styles.choiceActive, disabled && styles.choiceDisabled]}><Text style={styles.choiceTitle}>{barber.name}</Text><Text style={styles.muted}>{disabled ? (barber.available ? 'Sedang melayani' : 'Tidak bertugas') : 'Siap'}</Text></Pressable>; })}</View>
          <View style={styles.total}><Text style={styles.fieldLabel}>TOTAL TAGIHAN</Text><Text style={styles.totalAmount}>{money(selectedService?.price)}</Text></View>
          <Text style={styles.fieldLabel}>METODE PEMBAYARAN</Text><View style={styles.payments}>{['Tunai', 'QRIS', 'Debit', 'Transfer'].map(method => <Pressable key={method} onPress={() => setPayment(method)} style={[styles.payment, payment === method && styles.choiceActive]}><Text style={styles.paymentText}>{method}</Text></Pressable>)}</View>
          <Text style={styles.paymentNote}>Pembayaran wajib lunas sebelum tiket antrean diterbitkan.</Text>
          <Pressable disabled={saving} onPress={() => { void createWalkIn(); }} style={[styles.submit, saving && styles.submitDisabled]}><Text style={styles.submitText}>{saving ? 'Menyimpan...' : 'Konfirmasi bayar & simpan'}</Text></Pressable>
        </View>
      </View>
    </ScrollView>
  </View>;
}

function Metric({label, value, detail}: {label: string; value: string | number; detail: string}) { return <View style={styles.metric}><Text style={styles.metricLabel}>{label}</Text><Text style={styles.metricValue}>{value}</Text><Text style={styles.muted}>{detail}</Text></View>; }
function Choice({active, title, detail, price, onPress}: {active: boolean; title: string; detail: string; price: string; onPress: () => void}) { return <Pressable onPress={onPress} style={[styles.serviceChoice, active && styles.choiceActive]}><View><Text style={styles.choiceTitle}>{title}</Text><Text style={styles.muted}>{detail}</Text></View><Text style={styles.choicePrice}>{price}</Text></Pressable>; }
function QueueCard({item, busy, onAction, onReminder}: {item: QueueItem; busy: boolean; onAction: (action: string) => void; onReminder: () => void}) {
  const type = typeOf(item);
  const startedAt = item.started_at ? new Date(item.started_at).getTime() : 0;
  const mins = (limit: number) => Math.max(0, Math.ceil((startedAt + limit * 60000 - Date.now()) / 60000));
  const timeOk = Date.now() >= new Date(`${item.booking_date}T${item.booking_time}:00+07:00`).getTime();
  const canStart = type === 'waiting' && item.status === 'Dikonfirmasi' && item.payment_status === 'Lunas' && timeOk;
  const finishWait = mins(30); const cancelWait = mins(10);
  return <View style={[styles.ticket, type === 'ongoing' && styles.ticketOngoing]}>
    <View style={styles.ticketHeader}><Text style={styles.ticketCode}>#{item.ticket_code}</Text><Text style={styles.badge}>{type === 'ongoing' ? `KURSI ${String(item.chair_number || 0).padStart(2, '0')} · DILAYANI` : type === 'done' ? 'SELESAI & LUNAS' : 'MENUNGGU JADWAL'}</Text><Text style={styles.muted}>{item.is_walk_in ? 'Walk-in' : 'Booking web'}</Text></View>
    <View style={styles.ticketDetails}><View style={styles.detailBlock}><Text style={styles.fieldLabel}>PELANGGAN</Text><Text style={styles.choiceTitle}>{item.customer_name}</Text><Text style={styles.muted}>{item.customer_phone || ''}</Text></View><View style={styles.detailBlock}><Text style={styles.fieldLabel}>LAYANAN · {item.booking_time} WIB</Text><Text style={styles.choiceTitle}>{item.service_name}</Text><Text style={styles.muted}>{item.barber_name} · {item.duration_minutes} menit</Text></View></View>
    {type !== 'done' && <View style={styles.ticketActions}>{type === 'waiting' && <Action title="Mulai dilayani" disabled={!canStart} busy={busy} onPress={() => onAction('start')} />}<Action title={finishWait ? `Selesai (${finishWait} mnt)` : 'Selesai'} disabled={type !== 'ongoing' || finishWait > 0} busy={busy} onPress={() => onAction('finish')} /><Action title={cancelWait ? `Batal (${cancelWait} mnt)` : 'Batal'} disabled={type !== 'ongoing' || cancelWait > 0} busy={busy} danger onPress={() => onAction('cancel')} /><Pressable style={styles.whatsapp} onPress={onReminder}><Text style={styles.whatsappText}>Reminder WA</Text></Pressable></View>}
  </View>;
}
function Action({title, disabled, busy, danger, onPress}: {title: string; disabled: boolean; busy: boolean; danger?: boolean; onPress: () => void}) { return <Pressable disabled={disabled || busy} onPress={onPress} style={[styles.action, danger && styles.actionDanger, (disabled || busy) && styles.actionDisabled]}><Text style={[styles.actionText, danger && styles.dangerText]}>{busy ? '...' : title}</Text></Pressable>; }
