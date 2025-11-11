import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

interface QRIconProps {
  size?: number;
  color?: string;
}

export const QRIcon: React.FC<QRIconProps> = ({
  size = 24,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="3" width="5" height="5" stroke={color} strokeWidth="2" fill="none" />
      <Rect x="16" y="3" width="5" height="5" stroke={color} strokeWidth="2" fill="none" />
      <Rect x="3" y="16" width="5" height="5" stroke={color} strokeWidth="2" fill="none" />
      <Path
        d="M5 5H7M5 7H7M18 5H20M18 7H20M5 18H7M5 20H7"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Rect x="16" y="16" width="3" height="3" fill={color} />
      <Rect x="20" y="20" width="1" height="1" fill={color} />
    </Svg>
  );
};

