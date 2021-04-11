import React from 'react'
import { StyleSheet, Text, View, Button, FlatList,TouchableOpacity } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


// From Search.jss
import firebase from 'firebase';
require('firebase/firestore');

export default function diary(props) {
    const [searchQuery, setSearchQuery] = React.useState('');
    // const onChangeSearch = query => setSearchQuery(query);
    
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
                setSearchQuery(searchResult);
            })
    }


    return (
        // <SafeAreaView style={{ flex: 1}}>
            <View>
            <Searchbar
                placeholder="Search other user..."
                onChangeText={(username) => fetchUsers(username)}
            />
            <FlatList style={styles.FlatList}
                    numColumns={1}
                    horizontal={false}
                    data={searchQuery}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.searchitem}
                            onPress={() => props.navigation.navigate("profile", {uid: item.id})}>
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />
                <Text>Diary</Text>
            </View>
        // </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    searchitem: {
        // flex: 1,
        padding: '3%',
        // justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: '#c0c0c3',
        marginBottom: '0.2%',
    },
    FlatList: {
        // margin: 20,
        // borderWidth: 0.1,
        // borderColor: 'red',
        // justifyContent: 'center',
        // alignItems: 'center',
        // marginBottom: '20%',
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