import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface FingerprintIconProps {
  size?: number;
  color?: string;
}

export const FingerprintIcon: React.FC<FingerprintIconProps> = ({
  size = 24,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 10C12 10 12 8 12 7C12 5.9 12.9 5 14 5C15.1 5 16 5.9 16 7C16 8 16 10 16 10"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 10V14C12 15.1 12.9 16 14 16C15.1 16 16 15.1 16 14V10"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 10C8 8.9 7.1 8 6 8C4.9 8 4 8.9 4 10V14C4 15.1 4.9 16 6 16C7.1 16 8 15.1 8 14V10Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20 10C20 8.9 19.1 8 18 8C16.9 8 16 8.9 16 10V14C16 15.1 16.9 16 18 16C19.1 16 20 15.1 20 14V10Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 18V20C12 21.1 12.9 22 14 22C15.1 22 16 21.1 16 20V18"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 18V20C8 21.1 7.1 22 6 22C4.9 22 4 21.1 4 20V18"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

