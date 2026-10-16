import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { styles } from './style';

export function AdditionalInfo() {
  return (
    <View>
      {/* Catatan Khusus */}
      <View style={styles.notesContainer}>
        <Text style={styles.notesLabel}>Catatan Khusus (Opsional)</Text>
        <Text style={styles.notesSub}>Beri tahu kapster preferensi potongan rambut, tekstur, atau sensitivitas kulit Anda.</Text>
        
        <TextInput 
          style={styles.notesInput}
          placeholder="Misal: permintaan khusus pangkas fade tipis, hindari pomade wangi menyengat..."
          placeholderTextColor="#85847c"
          multiline={true}
          numberOfLines={3}
        />
        
        <View style={styles.notesFooter}>
          <Text style={styles.notesFooterText}>🌿 Konsultasi gratis saat kedatangan</Text>
          <Text style={styles.notesCharCount}>Maks 150 kar</Text>
        </View>
      </View>

      {/* Garansi Waktu */}
      <View style={styles.guaranteeCard}>
        <Text>🛡️</Text>
        <View style={styles.flexOne}>
          <Text style={styles.guaranteeTitle}>Garansi Waktu Tepat</Text>
          <Text style={styles.guaranteeDesc}>Kursi Anda dipersiapkan tepat 5 menit sebelum jadwal. Pembatalan tanpa biaya hingga 2 jam sebelumnya.</Text>
        </View>
      </View>
    </View>
  );
}