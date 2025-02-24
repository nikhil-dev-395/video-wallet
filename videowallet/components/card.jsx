import { Alert, Button, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import { Video } from "expo-av";
import axios from "axios";
import { SERVER_DOMAIN_URL } from "@/constants/constants";

const Card = ({ amount, video, checkoutHandler, videoId, purchasedBy }) => {
  const videoRef = useRef(null);

  const buyVideo = async () => {
    try {
      await axios.post(`${SERVER_DOMAIN_URL}/api/v1/video/buy-video`, {
        videoId,
      });
      Alert.alert(
        `${videoId} and amount ₹ ${amount} video purchased successfully`
      );
    } catch (error) {
      console.error("Error purchasing video:", error);
    }
  };

  return (
    <View style={styles.card}>
      <Video
        ref={videoRef}
        source={{
          uri: video,
        }}
        style={{ width: 300, height: 200, borderRadius: 20 }}
        resizeMode="cover"
        useNativeControls={purchasedBy ? true : false}
        isMuted
      />
      <Text style={styles.amount}></Text>
      <Text>{purchasedBy ? "video is purchased" : amount}</Text>
      <Button title="Buy Me" onPress={buyVideo} />
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
});
