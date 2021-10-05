import { StatusBar } from 'expo-status-bar';
import React, {component} from 'react';

import { View, Text } from 'react-native'

import firebase from 'firebase';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const firebaseConfig = {

  apiKey: "AIzaSyD1a0YdjrIndEIMKuAdBlQy6itaMYuJGWE",

  authDomain: "the-tent-5a04f.firebaseapp.com",

  projectId: "the-tent-5a04f",

  storageBucket: "the-tent-5a04f.appspot.com",

  messagingSenderId: "598600014797",

  appId: "1:598600014797:web:c5fc05ee5108901468c284",

  measurementId: "G-BSBGDCLC8Z"

};


if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register';

import { PureComponent } from 'react'

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }
    componentDidMount(){
      firebase.auth().onAuthsStateChange((user) => {
        if(!user){
          this.setState({
            loggedIn: false,
            loaded: true,
          })
        }else{
          this.setState({
            loggedIn: true,
            loaded: true,
          })
        }
      })
    }
  
  render(){
    const { loggedIn, loaded } = this.state;
    if(!loaded){
      return(
        <View style ={{ flex: 1, justifyContent: 'center'}}>
          <Text>Loading</Text>
        </View>
      )
    }
    return (
      <NavigationContainer>
      <Stack.Navigator initiaRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} />

      </Stack.Navigator>
    </NavigationContainer>

    )
  }
}

export default App
  