import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import {Pressable,Modal, StyleSheet, View, Button,TouchableOpacity, Text, TextInput } from 'react-native';
import firebase from 'firebase';
import { set } from 'react-native-reanimated';

export class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            modalVisible: false
        }
        this.onSignUp = this.onSignUp.bind(this)
    };

    setModalVisible = (visible) => {
        this.setState({ modalVisible: !this.state.modalVisible });
    }

    onSignUp(){
        const {email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {console.log(result)})
        .catch((error) => {
            console.log(error);
            this.setModalVisible(this.state.modalVisible)
        })
    }


    render(){
        return(
            <View style={{flex:1,justifyContent: 'center', alignItems:'center',backgroundColor: '#b0e0e6'}}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible || false}
                    // hidden={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        this.setModalVisible(!this.state.modalVisible);
                    }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                            <Text style={styles.modalText}>Please write valid user information</Text>
                            <Pressable
                                style={[styles.modalButton, styles.buttonClose]}
                                onPress={() => this.setModalVisible(!this.state.modalVisible)}
                            >
                                <Text style={styles.textStyle}>👌</Text>
                            </Pressable>
                            </View>
                        </View>
                </Modal>
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
      centeredView: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
  });

export default Login;