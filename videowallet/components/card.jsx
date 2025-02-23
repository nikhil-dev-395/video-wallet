import { Button, Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const card = ({ amount, img, checkoutHandler }) => {
  return (
    <View style={styles.card}>
      {/* Correct way to display images in React Native  */}
      <Image source={{ uri: img }} style={styles.image} />
      <Text style={styles.amount}>₹{amount}</Text>
      <Button title="Buy Me" onPress={checkoutHandler} />
    </View>
  );
};

export default card;

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    padding: 10,

    borderRadius: 10,

    margin: 10,
  },
  image: {
    width: 200, // Set width explicitly
    height: 200, // Set height explicitly
    borderRadius: 10, // Optional for rounded corners
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
});
