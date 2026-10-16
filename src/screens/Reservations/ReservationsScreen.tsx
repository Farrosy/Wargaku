import React from 'react';
import { View, Text, ImageBackground, ScrollView } from 'react-native';
import { styles } from './style';
import { CostSummaryCard } from './CostSummaryCard';
import { BarberInfoCard } from './BarberInfoCard';
import { DateTimeSelector } from './DateTimeSelector';
import { AdditionalInfo } from './AdditionalInfo';

export function ReservationsScreen() {
  return (
    <View style={styles.page}>
      
      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Progress Header */}
        <View style={styles.headerRow}>
          <Text style={styles.stepText}>LANGKAH 1 DARI 2</Text>
          <Text style={styles.stepTitle}>Jadwal & Kapster</Text>
        </View>
        <View style={styles.progressBarBg}>
          <View style={styles.progressBarFill} />
        </View>

        {/* Gambar Barber */}
        <ImageBackground 
          source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBD8eT2wEaRq6kUJe6bS5mGmONeBd-3ruDmZqCFyT8RYvklqFvLCOruVxLhgbsQNJqhmJ0GDgesymjVEksGWMGE4H05LaFaO9dFqULuV30-oPjYBIVqLpWoo3JX5XskNZ-mxnP_zrMCcQuorI8pAOvflCKdbqKCnKLhgzAYAd6Z0O1-yodpkqw3S1naCdhzKWu_hmDj-7WY5xm6STWRqYF6yfy6QzKELBuiWx6ve04S0dtvDESlw6SA' }} 
          style={styles.atmosphereCard}
          imageStyle={styles.roundedImage}
        >
          <View style={styles.atmosphereOverlay}>
            <Text style={styles.atmosphereText}>✓ Studio Flagship Kebayoran Baru</Text>
          </View>
        </ImageBackground>

        {/* Info Layanan */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>LAYANAN TERPILIH</Text>
          <View style={styles.serviceRow}>
            <View style={styles.flexOne}>
              <Text style={styles.serviceTitle}>The Executive Cut</Text>
              <Text style={styles.serviceSub}>45 Menit • Bespoke Hairwash & Styling</Text>
            </View>
            <Text style={styles.servicePrice}>Rp 180.000</Text>
          </View>
        </View>

        {/* Bagian Pilih Kapster */}
        <BarberInfoCard />

        {/* Bagian Tanggal & Jam */}
        <DateTimeSelector />

        {/* Bagian Catatan & Garansi */}
        <AdditionalInfo />

      </ScrollView>

      {/* Ringkasan Pembayaran (Nempel di bawah) */}
      <CostSummaryCard />
      
    </View>
  );
}