import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

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

const styles = StyleSheet.create({
  bar: {
    backgroundColor: '#ffffff',
    borderTopColor: '#e7e4df',
    borderTopWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 12,
  },
  tab: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    minHeight: 48,
  },
  icon: {
    color: '#88847e',
    fontSize: 21,
    height: 25,
  },
  label: {
    color: '#77736d',
    fontSize: 11,
    fontWeight: '500',
  },
  active: {
    color: '#8b6b43',
    fontWeight: '700',
  },
});
