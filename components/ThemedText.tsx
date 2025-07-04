import { Text, type TextProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { CustomColors } from '@/constants/ColorScheme';

export type ThemedTextProps = TextProps & {
  // type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  type?: 'default' | 'defaultSemiBold' | 'title' | 'subtitle' | 'link' | 'description' | 'buttonText' | 'small' | 'label';
};

export function ThemedText({ style, type = 'default', ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ colorProps: 'text' });
  const textType = () => {
    switch(type) {
      case 'title':
        return styles.title
      case 'subtitle':
        return styles.subtitle
      case 'link': 
        return styles.link
      case 'description':
        return styles.description
      case 'defaultSemiBold':
        return styles.defaultSemiBold
      case 'buttonText':
        return styles.buttonText
      case 'small': 
        return styles.small
      case 'label':
        return styles.label
      default:
        return styles.default
    }
  }

  return (
    <Text
      style={[
        { color },
        textType(),
        style,
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
  label: {
    marginBottom: 4,
    fontSize: 17, 
    fontFamily: 'popins-semibold',
  }

  // default: {
  //   fontSize: 16,
  //   lineHeight: 24,
  // },
  // defaultSemiBold: {
  //   fontSize: 16,
  //   lineHeight: 24,
  //   fontWeight: '600',
  // },
  // title: {
  //   fontSize: 32,
  //   fontWeight: 'bold',
  //   lineHeight: 32,
  // },
  // subtitle: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  // },
  // link: {
  //   lineHeight: 30,
  //   fontSize: 16,
  //   color: '#0a7ea4',
  // },
});
