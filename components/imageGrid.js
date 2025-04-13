import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MasonryFlashList } from "@shopify/flash-list";
import ImageCard from "./imagCard";
import { wp } from "../helpers/common";
import { getColumnCount } from "../helpers/common";

const imageGrid = ({images, router}) => {
    const columns = getColumnCount();
  return (
    <View style={styles.container}>
      <MasonryFlashList
        data={images}
        numColumns={columns}
        initialNumToRender={1000}
        contentContainerStyle={styles.listContainerStyles}
        renderItem={({ item, index }) => <ImageCard router={router} item={item} index={index} columns={columns} />}
        estimatedItemSize={200}
      />
    </View>
  );
};

export default imageGrid;

const styles = StyleSheet.create({
    container: {
        minHeight: 3,
        width: wp(100),
    },
    listContainerStyles: {
        paddingHorizontal: wp(4),
    },
    
});
