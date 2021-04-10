import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from './Components/Auth/Signup';
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import Mainscreen from './Components/main'
import { LogBox } from 'react-native';
import * as firebase from 'firebase'
LogBox.ignoreLogs(['Setting a timer for a long period of time'])
import { Provider } from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './Redux/reducers'
import thunk from 'redux-thunk'
import savescreen from "./Components/main/save"
import addScreen from './Components/main/write'

const store  = createStore(rootReducer, applyMiddleware(thunk));

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
        <View style={{ flex:1, justifyContent: 'center', backgroundColor:'rgba(52, 52, 52, 0.3)' }}>
          <Text></Text>
        </View>
      );
    }
    if(!loggedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName = "Signup">
            <Stack.Screen name="SignUp" component={Signup} options={{headerShown: false}}/>  
            <Stack.Screen name="Register" component={Register} /> 
            <Stack.Screen name="Login" component={Login}/>  
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName = "Main">
            <Stack.Screen name="Main" component={Mainscreen} options={{headerShown: false}}/> 
            <Stack.Screen name="write" component={addScreen} options={{headerShown: false}}/>  
            <Stack.Screen name="save" component={savescreen} options={{headerShown: false}}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      
    );
  }
}

export default App;

