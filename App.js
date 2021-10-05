import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';

import { View, Text } from 'react-native'

import firebase from 'firebase';


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

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register';

const Stack = createStackNavigator;

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Loading</Text>
        </View>
      )
    }
    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initiaRouteName="Landing">

            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} />

          </Stack.Navigator>
        </NavigationContainer>

      );
    }

    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>user login</Text>
      </View>
    )
  }
}

export default App
