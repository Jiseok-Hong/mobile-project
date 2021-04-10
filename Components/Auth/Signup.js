import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity} from 'react-native';

export default function Signup({ navigation }){
    return(
        <View style={{flex:1, justifyContent: 'center', alignItems:'center', backgroundColor: '#b0e0e6'}}>
            <View style={{flex:8, justifyContent: 'flex-end', alignItems: 'center'}}><Text style={styles.title}>Q-Story</Text></View>
            <View style={styles.register}>
                <TouchableOpacity style={styles.button} title="Register" onPress={() => navigation.navigate("Register")}>
                  <Text style={{color: "#fff",  fontSize: 20}}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}  title="LogIn" onPress={() => navigation.navigate("Login")}>
                 <Text style={{color: "#fff", fontSize: 20}}>Log In</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.login}>
            </View>
            
        </View>
    )
}


const styles = StyleSheet.create({
  title:{
    color: '#202524',
    fontSize: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  register:{
    flex:4,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 300,
  },
  login:{
    flex:6
  },
  button: {
    marginTop: '20%',
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#5078C8",
    padding: 15,
    width: 250,
    borderRadius: 20,
  },
});