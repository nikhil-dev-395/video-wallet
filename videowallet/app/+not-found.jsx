// import { useRouter } from "expo-router";
import { Text, StyleSheet, View, Pressable } from "react-native";

export default function NotFoundScreen() {
  // const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Oops! Page not found</Text>
      {/* <Pressable onPress={() => router.push("/(tabs)/Home")}>
        <Text>Home Page</Text>
      </Pressable> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
    color: "blue",
  },
});
