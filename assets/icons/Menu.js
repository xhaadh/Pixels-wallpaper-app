import { View } from 'react-native';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Menu = () => {
  return (
    <View>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        height={32}  // Equivalent to 'h-8'
        width={32}   // Equivalent to 'w-8'
      >
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </Svg>
    </View>
  );
};

export default Menu;
