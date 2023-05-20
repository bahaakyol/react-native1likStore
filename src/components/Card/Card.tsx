import { AntDesign } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addWishlist,
  deleteWishlist,
} from "../../store/reducer/productReducer";
import Price from "../Price/Price";
import StarRating from "../StarRating/StarRating";

interface ICard {
  price: number;
  title: string;
  thumbnail: string;
  discountPercentage: number;
  numReviews: number;
  navigation?: any;
  id: string;
  rating: number;
  showReviews: boolean;
}

const Card = ({
  price,
  title,
  thumbnail,
  discountPercentage,
  numReviews,
  navigation,
  id,
  rating,
  showReviews,
}: ICard) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const wishlist = useSelector((state: any) => state.product.wishlist);
  const dispatch = useDispatch();

  const addToWishlist = () => {
    dispatch(addWishlist(id));
  };

  const removeFromWishlist = () => {
    dispatch(deleteWishlist(id));
  };

  const handlePress = useCallback(() => {
    if (wishlist.includes(id)) {
      removeFromWishlist();
    } else {
      addToWishlist();
    }
    setIsFavorite((prev) => !prev);
  }, [addToWishlist, removeFromWishlist, wishlist]);

  const checkFavorite = () => {
    setIsFavorite(wishlist.includes(id));
  };

  useEffect(() => {
    checkFavorite();
  }, [id, wishlist]);

  const onPress = () => {
    navigation.navigate("ProductDetail", {
      id: id,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {isFavorite ? (
        <AntDesign
          name="heart"
          size={24}
          color="red"
          style={styles.heart}
          onPress={handlePress}
        />
      ) : (
        <AntDesign
          name="hearto"
          size={24}
          color="red"
          style={styles.heart}
          onPress={handlePress}
        />
      )}
      <View style={styles.image}>
        <Image
          source={{ uri: thumbnail }}
          style={{ height: "100%", width: "100%" }}
        />
      </View>
      <View style={styles.info}>
        <Price price={price} discountPercentage={discountPercentage} />
        <Text>{title}</Text>
        <View style={styles.rating}>
          <StarRating
            rating={rating}
            numReviews={numReviews}
            showReviews={showReviews}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height / 2.3,
    width: Dimensions.get("window").width - 20,
    backgroundColor: "white",
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
  },
  image: {
    height: "70%",
    width: "100%",
    backgroundColor: "transparent",
  },
  info: {
    flex: 1,
    padding: 10,
  },
  heart: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 1,
  },
  rating: {
    flexDirection: "row",
  },
});

export default React.memo(Card);
