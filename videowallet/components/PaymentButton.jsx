import { Button } from "react-native";
import { Linking } from "react-native";

const PaymentButton = ({ amount }) => {
  const startPayment = async () => {
    try {
      const response = await fetch(
        "http://192.168.28.68:4963/api/v1/payment/checkout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }), // Dynamic amount
        }
      );

      const data = await response.json();
      if (data.success) {
        Linking.openURL(data.paymentUrl);
      } else {
        alert("Payment failed to initiate.");
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return <Button title={`Pay ₹${amount}`} onPress={startPayment} />;
};

export default PaymentButton;
