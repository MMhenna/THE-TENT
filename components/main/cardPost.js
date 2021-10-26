import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Container,
  Card,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";

export default class cardPost extends Component {
  render() {
    return (
      <View style={styles.Card}>
        <View style={styles.Header}>
          <Image source={require("../../assets/users/user-1.jpg")}></Image>
          <Text> user name </Text>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="plus-thick"
              // color={}
              size={20}
            />
          </TouchableOpacity>
        </View>
        <Image></Image>
        <View></View>
        <Text></Text>
        <Text></Text>
        <Text></Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Card: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f8f8",
    width: "100%",
    borderRadius: 10,
  },
  Header: {
    flexDirection: "column",
    width: "100%",
    margin: 10,
  },

  profileImg: {
    width: "50px",
    height: "50px",
    borderRadius: "25px",
  },

  mainImage: {
    height: 50,
    width: "100%",
  },
  Bottom: {
    flexDirection: "column",
  },
});
