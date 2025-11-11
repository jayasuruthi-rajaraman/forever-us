import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
} from 'react-native-reanimated';

interface HeartLogoProps {
  size?: number;
  color?: string;
}

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export const HeartLogo: React.FC<HeartLogoProps> = ({
  size = 24,
  color = '#FF69B4',
}) => {
  const glowScale1 = useSharedValue(1);
  const glowOpacity1 = useSharedValue(0.6);
  const glowScale2 = useSharedValue(1);
  const glowOpacity2 = useSharedValue(0.4);
  const glowScale3 = useSharedValue(1);
  const glowOpacity3 = useSharedValue(0.2);
  const mainScale = useSharedValue(1);
  const pulse = useSharedValue(0);

  React.useEffect(() => {
    // Create layered pulsing glow effect with multiple layers
    glowScale1.value = withRepeat(
      withTiming(1.4, {
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );

    glowOpacity1.value = withRepeat(
      withTiming(0.5, {
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );

    glowScale2.value = withRepeat(
      withTiming(1.6, {
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );

    glowOpacity2.value = withRepeat(
      withTiming(0.3, {
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );

    glowScale3.value = withRepeat(
      withTiming(1.8, {
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );

    glowOpacity3.value = withRepeat(
      withTiming(0.2, {
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );

    mainScale.value = withRepeat(
      withTiming(1.05, {
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );

    pulse.value = withRepeat(
      withTiming(1, {
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, []);

  const glowStyle1 = useAnimatedStyle(() => {
    return {
      transform: [{ scale: glowScale1.value }],
      opacity: glowOpacity1.value,
    };
  });

  const glowStyle2 = useAnimatedStyle(() => {
    return {
      transform: [{ scale: glowScale2.value }],
      opacity: glowOpacity2.value,
    };
  });

  const glowStyle3 = useAnimatedStyle(() => {
    return {
      transform: [{ scale: glowScale3.value }],
      opacity: glowOpacity3.value,
    };
  });

  const mainStyle = useAnimatedStyle(() => {
    const shadowRadius = interpolate(pulse.value, [0, 1], [8, 16]);
    return {
      transform: [{ scale: mainScale.value }],
      shadowRadius,
    };
  });

  const heartPath = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

  return (
    <View style={{ width: size, height: size, position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
      {/* Outer glow layer 3 */}
      <AnimatedSvg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        style={[
          {
            position: 'absolute',
          },
          glowStyle3,
        ]}
      >
        <Path
          d={heartPath}
          fill={color}
          opacity={0.2}
        />
      </AnimatedSvg>
      
      {/* Outer glow layer 2 */}
      <AnimatedSvg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        style={[
          {
            position: 'absolute',
          },
          glowStyle2,
        ]}
      >
        <Path
          d={heartPath}
          fill={color}
          opacity={0.3}
        />
      </AnimatedSvg>
      
      {/* Inner glow layer 1 */}
      <AnimatedSvg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        style={[
          {
            position: 'absolute',
          },
          glowStyle1,
        ]}
      >
        <Path
          d={heartPath}
          fill={color}
          opacity={0.5}
        />
      </AnimatedSvg>

      {/* Main heart */}
      <AnimatedSvg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        style={mainStyle}
      >
        <Path
          d={heartPath}
          fill={color}
        />
      </AnimatedSvg>
    </View>
  );
};

