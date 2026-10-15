import React from 'react';
import {Pressable, Text} from 'react-native';
import {styles} from './style';

export function PrimaryButton({title, onPress}: {title: string; onPress: () => void}) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}
