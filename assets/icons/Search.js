import { View } from 'react-native';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
// import { styled } from 'nativewind'; // NativeWind for styling

const SearchIcon = () => {
  return (
    <View className="p-1 rounded-xl">
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
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </Svg>
    </View>
  );
};

export default SearchIcon;
