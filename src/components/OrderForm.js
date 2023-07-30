import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const OrderForm = ({
  nameError,
  phoneError,
  tableIdError,
  dishesError,
  name,
  phone,
  tableId,
  dishes,
  handleNameChange,
  handlePhoneChange,
  handleTableIdChange,
  handleDishesChange,
  addOrder,
}) => {
  return (
    <View style={styles.form}>
      <TextInput
        style={[styles.input, nameError && styles.inputError]}
        placeholder="Customer Name"
        value={name}
        onChangeText={handleNameChange}
        maxLength={50}
      />
      {nameError && (
        <Text style={styles.errorText}>Invalid name. Please check the input.</Text>
      )}

      <TextInput
        style={[styles.input, phoneError && styles.inputError]}
        placeholder="Customer Phone"
        value={phone}
        onChangeText={handlePhoneChange}
        maxLength={10}
      />
      {phoneError && (
        <Text style={styles.errorText}>Please enter a valid phone number.</Text>
      )}

      <TextInput
        style={[styles.input, tableIdError && styles.inputError]}
        placeholder="Table ID (Upto 3 digits Numeric)"
        value={tableId}
        onChangeText={handleTableIdChange}
        maxLength={3}
      />
      {tableIdError && (
        <Text style={styles.errorText}>Please enter a valid table ID.</Text>
      )}

      <TextInput
        style={[styles.input, dishesError && styles.inputError]}
        placeholder="Dishes (comma-separated)"
        value={dishes}
        onChangeText={handleDishesChange}
      />
      {dishesError && (
        <Text style={styles.errorText}>Invalid dishes. Please check the input.</Text>
      )}

      <TouchableOpacity style={styles.addButton} onPress={addOrder}>
        <Text style={styles.addButtonLabel}>Add Order</Text>
      </TouchableOpacity>
    </View>
  );
};
  
const styles = StyleSheet.create({
  formContainer: {
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    margin: 10,
    backgroundColor: "#F8F8FF",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
   
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1,
  },
  errorText: {
    fontSize:10,
    color: "red",
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: "#F2EAD3",
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  addButtonLabel: {
    color: "#3F2305",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default OrderForm;
