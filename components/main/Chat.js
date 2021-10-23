import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import { View, ScrollView, Text, Button, StyleSheet } from "react-native";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import firebase from "firebase";

import { auth } from "../../App";

const ChatScreen = () => {
  const [messages, oldMessages] = useState([]);

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: "Hello developer",
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: "React Native",
  //         avatar: "https://placeimg.com/140/140/any",
  //       },
  //     },
  //     {
  //       _id: 2,
  //       text: "Hello world",
  //       createdAt: new Date(),
  //       user: {
  //         _id: 1,
  //         name: "React Native",
  //         avatar: "https://placeimg.com/140/140/any",
  //       },
  //     },
  //   ]);
  // }, []);
  // let call = () => {};

  useEffect(() => {
    try {
      const oldMessages = onSnapshot(
        firebase.firestore().collection('rooms').doc().collection('messages').orderBy('createdAt', 'desc'),
        (doc) => {
          console.log("Current data: ", doc.data());
        }
      );
      // const unsubscribe = await firebase
      //   .firestore()
      //   .collection("chats")
      //   .orderBy("createdAt", "desc")
      //   .get()
      //   .onSnapshot( (snapshot) => {

      //     console.log(snapshot);

      //   }
      // setMessages(
      //   snapshot.docs.maps((doc) => ({
      //     _id: doc.data()._id,
      //     createdAt: doc.data().createdAt.toDate(),
      //     text: doc.data().text,
      //     user: doc.data().user,
      //   }))
      // )
      // );
    } catch (error) {
      console.log(error);
    }
  });

  const onSend = useCallback((messages = []) => {
    oldMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    firebase
      .firestore()
      .collection("rooms")
      .add({ _id, createdAt, text, user });
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#2e64e5",
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        name: auth?.currentUser?.name,
        avatar: auth?.currentUser?.photoURL,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
