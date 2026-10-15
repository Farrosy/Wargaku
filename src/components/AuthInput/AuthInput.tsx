import React from 'react';
import {Text, TextInput, TextInputProps, View} from 'react-native';
import {styles} from './style';

type Props = TextInputProps & {label: string};

export function AuthInput({label, ...props}: Props) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput placeholderTextColor="#9a9a96" style={styles.input} {...props} />
    </View>
  );
}
