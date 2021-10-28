import React from "react";
import { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import firebase from "firebase";
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from "../styles/ MessageStyles";

// [

// {
//   id: "1",
//   userName: "Jenny Doe",
//   userImg: require("../../assets/users/user-3.jpg"),
//   messageTime: "4 mins ago",
//   messageText:
//     "Hey there, this is my test for a post of my social app in React Native.",
// },
// {
//   id: "2",
//   userName: "John Doe",
//   userImg: require("../../assets/users/user-1.jpg"),
//   messageTime: "2 hours ago",
//   messageText:
//     "Hey there, this is my test for a post of my social app in React Native.",
// },
// {
//   id: "3",
//   userName: "Ken William",
//   userImg: require("../../assets/users/user-4.jpg"),
//   messageTime: "1 hours ago",
//   messageText:
//     "Hey there, this is my test for a post of my social app in React Native.",
// },
// {
//   id: "4",
//   userName: "Selina Paul",
//   userImg: require("../../assets/users/user-6.jpg"),
//   messageTime: "1 day ago",
//   messageText:
//     "Hey there, this is my test for a post of my social app in React Native.",
// },
// {
//   id: "5",
//   userName: "Christy Alex",
//   userImg: require("../../assets/users/user-7.jpg"),
//   messageTime: "2 days ago",
//   messageText:
//     "Hey there, this is my test for a post of my social app in React Native.",
// },
// ];

export default function MessagesScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const subscriber = firebase
      .firestore()
      .collection("rooms")
      .where("members", "array-contains", firebase.auth().currentUser.uid)
      .onSnapshot((querySnapshot) => {
        const rooms = [];

        querySnapshot.forEach((documentSnapshot) => {
          rooms.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setRooms(rooms);
        setLoading(false);
        console.log(rooms);
      });

     
    const allMessages = firebase
      .firestore()
      .collection("rooms")
      .doc(rooms.roomId)
      .collection("messages")
      .onSnapshot((querySnapshot) => {
        const chats = [];
        querySnapshot.forEach((documentSnapshot) => {
          chats.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
      });

      setChats(chats);
      console.log(chats)
    return () => {
      subscriber();
      allMessages();
    };
  }, []);

  // useEffect(() => {
  //   const unsubscribe = firebase.firestore().collection('rooms').onSnapshot(querySnapshot =>{
  //     const rooms = querySnapshot.docs.map(documentSnapshot => {
  //       return{
  //         _id:documentSnapshot.id,
  //         // give defaults
  //         name: '',
  //         ...documentSnapshot.data()
  //       }
  //     })
  //     setRooms(rooms);
  //   })

  return (
    <Container styles={styles.container}>
      <FlatList
        data={rooms}
        keyExtractor={(room) => room.roomId.toString()}
        // keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            onPress={() =>
              navigation.navigate("Chat", { userName: item.userName })
            }
          >
            <UserInfo>
              <UserImgWrapper>
                <UserImg source={item.userImg} />
              </UserImgWrapper>
              <TextSection>
                <UserInfoText>
                  <UserName>{item.userName}</UserName>
                  {/* <PostTime>{item.messageTime}</PostTime> */}
                </UserInfoText>
                <MessageText>{item.lastMessage}</MessageText>
              </TextSection>
            </UserInfo>
          </Card>
        )}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
