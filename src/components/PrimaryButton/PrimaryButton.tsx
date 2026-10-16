import React from 'react';
import {Pressable, Text} from 'react-native';
import {styles} from './style';

export function PrimaryButton({title, onPress, disabled}: {title: string; onPress: () => void; disabled?: boolean}) {
  return (
    <Pressable accessibilityRole="button" disabled={disabled} onPress={onPress} style={[styles.button, disabled && {opacity: 0.6}]}>
      <Text style={styles.text}>{disabled ? 'Memproses…' : title}</Text>
    </Pressable>
  );
}
