import React from 'react';
import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';

type Props = TextInputProps & {label: string};

export function AuthInput({label, ...props}: Props) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput placeholderTextColor="#9a9a96" style={styles.input} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  field: {marginBottom: 16},
  label: {color: '#383832', fontSize: 14, fontWeight: '600', marginBottom: 8},
  input: {backgroundColor: '#fff', borderColor: '#e4e4df', borderRadius: 12, borderWidth: 1, color: '#20201d', fontSize: 16, paddingHorizontal: 15, paddingVertical: 14},
});
