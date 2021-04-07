import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';
import { set } from 'react-native-reanimated';


export class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp(){
        const {email, password, name} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            firebase.firestore().collection("users")
            .doc(firebase.auth().currentUser.uid)
            .set({
                name,
                email
            })
            
        })
        .catch((error) => {})
    }


    render(){
        return(
            <View style={{flex:1,justifyContent: 'center', alignItems:'center',backgroundColor: '#b0e0e6'}}>
                <View style={{width: 300, height: 300, justifyContent: 'space-between', alignItems: 'center'}}>
                    <View style={{width: 300, height: 200, justifyContent: 'space-between'}}>
                        <TextInput style={styles.name} placeholder="name" onChangeText={(name) => this.setState({name})}/>
                        <TextInput style={styles.name}placeholder="email" onChangeText={(email) => this.setState({email})}/>
                        <TextInput style={styles.password} placeholder="password"
                                secureTextEntry={true}
                                onChangeText={(password) => this.setState({password})}/>
                        
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => this.onSignUp()}
                                title="Sign Up"
                    ><Text style={{color: "#fff"}}>Register</Text>
                    </TouchableOpacity>
                    <Text style={styles.text}>Don't Have an Account? SIGN UP</Text>
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

    },
    text:{
        marginTop: '7%',
        fontWeight: "bold",
        fontSize: 15,
    },
    button: {
        marginTop: '10%',
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#5078C8",
        padding: 15,
        width: 250,
        borderRadius: 20,
      },
  });

export default Register;