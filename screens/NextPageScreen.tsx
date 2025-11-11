import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface NextPageScreenProps {
  navigation: any;
}

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export const NextPageScreen: React.FC<NextPageScreenProps> = ({ navigation }) => {
  const glowScale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.6);

  useEffect(() => {
    // Create a pulsing glow effect
    glowScale.value = withRepeat(
      withTiming(1.3, {
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );

    glowOpacity.value = withRepeat(
      withTiming(0.8, {
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );

    // Auto navigate to Features after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace('Features');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  const glowStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: glowScale.value }],
      opacity: glowOpacity.value,
    };
  });

  const heartPath = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.heartContainer}>
          {/* Glow layer */}
          <AnimatedSvg
            width={80}
            height={80}
            viewBox="0 0 24 24"
            style={[styles.glowLayer, glowStyle]}
          >
            <Path
              d={heartPath}
              fill="#FF69B4"
              opacity={0.4}
            />
          </AnimatedSvg>
          {/* Main outline heart */}
          <Svg
            width={80}
            height={80}
            viewBox="0 0 24 24"
            style={styles.heartMain}
          >
            <Path
              d={heartPath}
              fill="none"
              stroke="#FF69B4"
              strokeWidth="1.5"
            />
          </Svg>
        </View>
        <Text style={styles.title}>Forever Us</Text>
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
    backgroundColor: '#0A0A14',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 120,
  },
  heartContainer: {
    width: 80,
    height: 80,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowLayer: {
    position: 'absolute',
  },
  heartMain: {
    position: 'absolute',
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 32,
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
    backgroundColor: '#FF69B450', // Pink with reduced opacity
  },
});

