import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SearchBar } from "../../components";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import searchService from "../../service/searchService";
import { Card } from "../../components";
import { IData } from "../../service/dataService";
import {EmptyView} from "../../components";

interface ISearchScreen {
    navigation: any;
}

const ScreenScreen = ({navigation}: ISearchScreen) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const theme = useTheme();
  const [searchResults, setSearchResults] = useState<any[]>([]);

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

    useEffect(() => {
        searchService.searchResults({search : searchValue}).then((res) => {
            setSearchResults(res);
        });
    }, [searchValue]);


  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      
      <View style={styles.searchContainer}>
        <SearchBar
          value={searchValue}
          onChangeText={(text) => setSearchValue(text)}
          icon={<Feather name="search" size={24} color="black" />}
        />
      </View>
      {searchResults.length === 0 ? (
        <EmptyView />
      ): (
        <>
      <View style={styles.divider}></View>
      <View style = {styles.page}>
        <FlatList
            data={searchResults}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
        />
      </View>
      </> )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
  searchContainer: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#c2c2c2",
  },
  page : {
    flex: 1,
  }
});

export default ScreenScreen;
