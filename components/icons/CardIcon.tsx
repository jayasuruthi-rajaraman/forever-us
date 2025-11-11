import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

interface CardIconProps {
  size?: number;
  color?: string;
}

export const CardIcon: React.FC<CardIconProps> = ({
  size = 24,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      <Path
        d="M3 10H21"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Rect x="6" y="13" width="4" height="2" rx="1" fill={color} />
    </Svg>
  );
};

