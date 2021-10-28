import React,{ useState, useEffect } from "react";
import { View, Text } from "react-native";
 import cardPost from "./cardPost";



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
  
        
      </View>
}
