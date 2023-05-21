import React from "react";
import {
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import { useTheme } from "@react-navigation/native";

interface SearchBarProps {
  icon: React.ReactNode;
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar = ({ icon, value, onChangeText }: SearchBarProps) => {
  const theme = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.border }]}>
      {icon}
      <TextInput
        placeholder="Search"
        value={value}
        onChangeText={onChangeText}
        style={[styles.textInput, {color : theme.colors.text}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    // paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 10,
    width: "100%",
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    borderRadius: 8,
    height: 40,
  },
});

export default React.memo(SearchBar);
