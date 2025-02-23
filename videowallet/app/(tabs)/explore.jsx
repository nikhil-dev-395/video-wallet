import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, Image, Platform, Text, View } from "react-native";

export default function TabTwoScreen() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetUserInfo() {
      const { data } = await axios.get(
        "http://10.0.2.2:4963/api/v1/user/user-info"
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
        <Text style={styles.walletTitle}>{user?.username}</Text>
      </View>
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
