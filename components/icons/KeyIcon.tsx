import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

interface KeyIconProps {
  size?: number;
  color?: string;
}

export const KeyIcon: React.FC<KeyIconProps> = ({
  size = 24,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 2L19 4M7 10L2 15V19H6L11 14M7 10L13 16L21 8L15 2L7 10Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="17" cy="7" r="1" fill={color} />
    </Svg>
  );
};

