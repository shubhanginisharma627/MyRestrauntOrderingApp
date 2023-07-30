
import React from "react";
import { Text, StyleSheet } from "react-native";

const DishItem = ({ dish, index,isChecked }) => {
  return <Text style={[styles.dishItem,isChecked?{color:"#fff"}:null]}>{`${index + 1}. ${dish}`}</Text>;
};

const styles = StyleSheet.create({
    dishItem: {
      fontSize: 16,
      marginLeft: 8,
      marginBottom: 4,
    },
  });
  

export default DishItem;
