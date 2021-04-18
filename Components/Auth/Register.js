import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import {Button, Pressable, StyleSheet, Modal, View, Text, TouchableOpacity, TextInput } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';
import { set } from 'react-native-reanimated';
// import Modal from 'react-native-modal';



export class Register extends Component{
    // state = {
    //   };

    setModalVisible = (visible) => {
        this.setState({ modalVisible: !this.state.modalVisible });
    }

    setModalText = (text) => {
        this.setState({ modalText: text});
    }

    settoggleModal = (visible) => {
        this.setState({ modalVisible: !visible });
    };

    triggerModal = () => {
        this.setState({modalVisible: !this.state.modalVisible});
    }
    
    
    constructor(props){
        super(props);
        this.state = {
            email: '',  
            password: '',
            name: '',
            modalVisible: false,
            modalText: ''
        }

        this.onSignUp = this.onSignUp.bind(this)
        console.log("modal visible before setVisible", this.state.modalVisible);

    }

    validate = (text) => {
        console.log("email:", text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
          console.log("Email is Not Correct");
          this.setState({ modalText:"Email is not valid" })
          return false;
        }
        else {
          this.setState({ email: text })
          console.log("Email is Correct");
          return true;
        }
      }
    
    onSignUp(){
        const {email, password, name, modalVisible} = this.state;
        // console.log("modal visible before setVisible",modalVisible);
        if (this.validate(email) == false) {
            this.setModalVisible(modalVisible);
            // console.log("Email is not valid:", email)
            return false;
        }
        if (password.length < 6) {
            // console.log("Please write password longer than 6 digits!");
            this.setModalVisible(modalVisible);
            this.setState({ modalText:"Password is not valid: Must be longer than 6 digits" })
            // console.log("modal visible before toggleModal",this.state.modalVisible);
            // throw console.error("adsf");
            return;
        }
        console.log("p length:",password.length);
        console.log("modal visible after setVisible",modalVisible);
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            firebase.firestore().collection("users")
            .doc(firebase.auth().currentUser.uid)
            .set({
                name,
                email,
                numPost:0
            })
            
        })
        .catch((error) => {})
        console.log("onSignup done");

    }


    render(){
        const { modalVisible, modalText } = this.state;
        // console.log("modal visible after render1", this.state.modalVisible);
        console.log("modal visible after render2", modalVisible);

        return(
            <View style={{flex:1,justifyContent: 'center', alignItems:'center',backgroundColor: '#b0e0e6'}}>
                <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible || false}
                // hidden={this.state.modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    this.setModalVisible(!modalVisible);
                }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                        <Text style={styles.modalText}>{modalText}</Text>
                        <Pressable
                            style={[styles.modalButton, styles.buttonClose]}
                            onPress={() => this.setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>👌</Text>
                        </Pressable>
                        </View>
                    </View>
                </Modal>
                {/* <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => this.setModalVisible(true)}
                    >
                    <Text style={styles.textStyle}>Show Modal</Text>
                </Pressable> */}

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

export default Register;