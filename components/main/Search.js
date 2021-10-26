import React, { useState } from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native'

import firebase from 'firebase';
require( 'firebase/firestore' )

export default function Search(props) {
	const [users, setUsers] = useState([])


	const fetchUser = (search) => {
		firebase.firestore()
		.collection('users')
		.where('name', '>=', search)
		.get()
		.then((snapshot) => {
			let queryResult = snapshot.docs.map(doc => {
				const data = doc.data();
				const id = doc.id;
				return{id, ...data }
			    });
			    setUsers(queryResult);
		})
	}
    return (
        <View>
            <TextInput
			placeholder="type here ..."
			onChangeText={(search) => fetchUser(search)}/>

			<FlatList
				numColumns={1}
				horizontal={false}
				data={users}
				renderItem={({item}) => (
					<TouchableOpacity
						onPress={() => props.navigation.navigate("Profile", {id: item.id})}>
						<Text>{item.name}</Text>
					</TouchableOpacity>
				)}
	    />
        </View>
    )
}
