import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Filter from "../Filter/Filter";

interface IHeader {
  setIsFilterVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsWishlistVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const Header = ({ setIsFilterVisible, setIsWishlistVisible }: IHeader) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.filter}>
        <TouchableOpacity
          style={styles.filterContainer}
          onPress={() => setIsFilterVisible(true)}
        >
          <Filter
            filterBy="Filter"
            icon={
              <Ionicons
                name="filter"
                size={24}
                color={theme.colors.background}
              />
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterContainer}
          onPress={() => setIsWishlistVisible(true)}
        >
          <Filter
            filterBy="Wishlist"
            icon={
              <Ionicons
                name="heart"
                size={24}
                color={theme.colors.background}
              />
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // backgroundColor: "#2c3e50",
    flexDirection: "column",
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#bdc3c7",
  },
  filter: {
    flexDirection: "row",
  },
  filterContainer: {
    width: "50%",
    // backgroundColor : 'red',
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 45,
  },
});

export default React.memo(Header);
