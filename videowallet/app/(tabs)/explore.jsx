import { SERVER_DOMAIN_URL } from "@/constants/constants";
// import RazorpayCheckout from "react-native-razorpay";
import { WebView } from "react-native-webview";
import PaymentButton from "../../components/PaymentButton.jsx";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  Platform,
  Text,
  View,
  Alert,
  Button,
  TouchableHighlight,
  Linking,
  Modal,
} from "react-native";

export default function TabTwoScreen() {
  const [user, setUser] = useState(null);
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      const { data } = await axios.post(
        `${SERVER_DOMAIN_URL}/api/v1/payment/checkout`,
        {
          amount: 100, // ₹10
          currency: "INR",
        }
      );

      if (data.success) {
        setPaymentUrl(data.paymentUrl);
      } else {
        Alert.alert("Payment Error", "Failed to create payment link");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  useEffect(() => {
    async function fetUserInfo() {
      const { data } = await axios.get(
        `${SERVER_DOMAIN_URL}/api/v1/user/user-info`
      );

      if (data.success) {
        setUser(data.user);
      }
    }

    fetUserInfo();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.walletTitle}>wallet</Text>
      {/* here we will show our balance */}
      {/* here we are using our new currency after  */}
      <Text style={styles.walletTitle}>
        {user?.walletBalance} <Text style={{ color: "#42c" }}>coin</Text>{" "}
      </Text>

      <View style={styles.profile}>
        <Text style={styles.walletProfileOWner}>owner</Text>
        <Text style={styles.walletTitle}>{user?.email} </Text>
        <Text style={styles.walletUsername}>{user?.username}</Text>
      </View>

      <View style={styles.profile}>
        <Text style={styles.walletProfileOWner}>pay</Text>
        <Text style={styles.walletTitle}>10 rs </Text>
        <Button onPress={handlePayment} title="pay now" />

        {/* <PaymentButton amount={200} /> */}
      </View>

      {loading && <ActivityIndicator size="large" color="#42c" />}

      {paymentUrl && (
        <Modal visible={true} animationType="slide">
          <WebView
            source={{ uri: paymentUrl }}
            onNavigationStateChange={(navState) => {
              if (navState.url.includes("success")) {
                Alert.alert(" Recharge Payment Successful!");
                setPaymentUrl(null);
              } else if (navState.url.includes("failure")) {
                Alert.alert("Payment Failed!");
                setPaymentUrl(null);
              }
            }}
          />
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  walletTitle: {
    fontSize: 40,
  },

  profile: {
    backgroundColor: "#dDdADA",
    marginTop: 30,
    padding: 10,
    borderRadius: 5,
  },

  walletProfileOWner: {
    color: "#42c",
    fontSize: 20,
  },
});
