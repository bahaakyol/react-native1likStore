import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface IStarRating {
  rating: number;
  numReviews: number;
  showReviews : boolean;
}

const Stars = ({rating,numReviews,showReviews} : IStarRating) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    const starColor = i < rating ? "gold" : "grey";
    const starIcon = i < rating ? "star" : "star-o";
    stars.push(
      <FontAwesome name={starIcon} size={24} color={starColor} key={i} />
    );
  }
  return (
    <View style={styles.container}>
      {stars}
      {showReviews && <Text>({Math.floor(numReviews)})</Text>}
    </View>
  );
};

const StarRating = ({ rating, numReviews, showReviews }: IStarRating) => {
  return (
    <View style={styles.container}>
      <Stars rating={rating} numReviews={numReviews} showReviews={showReviews} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default React.memo(StarRating);
