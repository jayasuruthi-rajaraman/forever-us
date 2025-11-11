import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  loading?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
}) => {
  const theme = useTheme();

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        style={[styles.button, disabled && styles.disabled]}
      >
        <LinearGradient
          colors={[theme.colors.buttonPrimary, theme.colors.accentLight]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradient}
          pointerEvents="none"
        >
          {loading ? (
            <ActivityIndicator color={theme.colors.text} />
          ) : (
            <Text style={[styles.buttonText, { color: theme.colors.text }]}>{title}</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.button,
        styles.secondaryButton,
        { backgroundColor: theme.colors.buttonSecondary },
        disabled && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.text} />
      ) : (
        <Text style={[styles.buttonText, { color: theme.colors.text }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    overflow: 'hidden',
    minHeight: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButton: {
    paddingVertical: 16,
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
});

