import React from "react";
import { StatusBar, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text } from "react-native";
import { useFonts } from "expo-font";
// Import the RestaurantOrderingApp component
import RestaurantOrderingApp from "./src/RestaurantOrderingApp";

export default function App() {
  const [fontsLoaded] = useFonts({
    FontAwesome: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome.ttf"),
  });


  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.text}>Order List</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingContainer}
      >
        <Text style={styles.statusBarPlaceholder} />
        <RestaurantOrderingApp />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DFD7BF",
  },
  text: {
    color:"#3F2305",
    fontSize: 30,
    textAlign: "center",
    fontWeight: "800",
    paddingTop: Platform.OS === "ios" ? 50 : 10,
  },
  keyboardAvoidingContainer: {
    flex: 1,
    paddingBottom: Platform.OS === "ios" ? 50 : 0,
  },
  statusBarPlaceholder: {
    height: Platform.OS === "ios" ? StatusBar.currentHeight : 0,
  },
});
