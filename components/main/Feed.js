import React,{ useState, useEffect } from "react";
import { View, Text } from "react-native";
import cardPost from "./cardPost";

import {
    Card,
    CardTitle,
    CardContent,
    CardAction,
    CardButton,
    CardImage,
} from "react-native-material-cards";


import firebase from "firebase";
 require("firebase/firestore");
 require("firebase/firebase-storage")

export default function Feed() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchdata = async () => {
      const postsRef= firebase.firestore().collection("posts");
      const snapshot =  await postsRef.get();
      console.log(snapshot)
      snapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());})


      setData(snapshot);
    };

    fetchdata();
    // eslint-disable-next-line
  }, [])
  const arr = [];
  for (const x in data) {
    arr.push(data[x]);

  }

  console.log(arr)







  return <View>{arr.map((user) => {user.hf})}
  <View style={styles.container}>
      <View style={styles.header}>
        <Text>Feed</Text>
      </View>
      <FlatList/>
    </View>
        
      </View>
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#EFECF4",
    },
    header: {
      paddingTop: 64,
      paddingBottom: 64,
      backgroundColor: "#FFF",
      alignItems: "center",
      justifyContent: "center",
      borderBottomWidth: 1,
      borderBottomColor: "#EBECF4",
      shadowColor: "#454D65",
      shadowOffset: { height: 5 },
      shadowRadius: 15,
      shadowOpacity: 0.2,
      zIndex: 10,
    },
  });

