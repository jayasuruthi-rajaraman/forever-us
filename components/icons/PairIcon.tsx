import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

interface PairIconProps {
  size?: number;
  color?: string;
}

export const PairIcon: React.FC<PairIconProps> = ({
  size = 24,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="6" cy="12" r="3" stroke={color} strokeWidth="2" fill="none" />
      <Circle cx="18" cy="12" r="3" stroke={color} strokeWidth="2" fill="none" />
      <Path
        d="M9 12H15"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

