import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { theme } from "../../constants/theme";
import { wp, hp } from "../../helpers/common";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Categories from "../../components/categories";
import ImageGrid from "../../components/imageGrid";
import { apiCall } from "../../api";
import { debounce } from "lodash";
import { useRouter } from "expo-router";

const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  const [search, setSearch] = useState("");
  const searchInputRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [images, setImages] = useState([]);
  const [isEndReached, setIsEndReached] = useState(false);
  const scrollRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const pageRef = useRef(1);
  const router = useRouter();

  const handleChangeCategory = (category) => {
    setActiveCategory(category);
    clearSearch();
    setImages([]);
    pageRef.current = 1;
    let params = {
      page: pageRef.current,
      category,
    };
    fetchImages(params, false);
  };
  console.log("activeCategory", activeCategory);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async (params = { page: 1 }, append = true) => {
    if (isLoading) return;

    setIsLoading(true);
    const res = await apiCall(params);

    if (res.success && res?.data?.hits) {
      if (append) {
        setImages((prev) => [...prev, ...res.data.hits]);
      } else {
        setImages(res.data.hits);
      }
    }
    setIsLoading(false);
  };

  const handleSearch = (text) => {
    setSearch(text);
    if (text.length > 2) {
      pageRef.current = 1;
      setImages([]);
      setActiveCategory(null);
      fetchImages({ page: pageRef.current, q: text }, false);
    }
    if (text === "") {
      pageRef.current = 1;
      searchInputRef?.current?.clear();
      setImages([]);
      setActiveCategory(null);
      fetchImages({ page: pageRef.current }, false);
    }
  };

  const clearSearch = () => {
    setSearch("");
    searchInputRef?.current?.clear();
  };

  const handleScroll = (event) => {
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollOffset = event.nativeEvent.contentOffset.y;
    const isCloseToBottom =
      scrollOffset >= contentHeight - scrollViewHeight - 20;

    if (isCloseToBottom && !isEndReached && !isLoading) {
      setIsEndReached(true);
      pageRef.current += 1;

      let params = {
        page: pageRef.current,
      };
      if (activeCategory) params.category = activeCategory;
      if (search) params.q = search;

      fetchImages(params);
    } else if (!isCloseToBottom && isEndReached) {
      setIsEndReached(false);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <View style={[styles.container, { paddingTop }]}>
      {/* header */}
      <View style={styles.header}>
        <Pressable onPress={() => scrollRef.current.scrollTo({ y: 0 })}>
          <Text style={styles.title}>PixelsByShaadh</Text>
        </Pressable>
        <Pressable>
          <FontAwesome6 name="bars-staggered" size={22} color="black" />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{ gap: 15 }}
        onScroll={handleScroll}
        scrollEventThrottle={5}
        ref={scrollRef}
      >
        {/* search bar */}
        <View style={styles.searchBar}>
          <View style={styles.searchIcon}>
            <Feather
              name="search"
              size={24}
              color={theme.colors.neutral(0.4)}
            />
          </View>
          <TextInput
            placeholder="Search for photos..."
            // value={search}
            ref={searchInputRef}
            onChangeText={handleTextDebounce}
            style={styles.searchInput}
          />
          {search && (
            <Pressable
              onPress={() => handleSearch("")}
              style={styles.closeIcon}
            >
              <Ionicons
                name="close"
                size={24}
                color={theme.colors.neutral(0.6)}
              />
            </Pressable>
          )}
        </View>
        <View style={styles.categories}>
          <Categories
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>
        <View style={styles.imageGrid}>
          {images.length > 0 && <ImageGrid images={images} router={router}/>}
        </View>
        {isLoading && (
          <View style={{ alignItems: "center", paddingVertical: 10 }}>
            <Text style={{ color: "gray" }}>Loading...</Text>
          </View>
        )}
        {images.length === 0 && !isLoading && (
          <View style={{ alignItems: "center", paddingVertical: 10 }}>
            <Text style={{ color: "gray" }}>No images found</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    gap: 15,
  },
  header: {
    marginHorizontal: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: hp(4),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.neutral(0.9),
  },
  searchIcon: {
    padding: 8,
  },
  searchInput: {
    flex: 1,
    borderRadius: theme.radius.sm,
    paddingVertical: 10,
    fontSize: hp(1.8),
  },
  closeIcon: {
    backgroundColor: theme.colors.neutral(0.1),
    padding: 8,
    borderRadius: theme.radius.sm,
  },
  searchBar: {
    marginHorizontal: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    backgroundColor: theme.colors.white,
    padding: 6,
    paddingLeft: 10,
    borderRadius: theme.radius.lg,
  },
});
