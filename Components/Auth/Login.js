import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, View, Button,TouchableOpacity, Text, TextInput } from 'react-native';
import firebase from 'firebase';
import { set } from 'react-native-reanimated';

export class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
        }
        this.onSignUp = this.onSignUp.bind(this)
    };

    onSignUp(){
        const {email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {console.log(result)})
        .catch((error) => {console.log(error)})
    }


    render(){
        return(
            <View style={{flex:1,justifyContent: 'center', alignItems:'center',backgroundColor: '#b0e0e6'}}>
                <View style={{width: 300, height: 200, justifyContent: 'space-between', alignItems: 'center'}}>
                    <View style={{width: 300, height: 100, justifyContent: 'space-between',}}>
                        <TextInput style={styles.name} placeholder="email" onChangeText={(email) => this.setState({email})}/>
                        <TextInput style={styles.password} placeholder="password"
                                secureTextEntry={true}
                                onChangeText={(password) => this.setState({password})}/>
                    </View>
                    <TouchableOpacity style={styles.button} title="SignIn" onPress={() => this.onSignUp()}>
                        <Text style={{color: "#fff"}}>Log In</Text>
                    </TouchableOpacity>
                    <Text style={styles.text}>Already Have an Account? SIGN IN</Text>
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    name:{
        padding: 10,
        backgroundColor: '#f3f9f8',
        borderRadius: 20,
        marginVertical: '3%'
    },
    password:{
        padding: 10,
        backgroundColor: '#f3f9f8',
        borderRadius: 20,
        marginTop: '3%',
        marginBottom: 30
    },
    text:{
        marginTop: '7%',
        fontWeight: "bold",
        fontSize: 15,
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

export default Login;