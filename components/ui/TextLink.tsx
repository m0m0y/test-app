import React from 'react';
import { StyleSheet, Text, TouchableOpacity, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface LinkProps {
  text: string,
  textStyle?: StyleProp<TextStyle>,
  style?: StyleProp<ViewStyle>,
  onPress?: () => void,
}

export default function TextLink({ text, textStyle, style, onPress }: LinkProps) {
  return (
    <TouchableOpacity onPress={onPress} delayPressIn={20} style={style}>
      <ThemedText type='link' style={textStyle}>
        {text}
      </ThemedText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({})