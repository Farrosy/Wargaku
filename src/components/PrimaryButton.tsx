import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

export function PrimaryButton({title, onPress}: {title: string; onPress: () => void}) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {alignItems: 'center', backgroundColor: '#252522', borderRadius: 12, marginTop: 8, padding: 16},
  text: {color: '#fff', fontSize: 16, fontWeight: '700'},
});
