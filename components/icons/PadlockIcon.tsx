import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface PadlockIconProps {
  size?: number;
  color?: string;
}

export const PadlockIcon: React.FC<PadlockIconProps> = ({
  size = 24,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 11H6C4.9 11 4 11.9 4 13V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V13C20 11.9 19.1 11 18 11Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7 11V7C7 4.24 9.24 2 12 2C14.76 2 17 4.24 17 7V11"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

