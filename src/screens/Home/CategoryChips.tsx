import React from 'react';
import {Pressable, ScrollView, Text} from 'react-native';
import {styles} from './style';

type Props = {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
};

// Chips kategori layanan, digulir horizontal. Ketegori diturunkan dari data backend.
export function CategoryChips({categories, selected, onSelect}: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.chipsScroll}
      contentContainerStyle={styles.chipsRow}
    >
      {categories.map(category => {
        const active = category === selected;

        return (
          <Pressable
            key={category}
            onPress={() => onSelect(category)}
            accessibilityRole="button"
            accessibilityState={{selected: active}}
            style={[styles.chip, active && styles.chipActive]}
          >
            <Text style={[styles.chipText, active && styles.chipTextActive]}>{category}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
