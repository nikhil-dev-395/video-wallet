import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Alert,
  Text,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import Card from "../../components/card.jsx";
import axios from "axios";
import RazorpayCheckout from "react-native-razorpay";

export default function HomeScreen() {
  const [videos, setVideos] = useState([]);
  // Fetch videos when the component mounts
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data } = await axios.get(
          "http://10.0.2.2:4963/api/v1/video/show-all-video"
        );
        if (data.success) {
          setVideos(data.allVideo);
        } else {
          Alert.alert("No videos found");
        }
      } catch (error) {
        console.error("Error fetching videos:", error.message);
        Alert.alert("Error", "Failed to load videos.");
      }
    };

    fetchVideos();
  }, []);

  const checkoutHandler = async (amount) => {
    try {
      // Fetch the Razorpay API key
      const {
        data: { key },
      } = await axios.get("http://10.0.2.2:4963/api/v1/getApiKey");

      // Create a payment order
      const {
        data: { order },
      } = await axios.post("http://10.0.2.2:4963/api/v1/payment/checkout", {
        amount,
      });

      // Razorpay payment options
      const options = {
        key, // Use the fetched API key
        amount: order.amount, // Use the amount from the created order
        currency: "INR",
        name: "Nikhil Wankhade",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id, // Use the order ID from the created order
        callback_url: "http://10.0.2.2:4963/api/v1/payment/paymentVerification",
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#42c",
        },
      };

      // Open Razorpay checkout
      RazorpayCheckout.open(options)
        .then((data) => {
          // Handle success
          Alert.alert(`Success: ${data.razorpay_payment_id}`);
        })
        .catch((error) => {
          // Handle failure
          Alert.alert(`Error: ${error.code} | ${error.description}`);
        });
    } catch (error) {
      console.error(
        "Error processing payment:",
        error.response?.data || error.message
      );
      Alert.alert(
        "Payment Error",
        "An error occurred while processing the payment."
      );
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Card
          amount={4000}
          img={
            "https://images.unsplash.com/photo-1726137570037-6e291746fb5e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8"
          }
          checkoutHandler={() => checkoutHandler(4000)}
        />

        {videos.map((video, index) => (
          <Card
            key={index}
            amount={parseInt(video.price) * 1000}
            img={
              "https://images.unsplash.com/photo-1726137570037-6e291746fb5e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8"
            }
            checkoutHandler={() =>
              checkoutHandler(parseInt(video.price) * 1000)
            }
          />
        ))}

        <TouchableHighlight
          onPress={() => Alert.alert("hii")}
          underlayColor="#b3e6ff"
          style={styles.button}
        >
          <Text>make recharge </Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "40%",
    padding: 10,
    marginTop: 15,
    display: "flex",
    flexWrap: "wrap",
  },
  button: {
    backgroundColor: "#42c",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
