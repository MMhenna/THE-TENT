import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
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
import { render } from "react-dom";
require("firebase/firestore");
require("firebase/firebase-storage");

export default function Feed() {
  renderPost = (post) => {
    return <View></View>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Feed</Text>
      </View>
      <FlatList/>
    </View>
  );
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
