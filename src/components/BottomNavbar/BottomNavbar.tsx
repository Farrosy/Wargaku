import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {styles} from './style';

export type PageName = 'Beranda' | 'Reservasi' | 'Tiket Saya' | 'Profil';

const pages: {name: PageName; icon: string}[] = [
  {name: 'Beranda', icon: '⌂'},
  {name: 'Reservasi', icon: '+'},
  {name: 'Tiket Saya', icon: '▤'},
  {name: 'Profil', icon: '●'},
];

type Props = {
  activePage: PageName;
  onPageChange: (page: PageName) => void;
};

export function BottomNavbar({activePage, onPageChange}: Props) {
  return (
    <View style={styles.bar}>
      {pages.map(page => {
        const isActive = activePage === page.name;

        return (
          <Pressable
            key={page.name}
            onPress={() => onPageChange(page.name)}
            accessibilityRole="button"
            accessibilityState={{selected: isActive}}
            style={styles.tab}>
            <Text style={[styles.icon, isActive && styles.active]}>{page.icon}</Text>
            <Text style={[styles.label, isActive && styles.active]}>{page.name}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
