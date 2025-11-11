import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { useTheme } from '../theme';
import { HeartIcon } from '../components/HeartIcon';

interface SplashScreenProps {
  navigation: any;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    // Animate in
    opacity.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.cubic),
    });
    scale.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.cubic),
    });

    // Navigate after delay
    const timer = setTimeout(() => {
      navigation.replace('OnboardingPage1');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Animated.View style={[styles.content, animatedStyle]}>
        <HeartIcon size={80} color={theme.colors.accentPink} animated={true} />
        <Text style={[styles.title, { color: theme.colors.text }]}>Forever Us</Text>
      </Animated.View>
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
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginTop: 24,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
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

