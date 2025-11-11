import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
  Easing,
} from 'react-native-reanimated';

interface HeartIconProps {
  size?: number;
  color?: string;
  animated?: boolean;
}

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export const HeartIcon: React.FC<HeartIconProps> = ({
  size = 24,
  color = '#FF69B4',
  animated = true,
}) => {
  const glowScale1 = useSharedValue(1);
  const glowOpacity1 = useSharedValue(0.6);
  const glowScale2 = useSharedValue(1);
  const glowOpacity2 = useSharedValue(0.4);
  const mainScale = useSharedValue(1);

  React.useEffect(() => {
    if (animated) {
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

      mainScale.value = withRepeat(
        withTiming(1.05, {
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true
      );
    }
  }, [animated]);

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

  const mainStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: mainScale.value }],
      opacity: 1,
    };
  });

  const heartPath = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

  return (
    <View style={{ width: size, height: size, position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
      {/* Outer glow layer */}
      {animated && (
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
      )}
      
      {/* Inner glow layer */}
      {animated && (
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
      )}

      {/* Main heart */}
      <AnimatedSvg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        style={mainStyle}
      >
        {animated ? (
          <Path
            d={heartPath}
            fill={color}
          />
        ) : (
          <Path
            d={heartPath}
            fill="none"
            stroke={color}
            strokeWidth="1.5"
          />
        )}
      </AnimatedSvg>
    </View>
  );
};

