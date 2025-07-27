import { Text, type TextProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { CustomColors } from '@/constants/ColorScheme';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'defaultSemiBold' | 'headerTitle' | 'title' | 'subtitle' | 'link' | 'description' | 'buttonText' | 'small'  | 'smallSemiBold' | 'label';
};

export function ThemedText({ style, type = 'default', ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ colorProps: 'text' });
  const textType = () => {
    switch(type) {
      case 'headerTitle':
        return styles.headerTitle
      case 'title':
        return styles.title
      case 'subtitle':
        return styles.subtitle
      case 'link': 
        return styles.link
      case 'description':
        return styles.description
      case 'buttonText':
        return styles.buttonText
      case 'small': 
        return styles.small
      case 'smallSemiBold': 
        return styles.smallSemiBold
      case 'label':
        return styles.label
      case 'defaultSemiBold':
        return styles.defaultSemiBold
      default:
        return styles.default
    }
  }

  return (
    <Text
      style={[
        { color },
         style,
        textType(),
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontFamily: 'popins-regular',
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontFamily: 'popins-semibold',
    fontSize: 16,
    lineHeight: 24,
  },
  headerTitle: {
    fontSize: 19, 
    fontFamily: 'popins-semibold'
  },
  title: {
    fontFamily: 'popins-bold',
    fontSize: 32,
    lineHeight: 32,
  },
  subtitle: {
    fontFamily: 'popins-bold',
    fontSize: 20,
  },
  link: {
    // lineHeight: 30,
    fontSize: 16,
    color: CustomColors.primary,
  },
  description: {
    fontFamily: 'popins-medium',
    fontSize: 16,
  },
  buttonText: {
    height: 24,
    fontFamily: 'popins-regular',
    fontSize: 16,
    textAlign: 'center',
  },
  small: {
    fontFamily: 'popins-regular',
    fontSize: 14,
  },
  smallSemiBold: {
    fontFamily: 'popins-semibold',
    fontSize: 14,
  },
  label: {
    marginBottom: 2,
    fontSize: 16, 
    fontFamily: 'popins-semibold',
  }
});
