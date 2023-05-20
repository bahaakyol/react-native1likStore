import React from "react";
import { View, Text, StyleSheet } from "react-native"; 
import { useTheme } from "@react-navigation/native";

interface FilterProps {
    filterBy : string,
    icon : React.ReactNode,

}

const Filter = ({filterBy, icon } : FilterProps)  => {

  const theme = useTheme()
  return (
    <View style={[styles.container, {backgroundColor : theme.colors.text}]}>
      <Text style = {[styles.text, {color : theme.colors.background}]}>{filterBy}</Text>
      {icon}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex : 1,
    margin : 5,
    height : '90%',
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius : 25,
  },
  text : {
    marginHorizontal : 5,
  }
});

export default React.memo(Filter);
