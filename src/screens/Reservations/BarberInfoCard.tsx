import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { styles } from './style';

export function BarberInfoCard() {
  return (
    <View>
      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>Pilih Master Barber</Text>
          <Text style={styles.sectionSubtitle}>Ditangani oleh praktisi tersertifikasi</Text>
        </View>
        <View style={styles.badgeCount}><Text style={styles.badgeCountText}>4 Tersedia</Text></View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {/* Barber 1 (Aktif) */}
        <View style={[styles.barberCard, styles.barberCardActive]}>
          <View style={styles.barberTop}>
            <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCAM9IolqolOYbvU8er4YQxYSf3kSJUgkaBH7xGJuWoX1DnRCjPkq3SNRELZmkvitVWigwOEOZjGQXM7UxCAvU7ChCw8-D6QRH7GEHa-aqaVW0FAkYmRrMya6km06beavKO4vGoI1cn3ara98CsONqNsmW-_T1mC64iHY64cHRgG-P6dI6MFMk8l9rpruAoXez0kssofCcxEbLgOmba5RPlkKyhDERcO5k90VaTs4vP4OK_YLOurVD' }} style={styles.barberImg} />
            <View>
              <Text style={styles.barberNameActive}>Eko Prasetyo</Text>
              <Text style={styles.barberRoleActive}>Master Barber</Text>
            </View>
          </View>
          <View style={styles.barberBottomActive}>
            <Text style={styles.barberBottomTextActive}>Kursi 1 • ⭐ 4.9</Text>
            <Text style={styles.barberBottomTextActive}>8 Thn Pengalaman</Text>
          </View>
        </View>

        {/* Barber 2 */}
        <View style={styles.barberCard}>
          <View style={styles.barberTop}>
            <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkO2A1MT_FoXb-qfipkRoZ12c3SV705zIG62t-4AuucLe42t_VbQ3-US07t6UHSUGII4fkoN496MsPXRZbWS9dpL66ydL7OQRBklPTcYmxWpn-ozhbBaC60sLJwttnyDzQuPdvhLHN1oxW1XURKBJGtsp1Wk7hGeMSta5wlaKC_5K3I1qBJdraT3Ge6kq60lmSCJ4Wb406E64a-vNZL1IgNtdgIIOkYpmU4DQRPhfbZPxt0qJT-coz' }} style={styles.barberImg} />
            <View>
              <Text style={styles.barberName}>Dimas Arya</Text>
              <Text style={styles.barberRole}>Senior Stylist</Text>
            </View>
          </View>
          <View style={styles.barberBottom}>
            <Text style={styles.barberBottomText}>Kursi 2 • ⭐ 4.8</Text>
            <Text style={styles.barberBottomText}>5 Thn Pengalaman</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}