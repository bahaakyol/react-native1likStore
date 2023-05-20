import React, { useState, useEffect, useCallback , useRef } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Platform,
  Text,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { FilterModal, Header, Filter } from "../../components";
import { FlashList } from "@shopify/flash-list";
import { Feather } from "@expo/vector-icons";
import dataService from "../../service/dataService";
import categoryItemsService from "../../service/categoryItems";
import { IData } from "../../service/dataService";
import { Card } from "../../components";

const HomeScreen = ({ navigation }: any) => {
  const theme = useTheme();
  const skipRef = useRef<number>(0);
  const [data, setData] = useState<IData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  // const [skipValue, setSkipValue] = useState<number>(0);
  const [categoryAll, setCategoryAll] = useState<boolean>(false);

  useEffect(() => {
    setCategoryAll(selectedCategory === "All");
  }, [selectedCategory]);

  const onReachedEnd = () => {
    dataService.getData({ skip: skipRef.current + 10 }).then((res) => {
      setData((prev) => [...prev, ...res]);
      skipRef.current += 10;
    });
  };

  const navigateSearch = () => {
    navigation.navigate("Search");
  };

  useEffect(() => {
    dataService.getData({ skip: 0 }).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [categoryAll]);

  useEffect(() => {
    if (selectedCategory === "") return;
    setLoading(true);
    categoryItemsService.getCategoryItems(selectedCategory).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [selectedCategory]);

  const navigateWishlist = () => {
    navigation.navigate("Wishlist");
  };

  const renderItem = useCallback(({ item }: { item: IData }) => {
    return (
      <Card
        id={item.id}
        price={item.price}
        title={item.title}
        thumbnail={item.thumbnail}
        discountPercentage={item.discountPercentage}
        numReviews={Math.floor(Math.random() * 100) + 1}
        rating={item.rating}
        navigation={navigation}
        showReviews={true}
      />
    );
  }, []);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          marginTop: "7%" ?? Platform.OS === "android",
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <TouchableOpacity onPress={navigateSearch}>
        <Feather name="search" size={24} color={theme.colors.text} />
      </TouchableOpacity>
      {isFilterVisible && (
        <FilterModal
          modalVisible={isFilterVisible}
          setModalVisible={setIsFilterVisible}
          setCategory={setSelectedCategory}
        />
      )}
      {loading ? (
        <ActivityIndicator
          size="large"
          color={"red"}
          style={styles.indicator}
        />
      ) : null}
      <View style={styles.header}>
        <Header
          setIsFilterVisible={setIsFilterVisible}
          setIsWishlistVisible={navigateWishlist}
        />
      </View>
      <View style={styles.page}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          onEndReached={onReachedEnd}
          onEndReachedThreshold={0.5}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    alignSelf: "center",
    zIndex: 1,
    position: "absolute",
  },
  text: {
    fontSize: 20,
  },
  page: {
    flex: 1,
    width: "100%",
    backgroundColor: "#c2c2c2",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    width: "100%",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
});

export default HomeScreen;
