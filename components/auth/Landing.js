import React from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";

import { AppStyles } from "../../AppStyles";

export default function Landing({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/92693924cecc496ca92cce437726e053.png')}
      />
      <Text style={styles.title}>Let's go on an adventure</Text>

      <TouchableOpacity
        style={styles.loginContainer}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.loginText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signupContainer}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 150,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "cover",
  },
  title: {
    fontFamily: 'Iowan Old Style',
    fontSize: AppStyles.fontSize.title,
    fontWeight: "bold",
    color: AppStyles.color.tint,
    marginTop: 20,
    textAlign: "center",
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: "bold",
    color: AppStyles.color.tint,
    marginTop: 20,
    textAlign: "center",
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
    textAlign: "center",
  },
  loginText: {
    color: AppStyles.color.white,
  },
  signupContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.white,
    borderRadius: AppStyles.borderRadius.main,
    padding: 8,
    borderWidth: 1,
    borderColor: AppStyles.color.tint,
    marginTop: 15,
    textAlign: "center",
  },
  signupText: {
    color: AppStyles.color.tint,
  },
});
