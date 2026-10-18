import React from 'react';
import {ImageBackground, Pressable, Text, View} from 'react-native';
import {styles} from './style';

const HERO_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBYRHwWPY-VY0fNTlzsfkE1HD8b0UJxzmjDDpjx1jBxehDSLYOB64uuNEvGK8H57h_PvHPw5RbFXY0JAQmamfcjBLuJN5RX3Wrj4_UK2tdA3C02nS_x8URxeNh9nH8Wvss7SPbXUR62n2KsYsao8m5TGbztKMgDRqMgc4-F0agTEyCG-slE5YxudaJJF4NdhhrD5Dw2Bwd8KS83A0cKMhM2ghi0v3rB-wXTvSJmTdxfhQlT-aO7zd9b';

type Props = {
  barberCount: number;
  onBooking: () => void;
};

// Banner hero dengan overlay gelap dan tombol "Booking Sekarang".
export function HeroBanner({barberCount, onBooking}: Props) {
  return (
    <View style={styles.heroCard}>
      <ImageBackground source={{uri: HERO_IMAGE}} style={styles.heroImage} resizeMode="cover" />
      <View style={styles.heroOverlay} />
      <View style={styles.heroOverlayBottom} />
      <View style={styles.heroContent}>
        <Text style={styles.heroEyebrow}>Edisi Eksklusif</Text>
        <Text style={styles.heroTitle}>Craftsmanship & Presisi Tanpa Kompromi</Text>
        <View style={styles.heroFooter}>
          <Text style={styles.heroMeta}>{barberCount} Master Barber Bertugas</Text>
          <Pressable onPress={onBooking} style={styles.heroButton} accessibilityRole="button">
            <Text style={styles.heroButtonText}>Booking Sekarang</Text>
            <Text style={styles.heroButtonArrow}>→</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
