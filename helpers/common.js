import { Dimensions } from "react-native";

const { width: deviceWidth } = Dimensions.get("window");
const { height: deviceHeight } = Dimensions.get("window");

export const wp = (percentage) => {
  const value = (percentage * Dimensions.get("window").width) / 100;
  return Math.round(value);
};
export const hp = (percentage) => {
  const value = (percentage * Dimensions.get("window").height) / 100;
  return Math.round(value);
};

export const getColumnCount = () => {
  if (deviceWidth >= 1024) {
    // desktop
    return 4;
  } else if (deviceWidth >= 768) {
    // tablet
    return 3;
  } else {
    // phone
    return 2;
  }
};

export const getImageSize = (width, height) => {
    if(width>height){
        return 250;
    } else if(width<height){
        return 300;
    } else{
        return 200;
    }
}
