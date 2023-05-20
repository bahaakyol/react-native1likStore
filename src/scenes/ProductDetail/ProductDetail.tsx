import React, { useEffect ,useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import { useTheme } from "@react-navigation/native";
import getProductService from "../../service/getProductService";
import { IById } from "../../service/getProductService";
import { Price } from "../../components";
import { StarRating } from "../../components";
import { FontAwesome5, MaterialIcons , Fontisto } from "@expo/vector-icons";
import { ImageSlider } from "react-native-image-slider-banner";


interface IProductDetail {
  route: any;
}

const ProductDetail = ({ route }: IProductDetail) => {
  const { id } = route.params;
  const theme = useTheme();
  const [data, setData] = React.useState<IById[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);
    getProductService.getProduct({ id }).then((res) => {
      setData(res);
      setImages(res.images);
      setLoading(false);
    });
  }, []);

  const buyers = Math.floor(Math.random() * 1000 + 1);
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={"red"}
          style={{ zIndex: 1, position: "absolute", top: "40%" }}
        />
      ) : null}
      {/* <Image
        style={styles.image}
        source={{
          uri: data.thumbnail,
        }}
      /> */}
      <ImageSlider 
    data={[
        {img: images[0]},
        {img:images[1] ? images[1] : images[0]},
        {img: images[2] ? images[2] : images[1] ? images[1] : images[0]},
    ]}
    autoPlay={false}
    closeIconColor="#fff"
    
/>
      <Text style={styles.title}>{data.title}</Text>
      <View style={styles.feedback}>
        <FontAwesome5 name="shopping-bag" size={12} color="white" />
        <Text style={styles.smallText}>
          {buyers} people bought this product
        </Text>
        <View style={styles.divider}></View>
        <StarRating rating={5} numReviews={10} showReviews={false} />
      </View>
      <View style={styles.description}>
        <Text style={styles.text}>{data.description}</Text>
        <View style = {styles.categoryContainer}>
        <MaterialIcons name="category" size={36} color="white" />
        <Text style={styles.categoryText}>Category: {data.category}</Text>
        </View>
        <View style = {styles.categoryContainer}>
        <Fontisto name="world-o" size={36} color="white" />
        <Text style={styles.categoryText}>Brand: {data.brand}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "grey",
    overflow: "scroll",
  },
  text: {
    fontSize: 20,
    color: "white",
  },
  title: {
    fontSize: 28,
    color: "white",
  },
  feedback: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
    padding: 20,
  },
  categoryText: {
    fontSize: 20,
    color: "white",
    marginTop: 10,
    marginLeft: 10,
    fontWeight: "bold",
  },

  smallText: {
    fontSize: 12,
    color: "white",
    marginLeft: 10,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: "white",
    marginHorizontal: 15,
  },
  description: {
    padding: 10,
    fontSize: 16,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
    padding: 20,
  },
  image: {
    width: "100%",
    height: "50%",
  },
});

export default ProductDetail;
