import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {styles} from './style';

// Must match bookingStartTimes in backend/bookings.go.
const allBookingSlots = ['10:00', '10:45', '11:30', '12:15', '13:00', '13:45', '14:30', '15:15', '16:00', '16:45', '17:30', '18:15', '19:00', '19:45'];

export type BookingDateOption = {value: string; day: string; number: string; label: string};

export function DateTimeSelector({dates, selectedDate, onDateSelect, slots, selectedTime, onTimeSelect, loading}: {
  dates: BookingDateOption[]; selectedDate: string; onDateSelect: (date: string) => void;
  slots: string[]; selectedTime: string; onTimeSelect: (time: string) => void; loading: boolean;
}) {
  const groupedSlots = [
    {label: 'SESI PAGI', items: allBookingSlots.filter(slot => Number(slot.slice(0, 2)) < 12), style: styles.timeGrid3, slotStyle: styles.timeSlot3},
    {label: 'SESI SIANG & SORE', items: allBookingSlots.filter(slot => Number(slot.slice(0, 2)) >= 12 && Number(slot.slice(0, 2)) < 18), style: styles.timeGrid4, slotStyle: styles.timeSlot4},
    {label: 'SESI MALAM', items: allBookingSlots.filter(slot => Number(slot.slice(0, 2)) >= 18), style: styles.timeGrid3, slotStyle: styles.timeSlot3},
  ];
  const selected = dates.find(item => item.value === selectedDate);
  const selectedDateText = selected ? new Date(`${selected.value}T12:00:00`).toLocaleDateString('id-ID', {month: 'long', year: 'numeric'}) : '';
  return <View>
    <View style={styles.sectionHeader}><View><Text style={styles.sectionTitle}>Pilih Tanggal</Text><Text style={styles.sectionSubtitle}>{selectedDateText}</Text></View></View>
    <View style={styles.dateGrid}>
      {dates.map(date => {
        const active = selectedDate === date.value;
        return <Pressable key={date.value} onPress={() => onDateSelect(date.value)} style={[styles.dateTile, active && styles.dateTileActive]}>
          <Text style={[styles.dateDay, active && styles.dateDayActive]}>{date.day}</Text>
          <Text style={[styles.dateNumber, active && styles.dateNumberActive]}>{date.number}</Text>
          {date.label === 'Hari ini' && <Text style={styles.dateLabelActive}>{date.label}</Text>}
          {date.label !== 'Hari ini' && <View style={styles.dateIndicator} />}
        </Pressable>;
      })}
    </View>
    <View style={styles.sectionHeader}><View><Text style={styles.sectionTitle}>Pilih Jam Kedatangan</Text><Text style={styles.sectionSubtitle}>Waktu Indonesia Barat (WIB)</Text></View></View>
    {loading ? <Text style={styles.sectionSubtitle}>Memuat slot tersedia…</Text> : groupedSlots.length ? groupedSlots.map(group => <View key={group.label}>
      <Text style={styles.timeSessionLabel}>{group.label}</Text>
      <View style={group.style}>{group.items.map(slot => {
        const active = selectedTime === slot;
        const available = !loading && slots.includes(slot);
        return <Pressable key={slot} disabled={!available} onPress={() => onTimeSelect(slot)} style={[group.slotStyle, active && styles.timeSlotActive, !available && styles.timeSlotDisabled]}>
          <Text style={[styles.timeText, active && styles.timeTextActive, !available && styles.timeTextDisabled]}>{slot}</Text>
          <Text style={[styles.timeStatus, active && styles.timeStatusActive, !available && styles.timeStatusDisabled]}>{loading ? 'Memuat' : active ? 'Dipilih' : available ? 'Tersedia' : 'Penuh'}</Text>
        </Pressable>;
      })}</View>
    </View>) : <Text style={styles.sectionSubtitle}>Tidak ada slot tersedia pada tanggal ini.</Text>}
  </View>;
}
