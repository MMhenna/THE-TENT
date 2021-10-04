import { StatusBar } from 'expo-status-bar';
import React from 'react';

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

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initiaRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
