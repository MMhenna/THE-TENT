import React, { useState, useEffect }from 'react'
import { StyleSheet, View, Text, Image , FlatList, Button } from 'react-native'

import firebase  from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux'

function Profile(props) {
    const [userPosts, setUserPosts] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const { currentUser, posts} = props;
        console.log({currentUser, posts})

        if(props.route.params.uid === firebase.auth().currentUser.uid){
            setUser(currentUser)
            setUserPosts(posts)
        }
        else{
            firebase.firestore()
                .collection("users")
                .doc(props.route.params.uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        setUser(snapshot.data());
                    }
                    else {
                        console.log('does not exist')
                    }
                })
            firebase.firestore()
                .collection("posts")
                .doc(props.route.params.uid)
                .collection("userPosts")
                .orderBy("creation", "asc")
                .get()
                .then((snapshot) => {
                    let posts = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return{id, ...data }
                    })
                    setUserPosts(posts)
                })
        }
    }, [props.route.params.uid])

    const onLogout = () => {
        firebase.auth().signOut();
    }

    if(user === null){
        return <Text>Please Login First</Text>
    }
    return (
        <View styles={styles.container}>
            <View styles={styles.containerInfo}> 
                <Text>{user.name}</Text>
                <Text>{user.email}</Text>
                <Button
                    title="Logout"
                    onPress={() => onLogout()}
                    />
            </View>

            <View styles={styles.containerGallery}>
                <FlatList
                    numColumns={3}
                    horizontal={false}
                    data={userPosts}
                    renderItem={({item}) => (
                        <View>
                            style={styles.containerImage}

                            <image
                                style={styles.image}
                                source={{uri: item.downloadedUrl}}
                            />
                        </View>
                    )}
                />

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40
    },
    containerInfo: {
        margin: 20
    },
    containerGallery:{
        flex: 1
    },
    containerImage: {
        flex: 1/3
    },
    image: {
        flex: 1,
        aspectRatio: 1 / 1
    }
})
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts
})

export default connect(mapStateToProps, null)(Profile);