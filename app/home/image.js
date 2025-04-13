import {
  ActivityIndicator,
  Alert,
  Button,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import { hp, wp } from "../../helpers/common";
import { Image } from "expo-image";
import { theme } from "../../constants/theme";
import { Entypo, Octicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as Sharing from 'expo-sharing';

const ImageScreen = () => {
  const router = useRouter();
  const item = useLocalSearchParams();
  const [status, setStatus] = useState("loading");
  let uri = item?.webformatURL;
  const fileName = item?.previewURL?.split("/").pop();
  const imageUrl = uri;
  const filePath = `${FileSystem.documentDirectory}${fileName}`;

  const getSize = () => {
    const aspectRatio = item?.imageWidth / item?.imageHeight;

    const maxWidth = Platform.OS == "web" ? wp(50) : wp(92);
    let calculatedHeight = maxWidth / aspectRatio;
    let calculatedWidth = maxWidth;
    if (aspectRatio < 1) {
      calculatedWidth = calculatedHeight * aspectRatio;
    }
    return {
      width: calculatedWidth,
      height: calculatedHeight,
    };
  };

  const onLoad = () => {
    setStatus("");
  };

  const handleDownloadImage = async () => {
    setStatus("downloading");
    let uri = await downloadFile();
    if(uri) console.log("downloaded at: ", uri);
  };

  const handleShareImage = async () => {
    setStatus("sharing");
    if (uri){
        await Sharing.shareAsync(uri);
    }
  };

  const downloadFile = async () => {
    try {
      const { uri } = await FileSystem.downloadAsync(imageUrl, filePath);
      setStatus("");
      console.log("downloaded at: ", uri);
      return uri;
    } catch (error) {
      console.log("got error", error.message);
      setStatus("");
      Alert.alert("image", error.message);
      return null;
    }
  };

  return (
    <BlurView style={styles.container} tint="dark" intensity={60}>
      <View style={[getSize()]}>
        <View style={styles.loading}>
          {status == "loading" && (
            <ActivityIndicator color="white" size="large" />
          )}
        </View>
        <Image
          transition={100}
          style={[styles.image, getSize()]}
          source={uri}
          onLoad={onLoad}
        />
      </View>
      <View style={styles.buttons}>
        <View>
          <Pressable onPress={() => router.back()} style={styles.button}>
            <Octicons name="x" size={24} color="white" />
          </Pressable>
        </View>
        <View>
          {status == "downloading" ? (
            <Pressable style={styles.button}>
              <ActivityIndicator color="white" size="small" />
            </Pressable>
          ) : (
            <Pressable onPress={handleDownloadImage} style={styles.button}>
              <Octicons name="download" size={24} color="white" />
            </Pressable>
          )}
        </View>
        <View>
        {status == "sharing" ? (
            <Pressable style={styles.button}>
              <ActivityIndicator color="white" size="small" />
            </Pressable>
          ) : (
            <Pressable onPress={handleShareImage} style={styles.button}>
            <Entypo name="share" size={22} color="white" />
          </Pressable>
          )}
          
        </View>
      </View>
    </BlurView>
  );
};

export default ImageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp(4),
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  image: {
    borderRadius: theme.radius.lg,
    borderWidth: 2,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderColor: "rgba(255,255,255,0.1)",
  },
  loading: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 50,
  },
  button: {
    height: hp(6),
    width: hp(6),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: theme.radius.lg,
    borderCurve: "continuous",
  },
});
