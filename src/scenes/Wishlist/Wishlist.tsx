import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Card } from "../../components";
import dataService, { IData } from "../../service/dataService";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import {EmptyView} from "../../components";

interface IWishlist {
  navigation: any;
}

const WishlistScreen = ({ navigation }: IWishlist) => {
  const [data, setData] = useState<IData[]>([]);
  const [newData, setNewData] = useState<IData[]>([]);
  const wishlist = useSelector((state: any) => state.product.wishlist);

  useEffect(() => {
    dataService.getData({ skip: 0 , limit : 0 }).then((res) => {
      setData(res);
      const newData = res.filter((item: any) => wishlist.includes(item.id));
      setNewData(newData);
    });
  }, []);

  useEffect(() => {
    const newData = data.filter((item: any) => wishlist.includes(item.id));
    setNewData(newData);
  }, [wishlist,data]);

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
    <View style={styles.container}>
      {newData.length === 0 ? (
        <View style = {styles.empty}>
        <EmptyView />
        </View>
      ) : 
      <FlatList
        data={newData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        initialNumToRender={10}
        showsVerticalScrollIndicator={false}
      />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
  indicator: {
    alignSelf: "center",
    zIndex: 1,
    position: "absolute",
  },
  empty : {
    flex : 1,
    width : "100%",
  }
});

export default WishlistScreen;
