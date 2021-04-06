import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Signup({ navigation }){
    return(
        <View style={{flex:1, justifyContent: 'center'}}>
            <Button style={{}} title="Register" onPress={() => navigation.navigate("Register")}/>
            <Button style={styles.login} title="LogIn" onPress={() => navigation.navigate("LogIn")}/>
        </View>
    )
}


const styles = StyleSheet.create({
  register: {
    flex: 1,
    padding: 20,
  },
  login:{
    flex: 1,
    padding: 20,
  }
  
});