import { useColorScheme } from 'react-native';

export interface Theme {
  colors: {
    background: string;
    cardBackground: string;
    text: string;
    textSecondary: string;
    textTertiary: string;
    inputBackground: string;
    buttonPrimary: string;
    buttonSecondary: string;
    accentLight: string;
    accentPink: string;
    border: string;
    separator: string;
    tabActive: string;
    tabInactive: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  typography: {
    h1: { fontSize: number; fontWeight: string };
    h2: { fontSize: number; fontWeight: string };
    body: { fontSize: number; fontWeight: string };
    bodySmall: { fontSize: number; fontWeight: string };
    caption: { fontSize: number; fontWeight: string };
  };
}

const lightTheme: Theme = {
  colors: {
    background: '#F5F5F5',
    cardBackground: '#FFFFFF',
    text: '#1A1A2E',
    textSecondary: '#666666',
    textTertiary: '#999999',
    inputBackground: '#F0F0F0',
    buttonPrimary: '#8B5CF6',
    buttonSecondary: '#2C2C4A',
    accentLight: '#A78BFA',
    accentPink: '#FF69B4',
    border: '#E0E0E0',
    separator: '#CCCCCC',
    tabActive: '#8B5CF6',
    tabInactive: '#2C2C4A',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  typography: {
    h1: { fontSize: 32, fontWeight: '700' },
    h2: { fontSize: 24, fontWeight: '600' },
    body: { fontSize: 16, fontWeight: '400' },
    bodySmall: { fontSize: 14, fontWeight: '400' },
    caption: { fontSize: 12, fontWeight: '400' },
  },
};

const darkTheme: Theme = {
  colors: {
    background: '#0A0A14',
    cardBackground: '#1A1A2E',
    text: '#FFFFFF',
    textSecondary: '#B0B0B0',
    textTertiary: '#808080',
    inputBackground: '#12121E',
    buttonPrimary: '#FF69B4',
    buttonSecondary: '#1A1A2E',
    accentLight: '#8B5CF6',
    accentPink: '#FF69B4',
    border: '#2A2A3A',
    separator: '#2A2A3A',
    tabActive: '#FF69B4',
    tabInactive: 'transparent',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  typography: {
    h1: { fontSize: 32, fontWeight: '700' },
    h2: { fontSize: 24, fontWeight: '600' },
    body: { fontSize: 16, fontWeight: '400' },
    bodySmall: { fontSize: 14, fontWeight: '400' },
    caption: { fontSize: 12, fontWeight: '400' },
  },
};

export const useTheme = (): Theme => {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? darkTheme : lightTheme;
};

