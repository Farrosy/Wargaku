import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './style';

export function DateTimeSelector() {
  return (
    <View>
      {/* --- BAGIAN TANGGAL --- */}
      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>Pilih Tanggal</Text>
          <Text style={styles.sectionSubtitle}>Oktober 2024</Text>
        </View>
      </View>

      <View style={styles.dateGrid}>
        {/* Hari Ini (Aktif) */}
        <View style={[styles.dateTile, styles.dateTileActive]}>
          <Text style={[styles.dateDay, styles.dateDayActive]}>SEN</Text>
          <Text style={[styles.dateNumber, styles.dateNumberActive]}>24</Text>
          <Text style={styles.dateLabelActive}>Hari Ini</Text>
        </View>
        {/* Tanggal Lain */}
        {[
          { day: 'SEL', date: '25', dot: true },
          { day: 'RAB', date: '26', dot: true },
          { day: 'KAM', date: '27', dot: false },
          { day: 'JUM', date: '28', dot: true },
          { day: 'SAB', date: '29', dot: true },
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.dateTile}>
            <Text style={styles.dateDay}>{item.day}</Text>
            <Text style={styles.dateNumber}>{item.date}</Text>
            {item.dot && <View style={styles.dateIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* --- BAGIAN JAM KEDATANGAN --- */}
      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>Pilih Jam Kedatangan</Text>
          <Text style={styles.sectionSubtitle}>Waktu Indonesia Barat (WIB)</Text>
        </View>
      </View>

      {/* Sesi Pagi */}
      <Text style={styles.timeSessionLabel}>SESI PAGI</Text>
      <View style={styles.timeGrid3}>
        <View style={[styles.timeSlot3, styles.timeSlotDisabled]}>
          <Text style={[styles.timeText, styles.timeTextDisabled]}>10:00</Text>
          <Text style={[styles.timeStatus, styles.timeStatusDisabled]}>Penuh</Text>
        </View>
        <View style={[styles.timeSlot3, styles.timeSlotActive]}>
          <Text style={[styles.timeText, styles.timeTextActive]}>10:45</Text>
          <Text style={[styles.timeStatus, styles.timeStatusActive]}>Dipilih</Text>
        </View>
        <TouchableOpacity style={styles.timeSlot3}>
          <Text style={styles.timeText}>11:30</Text>
          <Text style={styles.timeStatus}>Tersedia</Text>
        </TouchableOpacity>
      </View>

      {/* Sesi Siang & Sore */}
      <Text style={styles.timeSessionLabel}>SESI SIANG & SORE</Text>
      <View style={styles.timeGrid4}>
        <TouchableOpacity style={styles.timeSlot4}>
          <Text style={styles.timeText}>13:00</Text>
          <Text style={styles.timeStatus}>Ada</Text>
        </TouchableOpacity>
        <View style={[styles.timeSlot4, styles.timeSlotDisabled]}>
          <Text style={[styles.timeText, styles.timeTextDisabled]}>14:00</Text>
          <Text style={[styles.timeStatus, styles.timeStatusDisabled]}>Penuh</Text>
        </View>
        <TouchableOpacity style={styles.timeSlot4}>
          <Text style={styles.timeText}>15:30</Text>
          <Text style={styles.timeStatus}>Ada</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.timeSlot4}>
          <Text style={styles.timeText}>16:30</Text>
          <Text style={styles.timeStatus}>Ada</Text>
        </TouchableOpacity>
      </View>

      {/* Sesi Malam */}
      <Text style={styles.timeSessionLabel}>SESI MALAM</Text>
      <View style={styles.timeGrid3}>
        <TouchableOpacity style={styles.timeSlot3}>
          <Text style={styles.timeText}>18:30</Text>
          <Text style={styles.timeStatus}>Tersedia</Text>
        </TouchableOpacity>
        <View style={[styles.timeSlot3, styles.timeSlotDisabled]}>
          <Text style={[styles.timeText, styles.timeTextDisabled]}>19:30</Text>
          <Text style={[styles.timeStatus, styles.timeStatusDisabled]}>Penuh</Text>
        </View>
      </View>
    </View>
  );
}