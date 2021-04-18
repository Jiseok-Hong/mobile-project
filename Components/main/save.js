import React, { useState } from 'react'
import { View, TextInput, Image, Text,TouchableOpacity, StyleSheet, KeyboardAvoidingView,TouchableWithoutFeedback, Button, Keyboard } from 'react-native'

import firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native'
require("firebase/firestore")
require("firebase/firebase-storage")


export default function Save(props) {
    const [caption, setCaption] = useState("")

    const uploadImage = async () => {
        const uri = props.route.params.image;
        const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;

        const response = await fetch(uri);
        const blob = await response.blob();

        const task = firebase
            .storage()
            .ref()
            .child(childPath)
            .put(blob);

        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                savePostData(snapshot);
            })
        }

        const taskError = snapshot => {
            console.log(snapshot)
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted);
    }

    const savePostData = (downloadURL) => {

        // const increment = firebase.firestore.FieldValue.increment(1);


        // const currentNumPost = firebase.firestore()
        // .collection('users')
        // .doc(firebase.auth().currentUser.uid)
        // .get({numPost});

        // console.log(currentNumPost);

        // firebase.firestore()
        // .collection('users')
        // .doc(firebase.auth().currentUser.uid)
        // .update({numPost:currentNumPost+1});

        firebase.firestore()
            .collection('posts')
            .doc(firebase.auth().currentUser.uid)
            .collection("userPosts")
            .add({
                downloadURL,
                caption,
                likesCount: 0,
                creation: firebase.firestore.FieldValue.serverTimestamp()
            }).then((function () {
                props.navigation.popToTop()
            }))
    }
    return (
        <KeyboardAvoidingView style={{flex: 1}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#b0e0e6' }}>
                    {/* <Image source={{ uri: props.route.params.image }} /> */}
                    <Text style={{color: "#fff",  fontSize: 23, paddingVertical: 30, paddingTop:50}}>✏ In 200 words</Text>
                    <TextInput style={styles.inputs}
                        placeholder="Write your thought..."
                        multiline={true}
                        onChangeText={(caption) => setCaption(caption)}
                        />
                    <TouchableOpacity style={styles.button} title="Save" onPress={() => uploadImage()}>
                        <Text style={{color: "#fff",  fontSize: 20}}>Upload</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    inputs:{
        marginVertical: 20,
        backgroundColor: '#fff',
        width: '75%',
        height: '40%',
        borderRadius: 20,
        fontSize: 15,
        paddingHorizontal: 10,
        paddingVertical: 20,
        lineHeight: 23,
        textAlignVertical: 'top'
    },
    button: {
        marginVertical: 30,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#5078C8",
        padding: 15,
        width: 250,
        borderRadius: 20,
    },
  });