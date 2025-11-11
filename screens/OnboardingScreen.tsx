import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme';
import { Button } from '../components/Button';
import { HeartIcon } from '../components/HeartIcon';

interface OnboardingScreenProps {
  navigation: any;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const theme = useTheme();

  const handleGetStarted = () => {
    navigation.replace('NextPage');
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
        <Button title="Get Started" onPress={handleGetStarted} variant="primary" />
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
});

