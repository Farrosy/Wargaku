import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, Alert, ImageBackground, Pressable, ScrollView, Text, View} from 'react-native';
import {AdditionalInfo} from './AdditionalInfo';
import {BarberInfoCard} from './BarberInfoCard';
import {CostSummaryCard} from './CostSummaryCard';
import {BookingDateOption, DateTimeSelector} from './DateTimeSelector';
import {styles} from './style';
import {AuthUser, Barber, createBooking, getAvailability, getBarbers, getServices, Service} from '../../services/auth';

function localDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function makeDateOptions(): BookingDateOption[] {
  return Array.from({length: 6}, (_, index) => {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() + index);
    return {
      value: localDate(date),
      day: date.toLocaleDateString('id-ID', {weekday: 'short'}).replace('.', '').toUpperCase(),
      number: String(date.getDate()),
      label: index === 0 ? 'Hari ini' : date.toLocaleDateString('id-ID', {month: 'short'}),
    };
  });
}

export function ReservationsScreen({token, user}: {token: string; user: AuthUser}) {
  const dates = useMemo(makeDateOptions, []);
  const [services, setServices] = useState<Service[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [serviceId, setServiceId] = useState<number>();
  const [barberId, setBarberId] = useState<number>();
  const [date, setDate] = useState(dates[0].value);
  const [slots, setSlots] = useState<string[]>([]);
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [loadingData, setLoadingData] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    Promise.all([getServices(), getBarbers()])
      .then(([serviceList, barberList]) => {
        if (!active) { return; }
        setError('');
        setServices(serviceList);
        setBarbers(barberList);
        setServiceId(serviceList[0]?.id);
        setBarberId(barberList.find(item => item.available)?.id);
      })
      .catch(err => { if (active) { setError(err instanceof Error ? err.message : 'Gagal memuat data reservasi.'); } })
      .finally(() => { if (active) { setLoadingData(false); } });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!serviceId || !barberId || !date) { setSlots([]); setTime(''); return; }
    let active = true;
    setLoadingSlots(true);
    setSlots([]);
    setTime('');
    getAvailability(barberId, serviceId, date)
      .then(available => { if (active) { setError(''); setSlots(available); setTime(available[0] || ''); } })
      .catch(err => { if (active) { setError(err instanceof Error ? err.message : 'Gagal memuat slot.'); } })
      .finally(() => { if (active) { setLoadingSlots(false); } });
    return () => { active = false; };
  }, [serviceId, barberId, date]);

  const service = services.find(item => item.id === serviceId);
  const barber = barbers.find(item => item.id === barberId);
  const dateLabel = dates.find(item => item.value === date)?.number || date;

  const submit = async () => {
    if (!service || !barber || !time) {
      Alert.alert('Pilihan belum lengkap', 'Pilih layanan, barber, tanggal, dan jam yang tersedia.');
      return;
    }
    setSubmitting(true);
    try {
      const result = await createBooking(token, {
        service_id: service.id,
        barber_id: barber.id,
        customer_name: user.name,
        customer_phone: user.phone,
        booking_date: date,
        booking_time: time,
        notes,
      });
      Alert.alert('Reservasi berhasil', `Kode tiket: ${result.booking.ticket_code}\nStatus: ${result.booking.status}`);
      setNotes('');
      setTime('');
      void getAvailability(barber.id, service.id, date).then(setSlots).catch(() => undefined);
    } catch (err) {
      Alert.alert('Reservasi gagal', err instanceof Error ? err.message : 'Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  return <View style={styles.page}>
    <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}><Text style={styles.stepText}>LANGKAH 1 DARI 2</Text><Text style={styles.stepTitle}>Jadwal & Kapster</Text></View>
      <View style={styles.progressBarBg}><View style={styles.progressBarFill} /></View>
      <ImageBackground source={{uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBD8eT2wEaRq6kUJe6bS5mGmONeBd-3ruDmZqCFyT8RYvklqFvLCOruVxLhgbsQNJqhmJ0GDgesymjVEksGWMGE4H05LaFaO9dFqULuV30-oPjYBIVqLpWoo3JX5XskNZ-mxnP_zrMCcQuorI8pAOvflCKdbqKCnKLhgzAYAd6Z0O1-yodpkqw3S1naCdhzKWu_hmDj-7WY5xm6STWRqYF6yfy6QzKELBuiWx6ve04S0dtvDESlw6SA'}} style={styles.atmosphereCard} imageStyle={styles.roundedImage}>
        <View style={styles.atmosphereOverlay}><Text style={styles.atmosphereText}>✓ Studio Flagship Kebayoran Baru</Text></View>
      </ImageBackground>
      {loadingData ? <ActivityIndicator color="#7b5821" style={{marginVertical: 30}} /> : <>
        {error ? <Text style={{color: '#a12b22', marginBottom: 12}}>{error}</Text> : null}
        <View style={{marginBottom: 16}}>
          <View style={styles.sectionHeader}><View><Text style={styles.sectionTitle}>Pilih Layanan</Text><Text style={styles.sectionSubtitle}>Geser untuk melihat layanan</Text></View></View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {services.map(item => {
            const active = item.id === serviceId;
            return <Pressable key={item.id} onPress={() => setServiceId(item.id)} style={[styles.serviceOptionCard, active && styles.serviceOptionCardActive]}>
              <Text style={[styles.serviceOptionTitle, active && styles.serviceOptionTitleActive]} numberOfLines={2}>{item.name}</Text>
              {!!item.description && <Text style={[styles.serviceOptionDescription, active && styles.serviceOptionDescriptionActive]} numberOfLines={3}>{item.description}</Text>}
            </Pressable>;
          })}
          </ScrollView>
          {!services.length && <Text style={styles.sectionSubtitle}>Tidak ada layanan yang tersedia.</Text>}
        </View>
        <BarberInfoCard barbers={barbers} selectedId={barberId} onSelect={item => setBarberId(item.id)} />
        <DateTimeSelector dates={dates} selectedDate={date} onDateSelect={setDate} slots={slots} selectedTime={time} onTimeSelect={setTime} loading={loadingSlots} />
        <AdditionalInfo notes={notes} onChangeNotes={setNotes} />
      </>}
    </ScrollView>
    {!loadingData && <CostSummaryCard price={service?.price || 0} serviceName={service?.name || ''} dateLabel={dateLabel} time={time} barberName={barber?.name || ''} submitting={submitting} onSubmit={submit} />}
  </View>;
}
