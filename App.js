import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from './Components/Auth/Signup';
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';

import * as firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyCySSFdyaPa3sAMQwW7mrAVhyeAUqi6BXo",
  authDomain: "mobileproject-22517.firebaseapp.com",
  projectId: "mobileproject-22517",
  storageBucket: "mobileproject-22517.appspot.com",
  messagingSenderId: "377104282988",
  appId: "1:377104282988:web:9b606443d671bf2e4def49",
  measurementId: "G-JYG28G6W9Y"
};

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
      
    }
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
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
    const {loaded, loggedIn} = this.state;
    if(!loaded){
      return(
        <View style={{ flex:1, justifyContent: 'center' }}>
          <Text>Loading</Text>
        </View>
      );
    }
    if(!loggedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName = "Signup">
            <Stack.Screen name="Signup" component={Signup} option={{headerShown: false}}/>  
            <Stack.Screen name="Register" component={Register}/> 
            <Stack.Screen name="Login" component={Login}/>  
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return(
      <View style={{ flex:1, justifyContent: 'center' }}>
          <Text>Hello User</Text>
        </View>
    );
  }
}

export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   header:{
//     color: "white",
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     paddingBottom: 12,
//     marginBottom:10,
//     backgroundColor: '#8FDCA9',
//   },
//   section:{
//     flex: 12,
//     backgroundColor: '#fff',
//   },
//   headerText:{
//     color: "white",
//     fontWeight: 'bold',
//     fontSize : 15,
//   }
// });
