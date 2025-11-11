import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme';

interface GradientBackgroundProps {
  children: React.ReactNode;
  colors?: string[];
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
  colors,
}) => {
  const theme = useTheme();

  const defaultColors = colors || [
    theme.colors.background,
    theme.colors.cardBackground,
    theme.colors.background,
  ];

  return (
    <LinearGradient
      colors={defaultColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>{children}</View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

