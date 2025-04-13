import { View } from 'react-native';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
// import { styled } from 'nativewind'; // NativeWind for styling

const CrossIcon = () => {
  return (
    <View className="bg-gray-200 p-1 rounded-xl">
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        height={32}  // Equivalent to 'h-8'
        width={32}   // Equivalent to 'w-8'
      >
        <Path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </Svg>
    </View>
  );
};

export default CrossIcon;
