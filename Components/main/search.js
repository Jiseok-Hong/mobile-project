import React, { useState }  from 'react'
import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity } from 'react-native';

import firebase from 'firebase';
require('firebase/firestore');

export default function search(props) {
    const [users, setUsers] = useState([])

    const fetchUsers = (username) => {
        firebase.firestore()
            .collection('users')
            .where('name', '>=', username)
            .get()
            .then((snapshot) => {
                let searchResult = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                }); 
                setUsers(searchResult);
                console.log("user search list:", searchResult);
            })
    }
    return (
        <View>
            <TextInput
                placeholder="Type Here..."
                onChangeText={(username) => fetchUsers(username)} />

            <FlatList
                numColumns={1}
                horizontal={false}
                data={users}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate("profile", {uid: item.id})}>
                        <Text>{item.name}</Text>
                    </TouchableOpacity>

                )}
            />
        </View>
    )
}

