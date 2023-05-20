import React, { useState, useEffect } from "react";
import {
  Modal,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import categoriesService from "../../service/categories";

interface IFilterModal {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setCategory : React.Dispatch<React.SetStateAction<string>>;
}

const filterModal = ({ modalVisible, setModalVisible , setCategory}: IFilterModal) => {
  const [selectedPoint, setSelectedPoint] = useState("skincare");
  const [categories, setCategories] = useState<string[]>([]);

  const onApplyHandler = () => {
    setCategory(selectedPoint)
    setModalVisible(false);
  };

  useEffect(() => {
    categoriesService.getCategories().then((res) => {
      setCategories(["All",...res]);
    });
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <SafeAreaView style={styles.modal}>
        <AntDesign
          name="closecircle"
          size={24}
          color="black"
          style={styles.close}
          onPress={() => {
            setModalVisible(false);
          }}
        />
        <Text style={styles.text}>Filter by Category</Text>
        <Picker
          style={{ width: "100%", height: 200, backgroundColor: "white" }}
          selectedValue={selectedPoint}
          onValueChange={(itemValue, itemIndex) => setSelectedPoint(itemValue)}
        >
          {categories.map((item) => {
            return (
              <Picker.Item
                label={item}
                value={item}
                key={Math.random() * 10000}
              />
            );
          })}
        </Picker>
        <TouchableOpacity style={styles.apply} onPress={onApplyHandler}>
          <Text style={{ color: "white" }}>Apply</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

export default React.memo(filterModal);

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-start",
    alignItems: "center",
    // backgroundColor: "rgba(0,0,0,0.8)",
    backgroundColor: "white",
    height: "30%",
    width: "80%",
    borderRadius: 20,
    alignSelf: "center",
    marginTop: "50%",
  },
  apply: {
    backgroundColor: "grey",
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "black",
    fontSize: 20,
    marginTop: 40,
  },
  close: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
});
