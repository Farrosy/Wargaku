import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './style';

// Header tetap di atas: monogram brand + action notifikasi & avatar user.
export function HomeHeader({name}: {name: string}) {
  const initial = name.trim().charAt(0).toUpperCase() || 'B';

  return (
    <View style={styles.header}>
      <View style={styles.logoRow}>
        <View style={styles.logoBadge}><Text style={styles.logoText}>1</Text></View>
        <Text style={styles.logoWordmark}>Barber One</Text>
      </View>
      <View style={styles.headerActions}>
        <Text style={styles.headerBell}>🔔</Text>
        <View style={styles.avatar}><Text style={styles.avatarText}>{initial}</Text></View>
      </View>
    </View>
  );
}
