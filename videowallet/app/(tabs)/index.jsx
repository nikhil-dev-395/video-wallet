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
// import RazorpayCheckout from "react-native-razorpay";
import { SERVER_DOMAIN_URL } from "../../constants/constants.js";
export default function HomeScreen() {
  const [videos, setVideos] = useState([]);
  // Fetch videos when the component mounts
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data } = await axios.get(
          ` ${SERVER_DOMAIN_URL}/api/v1/video/show-all-video`
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
      // handle if user have money in wallet means it has wallet balance
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        {videos.map((video, index) => (
          <Card
            key={index}
            videoId={video._id}
            amount={parseInt(video.price)}
            purchasedBy={video.purchasedBy.length > 0}
            img={
              "https://images.pexels.com/photos/320617/pexels-photo-320617.jpeg?auto=compress&cs=tinysrgb&w=600"
            }
            video={
              "https://res.cloudinary.com/dbenalctk/video/upload/v1740225099/video2_davdwy.mp4"
            }
            checkoutHandler={() => checkoutHandler(parseInt(video.price) * 10)}
          />
        ))}

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
