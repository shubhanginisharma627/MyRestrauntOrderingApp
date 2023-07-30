
import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import CheckBox from "expo-checkbox";
import DishItem from "./DishItem";
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
const OrderItem = ({ item, completed, toggleComplete, deleteOrder,dishes }) => {
    const [isChecked, setIsChecked] = useState(completed);

  const deleteButton = completed ? null : (
    Platform.OS === "ios" ?(
    <TouchableOpacity onPress={() => deleteOrder(item)}>
      < Ionicons name="ios-trash-bin" size={28} color="#3C2A21" style={[styles.deleteButton,{bottom:4}]} />
    </TouchableOpacity>):(
        <TouchableOpacity onPress={() => deleteOrder(item)}>
        < FontAwesome5 name="trash" size={24} color="#3C2A21" style={[styles.deleteButton,{bottom:3,marginRight:15}]} />
      </TouchableOpacity>
    )
  );

  const handleCheckboxChange = () => {
    toggleComplete(item);
    setIsChecked((prevValue) => !prevValue);
  };

  return (
    <View
    style={[
      styles.orderContainer,
      completed ? styles.completedOrder : null,
    ]}
  >
      <View style={styles.orderDetailsContainer}>
        <View style={styles.orderDetails}>
          <Text style={[styles.orderName,isChecked?{color:"#fff"}:null]}>{item.name}</Text>
          <Text style={[styles.orderPhone,isChecked?{color:"#fff"}:null]}>Phone No: +91 {item.phone}</Text>

          <View style={styles.orderDetailItem}>
            <Text style={[styles.orderLabelText,isChecked?{color:"#fff"}:null]}>Table ID:</Text>
            <Text style={[styles.orderValueText,isChecked?{color:"#fff"}:null]}>{item.tableId}</Text>
          </View>
        </View>
        <View>
       
          <CheckBox
            value={isChecked}
            onValueChange={handleCheckboxChange}
            style={styles.checkBox}
            color={"#3F2305"}
          />
    
          
        </View>
      </View>

      <View style={styles.dishesContainer}>
        <Text style={[styles.dishesHeader,isChecked?{color:"#fff"}:null]}>Dishes:</Text>
        <View style={styles.dishesList}>
          <FlatList
          data={dishes.split(/[,]+/).filter((dish) => dish.trim() !== "")}
            renderItem={({ item, index }) => <DishItem dish={item} index={index} isChecked={isChecked}/>}
            keyExtractor={(dish) => dish}
            contentContainerStyle={{
              justifyContent: "center",
              flexDirection: "row",
              color:isChecked?"#fff":null
            }}
            columnWrapperStyle={{ flexWrap: "wrap", flex: 1 }}
            numColumns={4}
          />
        </View>
        {deleteButton}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    orderContainer: {
      backgroundColor: "#F8F8FF",
      borderRadius: 10,
      padding: 16,
      marginBottom: 16,
      shadowColor:  "#000",
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
      borderColor: "#ccc",
    },
    orderDetailsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    orderDetails: {
      flex: 1,
    },
    orderName: {
      fontSize: 22,
      fontWeight: "bold",
      color: "#888888",
      marginBottom: 4,
    },
    orderPhone: {
      fontSize: 16,
      color: "#555",
      marginBottom: 6,
      marginLeft:2
    },
    
    orderDetailItem: {
      flexDirection: "row",
      marginBottom: 8,
      alignItems: "center",
      marginTop: 8,
    },
    orderLabelText: {
      fontSize: 16,
      color: "#555",
    },
    orderValueText: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#555",
      marginLeft: 6,
    },
    dishesContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "center",
      marginTop: 2,
      marginLeft:2
    },
    dishesHeader: {
      fontSize: 16,
      color: "#555",
      marginRight: 1,
    },
    dishesList: {
      flex: 1,
      marginLeft: 1,
    },
    dishItem: {
      fontSize: 16,
      marginLeft: 4,
      marginBottom: 4,
    },
    checkBox: {
      marginRight: 10,
      marginBottom:8,
      width:30,
      height:30,
      borderRadius:100
    },
    deleteButton: {
      textAlign: "right",
      marginBottom:2,
      marginRight:13
    },
    completedOrder: {
      backgroundColor: "#8D7B68",
      
    },
   
  });
  

export default OrderItem;
