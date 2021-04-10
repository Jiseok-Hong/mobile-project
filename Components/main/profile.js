import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import firebase from 'firebase'
require('firebase/firestore')
import {connect} from "react-redux"

function profile(props) {
    const {currentUser, posts} = props;

    const onLogout = () => {
        firebase.auth().signOut();
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerInfo}>
                <Text  style={{fontSize: 32}}>Hello, 
                    <Text style={{fontSize: 35, fontWeight: 'bold', color: '#b0e0e6'}}> {currentUser.name} !</Text>
                </Text>
            </View>
            <View style={styles.containerGallery}>
                <Text style={{fontSize: 35, fontWeight: 'bold', color: '#abcfe4', margin: 20, textAlign: 'center'}}>Your Journey</Text>
                <FlatList
                    numColumns={3}
                    horizontal={false}
                    data={posts}
                    renderItem={({ item }) => (
                        <View
                            style={styles.containerImage}>
                            <Image
                                style={styles.image}
                                source={{ uri: item.downloadURL }}
                            />
                        </View>
                    )}/>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} title="Log Out" onPress={()=> onLogout()} >
                    <Text style={{color: "#fff",  fontSize: 20}}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '10%',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff'
        
    },
    containerInfo: {
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20%',
    },
    containerGallery: {
        width: '100%',
        backgroundColor: '#e6f3f0',
        padding: '5%',
        margin: 10,
        borderRadius: 20,
        
    },
    containerImage: {
        flex: 1/2,


    },
    image: {
        flex: 1,
        aspectRatio: 1/1,
        margin: 2,
    },
    buttonContainer: {
        alignItems: "center",
        justifyContent: 'flex-end',
    },
    button: {
        alignItems: "center",
        justifyContent: 'flex-end',
        backgroundColor: "#5078C8",
        padding: 15,
        width: 250,
        borderRadius: 20,
      },
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts,
});

export default connect(mapStateToProps, null)(profile);