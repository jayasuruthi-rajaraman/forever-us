import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme';
import { Button } from '../components/Button';
import { HeartIcon } from '../components/HeartIcon';

interface OnboardingPage1ScreenProps {
  navigation: any;
}

export const OnboardingPage1Screen: React.FC<OnboardingPage1ScreenProps> = ({ navigation }) => {
  const theme = useTheme();

  const handleNext = () => {
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <HeartIcon size={80} color={theme.colors.accentPink} animated={true} />
        <Text style={[styles.title, { color: theme.colors.text }]}>Welcome to Forever Us</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Your journey to forever begins here.
        </Text>
      </View>
      <View style={styles.footer}>
        <Button title="Next" onPress={handleNext} variant="primary" />
      </View>
      <View style={styles.paginationContainer}>
        <View style={[styles.dot, styles.dotActive]} />
        <View style={[styles.dot, styles.dotInactive, styles.dotSpacing]} />
        <View style={[styles.dot, styles.dotInactive, styles.dotSpacing]} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginTop: 32,
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 26,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotSpacing: {
    marginLeft: 8,
  },
  dotActive: {
    backgroundColor: '#FF69B4',
  },
  dotInactive: {
    backgroundColor: '#FF69B450',
  },
});

