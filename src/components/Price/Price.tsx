import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface IPrice {
  price: number;
  discountPercentage: number;
}

const Price = ({ price, discountPercentage }: IPrice) => {
  const discountPrice = price - (price * discountPercentage) / 100;
  return (
    <View style={styles.container}>
      <Text style={styles.price}>{parseInt(discountPrice)} TL</Text>
      <Text style={styles.fullPrice}>{price} TL</Text>
      <Text style={styles.discountPercentage}>%{discountPercentage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
  },
  discountPercentage: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
  },
  fullPrice: {
    fontSize: 24,
    fontWeight: "bold",
    textDecorationLine: "line-through",
    color: "rgb(209,209,209)",
    textDecorationStyle: "double",
    marginRight: '10%',
  },
});

export default React.memo(Price);
