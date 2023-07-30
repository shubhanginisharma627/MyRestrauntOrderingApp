import React, { useState, useRef } from "react";
import {
  Alert,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";
import OrderItem from "./components/OrderItem";
import OrderForm from "./components/OrderForm";

const RestaurantOrderingApp = () => {
  const [orders, setOrders] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [tableId, setTableId] = useState("");
  const [dishes, setDishes] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const formAnimation = useRef(new Animated.Value(0)).current;
  const rotationAnimation = useRef(new Animated.Value(0)).current;
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [tableIdError, setTableIdError] = useState(false);
  const [dishesError, setDishesError] = useState(false);
  const handleNameChange = (text) => {
    setName(text);
    setNameError(false); // Clear name error when the user starts typing
  };

  const handlePhoneChange = (text) => {
    setPhone(text);
    setPhoneError(false); // Clear phone error when the user starts typing
  };

  const handleTableIdChange = (text) => {
    setTableId(text);
    setTableIdError(false); // Clear table ID error when the user starts typing
  };

  const handleDishesChange = (text) => {
    setDishes(text); // Update the dishes state with the new input text
    setDishesError(false); // Clear dishes error when the user starts typing
  };
  
  

  const addOrder = () => {
    // Regular expressions for validation
    const nameRegex = /^[A-Za-z ]+$/;
    const tableRegex = /^\d{1,3}$/;
    const phoneRegex = /^\d{10}$/;
    const dishRegex = /^[A-Za-z0-9\s,]+$/;
  
    // Initialize error variables
    let nameError = false;
    let phoneError = false;
    let tableIdError = false;
    let dishesError = false;
  
    // Perform validation
    if (!nameRegex.test(name)) {
      setNameError(true);
      nameError = true;
    }
    if (!tableRegex.test(tableId)) {
      setTableIdError(true);
      tableIdError = true;
    }
    if (!phoneRegex.test(phone)) {
      setPhoneError(true);
      phoneError = true;
    }
    if (!dishRegex.test(dishes)) {
      setDishesError(true);
      dishesError = true;
    }
  
    // Check if any errors occurred
    if (nameError || phoneError || tableIdError || dishesError) {
      if(nameError){
        setName('');
      }
      if(phoneError){
        setPhone('');
      }
      if(tableIdError){
        setTableId('');
      }
      if(dishesError){
        setDishes('');
      }
      return;
    }
  
    // If no errors, add the order
    const newOrder = {
      id: Date.now(),
      name: name,
      phone: phone,
      tableId: tableId,
      dishes: dishes,
      completed: false,
    };
    setOrders([...orders, newOrder]);
    setName("");
    setPhone("");
    setTableId("");
    setDishes("");
    setShowAddForm(false);
  };
  

  const deleteOrder = (order) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this order?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => confirmDeleteOrder(order),
        },
      ],
      { cancelable: true }
    );
  };

  const confirmDeleteOrder = (order) => {
    setOrders((prevOrders) => prevOrders.filter((o) => o.id !== order.id));
  };

  const toggleComplete = (order) => {
    setOrders((prevOrders) =>
      prevOrders.map((o) =>
        o.id === order.id ? { ...o, completed: !o.completed } : o
      )
    );
  };
  const rotateButton = rotationAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });
  const toggleAddForm = () => {
    setShowAddForm((prevShowAddForm) => !prevShowAddForm);
    if (showAddForm) {
      // Form is being closed, reset the input field values
      setDishesError(false);
      setNameError(false);
      setPhoneError(false);
      setTableIdError(false);
      setName("");
      setPhone("");
      setTableId("");
      setDishes("");
    }
    Animated.timing(formAnimation, {
      toValue: showAddForm ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(rotationAnimation, {
      toValue: showAddForm ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const renderOrder = ({ item }) => {
    const { completed } = item;
    return (
      <OrderItem
        item={item}
        dishes={item.dishes}
        completed={completed}
        toggleComplete={toggleComplete}
        deleteOrder={deleteOrder}
      />
    );
  };

  const formTranslateY = formAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 0], // Adjust the initial and final positions of the form
  });

  return (
    <KeyboardAvoidingView
      behavior="padding" // Adjust the view when the keyboard appears
      style={styles.container}
    >
      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id.toString()}
      />

      <Animated.View
        style={[
          styles.formContainer,
          { transform: [{ translateY: formTranslateY }] },
        ]}
      >
        {showAddForm && (
          <OrderForm
            name={name}
            phone={phone}
            tableId={tableId}
            dishes={dishes}
            handleNameChange={handleNameChange}
            handlePhoneChange={handlePhoneChange}
            handleTableIdChange={handleTableIdChange}
            handleDishesChange={handleDishesChange}
            nameError={nameError}
            phoneError={phoneError}
            tableIdError={tableIdError}
            dishesError={dishesError}
            addOrder={addOrder}
          />
        )}
      </Animated.View>

      <TouchableOpacity
        style={[styles.addButton, { transform: [{ rotate: rotateButton }] },nameError||dishesError||phoneError||tableIdError?{bottom:Platform.OS === "ios" ?3:20}:{bottom:Platform.OS === "ios" ?20:30}]}
        onPress={toggleAddForm}
      >
        <Text style={styles.addButtonIcon}>{showAddForm ? "+" : "+"}</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DFD7BF",
    padding: 10,
  },
  formContainer: {
    marginBottom: 100,
    // Add margin at the bottom to create some space between the form and the button
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#3F2305",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    position: "absolute",
    alignSelf: "center",
  },
  addButtonIcon: {
    fontSize: 24,
    color: "#fff",
  },
});

export default RestaurantOrderingApp;
