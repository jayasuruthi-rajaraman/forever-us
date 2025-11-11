import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../theme';

interface HeartProgressProps {
  currentStep: number;
  totalSteps: number;
  size?: number;
}

export const HeartProgress: React.FC<HeartProgressProps> = ({
  currentStep,
  totalSteps,
  size = 24,
}) => {
  const theme = useTheme();

  const heartPath = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber <= currentStep;

        return (
          <View key={index} style={styles.heartContainer}>
            <Svg width={size} height={size} viewBox="0 0 24 24">
              <Path
                d={heartPath}
                fill={theme.colors.accentPink}
                opacity={isActive ? 1 : 0.3}
                fillRule="evenodd"
              />
            </Svg>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
});

