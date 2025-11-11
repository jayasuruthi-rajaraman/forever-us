import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme';
import { Button } from '../components/Button';
import { HeartLogo } from '../components/HeartLogo';
import { HeartProgress } from '../components/HeartProgress';
import { GradientBackground } from '../components/GradientBackground';

interface OnboardingScreenProps {
  navigation: any;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const theme = useTheme();

  const handleGetStarted = () => {
    navigation.replace('Auth');
  };

  return (
    <GradientBackground>
      <SafeAreaView style={[styles.container, { backgroundColor: 'transparent' }]}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <HeartLogo size={80} />
            <Text style={[styles.title, { color: theme.colors.text }]}>Welcome to Forever Us</Text>
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
              Your journey to forever begins here.
            </Text>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <HeartProgress currentStep={1} totalSteps={3} />
          <View style={styles.buttonContainer}>
            <Button title="Get Started" onPress={handleGetStarted} variant="primary" />
          </View>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingTop: 60,
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
    paddingTop: 20,
  },
  buttonContainer: {
    marginTop: 24,
  },
});

