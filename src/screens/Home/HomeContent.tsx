import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, Pressable, ScrollView, Text, View} from 'react-native';
import {AuthUser, Barber, getBarbers, getServices, Service} from '../../services/auth';
import {CategoryChips} from './CategoryChips';
import {HeroBanner} from './HeroBanner';
import {QueueStatusCard} from './QueueStatusCard';
import {ServiceCard} from './ServiceCard';
import {styles} from './style';

// Kategori layanan tidak tersedia di API, diturunkan dari nama layanan (lalu deskripsi).
const CATEGORY_KEYWORDS: {label: string; keywords: string[]}[] = [
  {label: 'Signature Haircut', keywords: ['haircut', 'cut', 'potong', 'pangkas']},
  {label: 'Beard Trim & Shave', keywords: ['beard', 'janggut', 'cukur', 'shave', 'towel']},
  {label: 'Scalp & Treatment', keywords: ['scalp', 'massage', 'pijat', 'treatment', 'ritual', 'wash']},
  {label: 'Kids Grooming', keywords: ['kids', 'anak']},
];

function categorize(service: Service) {
  const name = service.name.toLowerCase();
  const description = (service.description ?? '').toLowerCase();
  for (const {label, keywords} of CATEGORY_KEYWORDS) {
    if (keywords.some(keyword => name.includes(keyword))) { return label; }
  }
  for (const {label, keywords} of CATEGORY_KEYWORDS) {
    if (keywords.some(keyword => description.includes(keyword))) { return label; }
  }
  return 'Layanan Lain';
}

function greeting(date: Date) {
  const hour = date.getHours();
  if (hour < 11) { return 'Selamat Pagi'; }
  if (hour < 15) { return 'Selamat Siang'; }
  if (hour < 19) { return 'Selamat Sore'; }
  return 'Selamat Malam';
}

type Props = {
  user: AuthUser;
  onNavigate: (page: 'Reservasi') => void;
};

// Konten tab "Beranda": data layanan & barber diambil langsung dari backend.
export function HomeContent({user, onNavigate}: Props) {
  const [services, setServices] = useState<Service[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('Semua');

  const load = React.useCallback(() => {
    setLoading(true);
    setError('');
    Promise.all([getServices(), getBarbers()])
      .then(([serviceList, barberList]) => {
        setServices(serviceList);
        setBarbers(barberList);
      })
      .catch(err => setError(err instanceof Error ? err.message : 'Gagal memuat data beranda.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const categories = useMemo(() => {
    const labels: string[] = [];
    for (const service of services) {
      const label = categorize(service);
      if (!labels.includes(label)) { labels.push(label); }
    }
    return ['Semua', ...labels];
  }, [services]);

  const filteredServices = useMemo(() => (
    category === 'Semua' ? services : services.filter(item => categorize(item) === category)
  ), [services, category]);

  const goReserve = React.useCallback(() => onNavigate('Reservasi'), [onNavigate]);
  const firstName = user.name.trim().split(' ')[0] || 'Tamu';

  return (
    <ScrollView
      style={styles.scrollArea}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.greetingSection}>
        <View style={styles.eyebrowRow}>
          <View style={styles.eyebrowDot} />
          <Text style={styles.eyebrowText}>Atelier Flagship • SCBD</Text>
        </View>
        <Text style={styles.greetingTitle}>{greeting(new Date())}, {firstName}</Text>
        <Text style={styles.greetingSubtitle}>Temukan ritual grooming terbaik hari ini.</Text>
      </View>

      {error ? (
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable onPress={load} style={styles.retryButton} accessibilityRole="button">
            <Text style={styles.retryButtonText}>Coba Lagi</Text>
          </Pressable>
        </View>
      ) : loading ? (
        <ActivityIndicator color="#7b5821" style={styles.loadingSpinner} />
      ) : (
        <>
          <HeroBanner barberCount={barbers.length} />

          <QueueStatusCard barbers={barbers} />

          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Kategori Layanan</Text>
            <Text style={styles.sectionMeta}>{categories.length - 1} Kategori</Text>
          </View>
          {services.length > 0 && (
            <CategoryChips categories={categories} selected={category} onSelect={setCategory} />
          )}

          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Layanan Unggulan</Text>
            <Text style={styles.sectionMetaLight}>Ritual Otentik</Text>
          </View>
          {filteredServices.length === 0 ? (
            <Text style={styles.queueEmpty}>Tidak ada layanan pada kategori ini.</Text>
          ) : (
            filteredServices.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                featured={index === 0 && category === 'Semua'}
                onPick={goReserve}
              />
            ))
          )}

          <View style={styles.hygieneCard}>
            <View style={styles.hygieneHead}>
              <Text style={styles.hygieneIcon}>✓</Text>
              <Text style={styles.hygieneTitle}>Standar Kebersihan Barber One</Text>
            </View>
            <Text style={styles.hygieneDesc}>
              Setiap bilah razor selalu diganti baru untuk setiap tamu, dan seluruh peralatan baja
              melewati sterilisasi sinar UV tingkat medis sebelum digunakan.
            </Text>
          </View>
        </>
      )}
    </ScrollView>
  );
}
