import React from "react";
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

  const postsRef= firebase.firestore().collection("posts");
  const snapshot = await postsRef.get();
  snapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
  });


  

    



  return <View></View>;
}
