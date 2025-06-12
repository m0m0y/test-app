import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps;

export function ThemedView({ style, ...otherProps }: ThemedViewProps) {
  // const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  
  const backgroundColor = useThemeColor({ colorProps: 'background' });

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
