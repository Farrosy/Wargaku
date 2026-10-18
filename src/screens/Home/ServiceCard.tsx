import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {Service} from '../../services/auth';
import {styles} from './style';

function formatRupiah(value: number) {
  const digits = String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `Rp ${digits}`;
}

// Fitur ekstra pada footer kartu digali dari nama layanan (API tidak menyediakan field ini).
function extraFeature(name: string) {
  const haystack = name.toLowerCase();
  if (haystack.includes('royal') || haystack.includes('ritual') || haystack.includes('massage')) {
    return 'Full Massage Included';
  }
  if (haystack.includes('beard') || haystack.includes('cukur') || haystack.includes('janggut')) {
    return 'Essential Oil Blend';
  }
  return 'Termasuk Head Wash';
}

type Props = {
  service: Service;
  featured: boolean;
  onPick: () => void;
};

// Kartu "Layanan Unggulan": data langsung dari GET /services.
export function ServiceCard({service, featured, onPick}: Props) {
  return (
    <View style={styles.serviceCard}>
      <View style={styles.serviceTop}>
        <View style={styles.serviceHeading}>
          <View style={styles.serviceMetaRow}>
            {featured ? (
              <View style={styles.favoriteBadge}>
                <Text style={styles.favoriteBadgeText}>Paling Favorit</Text>
              </View>
            ) : null}
            <Text style={styles.serviceDuration}>⏱ {service.duration_minutes} Menit</Text>
          </View>
          <Text style={styles.serviceName}>{service.name}</Text>
        </View>
        <Text style={styles.servicePrice}>{formatRupiah(service.price)}</Text>
      </View>

      {!!service.description && <Text style={styles.serviceDescription}>{service.description}</Text>}

      <View style={styles.serviceFooter}>
        <Text style={styles.serviceIncludes}>✓ {extraFeature(service.name)}</Text>
        <Pressable onPress={onPick} style={styles.pickButton} accessibilityRole="button">
          <Text style={styles.pickButtonText}>Pilih Layanan</Text>
        </Pressable>
      </View>
    </View>
  );
}
