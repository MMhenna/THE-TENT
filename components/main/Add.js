import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateField from "react-native-datefield";

import { AppStyles } from "../../AppStyles";

export default function Add() {
  const [image, setimage] = useState(null);

  useEffect(async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access library is required!");
      return;
    }
  }, []);
  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.All(),
      // allowsEditing:true,
      // aspect:[4,3],
      // quality:1
    });
    console.log(result);

    if (!result.cancelled) {
      setimage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Select Image" onPress={selectImage} />
      {image && (
        <Image source={{ uri: image }} styles={{ width: 200, height: 200 }} />
      )}
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Place"
          onChangeText={(place) => this.setState({place})}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      {/* <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Date"
          onChangeText={() => this.setState({})}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View> */}
      <View style={styles.DateContainer}>
        <DateField
          styleInput={styles.inputBorder}
          onSubmit={(value) => console.log(value)}
        />

        {/* <DateField
        labelDate="Input date"
        labelMonth="Input month"
        labelYear="Input year"
        defaultValue={new Date()}
        styleInput={styles.inputBorder}
        onSubmit={(value) => console.log(value)}
      /> */}

        {/* <DateField
        editable={false}
        styleInput={styles.inputBorder}
        maximumDate={new Date(2023, 3, 10)}
        minimumDate={new Date(2021, 4, 21)}
        handleErrors={() => console.log("ERROR")}
      /> */}
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Night "
          keyboardType="numeric"
          onChangeText={(night) => this.setState({night})}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.InputContainerArea}>
        <TextInput
          style={styles.body}
          multiline={true}
          numberOfLines={200}
          placeholder="Description"
          onChangeText={(desc) => this.setState({desc})}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <TouchableOpacity style={styles.addContainer}>
        <Text style={styles.addText}>add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  InputContainerArea: {
    width: AppStyles.textInputWidth.main,
    height: 200,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main,
    textAlignVertical: 'top',
  },
  DateContainer: {
    marginTop: 40,
  },
  inputBorder: {
    width: "30%",
    borderRadius: 8,
    borderColor: "#cacaca",
    borderWidth: 1,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  or: {
    color: "black",
    marginTop: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: "bold",
    color: AppStyles.color.tint,
    marginTop: 20,
    marginBottom: 20,
  },
  leftTitle: {
    alignSelf: "stretch",
    textAlign: "left",
    marginLeft: 20,
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: "center",
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text,
  },
  addContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
    textAlign: "center",
  },
  addText: {
    color: AppStyles.color.white,
  },
  placeholder: {
    color: "red",
  },
  InputContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main,
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text,
  },
  facebookContainer: {
    width: 192,
    backgroundColor: AppStyles.color.facebook,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
  },
  facebookText: {
    color: AppStyles.color.white,
  },
  googleContainer: {
    width: 192,
    height: 48,
    marginTop: 30,
  },
  googleText: {
    color: AppStyles.color.white,
  },
});
