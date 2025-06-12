/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface ColorsProps {
  text: string;
  background: string;
  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
  borderColor: string;
}

type ColorKey = keyof ColorsProps; // Get the key of ColorsProps interface: 'text' | 'background' | 'tint' | ....

interface SetThemeProps { 
  light?: string,
  dark?: string,
  colorProps: ColorKey;
}

export function useThemeColor({ light, dark, colorProps }: SetThemeProps) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = theme === 'dark' ? dark : light;

  if (colorFromProps) {
    return colorFromProps;
  }

  return Colors[theme][colorProps];
}

// export function useThemeColor( props: { light?: string; dark?: string }, colorName: keyof typeof Colors.light & keyof typeof Colors.dark
// ) {
//   const theme = useColorScheme() ?? 'light';
//   const colorFromProps = props[theme];

//   if (colorFromProps) {
//     return colorFromProps;
//   } else {
//     return Colors[theme][colorName];
//   }
// }
