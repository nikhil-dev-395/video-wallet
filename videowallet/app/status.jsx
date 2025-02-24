import { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import * as Linking from "expo-linking";

const status = () => {
  useEffect(() => {
    const handleDeepLink = async (event) => {
      const url = event.url;
      if (url) {
        const { queryParams } = Linking.parse(url);
        const paymentId = queryParams.razorpay_payment_id;

        if (paymentId) {
          console.log("Payment ID:", paymentId);

          // Send paymentId to backend for verification
          verifyPayment(paymentId);
        }
      }
    };

    // Listen for deep links
    const subscription = Linking.addEventListener("url", handleDeepLink);

    return () => {
      subscription.remove();
    };
  }, []);

  const verifyPayment = async (url) => {
    try {
      const { queryParams } = Linking.parse(url);
      const paymentId = queryParams.razorpay_payment_id; // Use payment ID

      if (!paymentId) {
        alert("Payment ID not found!");
        return;
      }

      const response = await fetch(
        `http://192.168.28.68:4963/api/v1/payment/verify?payment_id=${paymentId}`
      );
      const data = await response.json();

      if (data.success) {
        alert(
          `Payment Successful! Updated Wallet Balance: ₹${data.walletBalance}`
        );
      } else {
        alert("Payment verification failed!");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
    }
  };

  return (
    <View>
      <Text>Processing Payment...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default status;
