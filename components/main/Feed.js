import React, { useState, useEffect } from "react";
import { View, Text,Image,StyleSheet } from "react-native";
import {Container,Card,PostImg} from "../styles/cardPostStyles"



import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage")


// async function allpost() {
//   const listofposts = []
//   const dataoftheuser = []
//   const db = firebase.firestore()
//   const posts = await db.collection('posts').onSnapshot((val => {
//     val.forEach(document => {
//       const post_data = []
//       post_data.push({ ...document.data(), key: document.id })
//       post_data.forEach(async elem => {

//         const user = await db.collection('users').doc(elem.userid).onSnapshot((data => {
//           dataoftheuser.push({ userdata: data.data(), postdata: elem })
//           listofposts.push(dataoftheuser)
//         }
//         ))
//       })
//     })
//   }));
//   console.log(listofposts)

// };
function datafinder() {
  return [1, 3]
}
async function finder() {


}
export default function Feed() {
  const [userowners, setUserPosts] = useState([]);

    const [ posts, setPosts ] = useState([]);
    useEffect(() => {
      firebase.firestore()
        .collection('posts')
        .onSnapshot((snapshot) => setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))));
    }, []);
    console.log(posts)

  // const [data, setData] = useState();
  // useEffect( () => {
  //   const dataoftheuser = []
  //   const listofposts = []
  //           db.collection('posts').onSnapshot((val => {
  //       val.forEach(document => {
  //         const post_data = []
  //         post_data.push({ ...document.data(), key: document.id })
  //         post_data.forEach( elem => {

  //           const user =  db.collection('users').doc(elem.userid).onSnapshot((data => {
  //             dataoftheuser.push({ userdata: data.data(), postdata: elem })
  //             listofposts.push(dataoftheuser)
  //           }
  //           ))
  //         })
  //       })
  //     }))
  //     setData(dataoftheuser)

  //   },[])

  // eslint-disable-next-line
  // console.log(data)
  return (<View>

    {/* {data.forEach(val => {
      val
    })} */}
    {posts.map((post) =>       (<Card>
 ù     <Text  style={styles.title}>{post.id}</Text>
      <PostImg source={post.data.downloadURL}
 style={styles.stretch}       />
      <Text  style={styles.PostText} >     {post.data.night}</Text>
      <Text    >     {post.data.desc}</Text >
      <Text   style={styles.text} >     {post.data.night}</Text>
      <Text   style={styles.text} >     {post.data.place}</Text>
      <Text   style={styles.text} >     {post.data.userid}</Text>

 
    </Card>)

           //post.data.creation
          //  desc={a.data.desc}
          //  image= {a.data.downloadURL}
          //  night = {a.data.night}
          //  place={a.data.place}
          //  startDate={a.data.startDate}
          //  userid={a.data.userid}
          //  id ={a.id}
    )}
  </View >
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  stretch: {
    width: 100,
    height: 100,
    resizeMode: 'stretch',
  },
  text:{

  }
});