import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, ProductDetail, Wishlist ,SearchScreen } from "../scenes";
import {useColorScheme} from 'react-native'
import React from 'react'
import { RouteProp } from "@react-navigation/native";

type RootParamList = {
  Home: undefined;
  ProductDetail: { id: string };
  Wishlist: undefined;
  Search : undefined;
};

type ProductDetailRouteProp = RouteProp<RootParamList, "ProductDetail">;

type Props = {
  route: ProductDetailRouteProp;
};

const Stack = createNativeStackNavigator<RootParamList>();

const myDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#000",
    text: "#fff",
    border: "#2c3e50",
  },
};

const myLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
    text: "#000",
    border: "#f2f2f2",
  },
};

const Navigation = () => {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? myDarkTheme : myLightTheme;

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{headerShown : false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProductDetail" initialParams = {{id : '0'}} component={ProductDetail} options={{headerShown : true, title : ''}}/>
        <Stack.Screen name="Wishlist" component={Wishlist} options={{headerShown : true}}/>
        <Stack.Screen name= "Search" component = {SearchScreen} options = {{headerShown : true}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
