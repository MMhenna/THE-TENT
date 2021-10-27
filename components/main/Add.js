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
import DatePicker from 'react-native-date-picker'

import NumberPlease from "react-native-number-please";



import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");

import { AppStyles } from "../../AppStyles";

export default function Add() {
  const [image, setimage] = useState(null);
  const [place, setPlace] = useState("");
  
  const [night, setNight] = useState("");
  const [desc, setDesc] = useState("");
  const [open, setOpen] = useState(false)

  

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

  const uploadImage = async () => {
    const childPath = `post/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString(36)}`;
    console.log(childPath);

    const response = await fetch(image);
    const blob = await response.blob();

    const task = firebase.storage().ref().child(childPath).put(blob);

    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        savePostData(snapshot);
        console.log(snapshot);
      });
    };

    const taskError = (snapshot) => {
      console.log(snapshot);
    };

    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  const savePostData = (downloadURL) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .add({
        downloadURL,
        place,
        date,
        night,
        desc,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function () {
        props.navigation.popToTop();
      });
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
          onChangeText={(place) => setPlace(place)}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>

      <Button title="Open" onPress={() => setOpen(true)} />
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
        />

        

      {/* <TextInputMask
        type={"datetime"}
        options={{
          format: "MM/DD/YYYY",
        }}
        // value={this.state.dt}
        onChangeText={(date) => setDate(date)}
      /> */}
      {/* <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Date"
          onChangeText={() => this.setState({})}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View> */}
      {/* <View style={styles.DateContainer}> */}
      {/* <TextInputMask
	// refInput={(ref) => this.myDateText = ref}
	type={'money'}
	style={styles.input}
	customTextInput={Textfield}
	placeholder="Enter text to see events"
/> */}
      {/* <DatePicker mode="date" date={date} onDateChange={setDate} /> */}

      {/* <DateField
          styleInput={styles.inputBorder}
          onSubmit={(value) => console.log(value)}
          onChangeText={(date) => setDate(date)}
        /> */}

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
      {/* </View> */}
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Night "
          keyboardType="numeric"
          onChangeText={(night) => setNight(night)}
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
          onChangeText={(desc) => setDesc(desc)}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <TouchableOpacity
        style={styles.addContainer}
        onPress={() => uploadImage()}
      >
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
    textAlignVertical: "top",
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
    marginBottom: 10,setBirtday
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
