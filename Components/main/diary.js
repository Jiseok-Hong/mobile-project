import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Button, FlatList,TouchableOpacity, Image, KeyboardAvoidingView,TouchableWithoutFeedback } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// import Timeline from 'react-native-timeline-flatlist'
// import Timeline from 'react-native-timeline-flatlist'

// import Timeline from "react-native-beautiful-timeline";
// import Timeline from 'react-native-timeline-feed';
// import { Preset } from 'react-native-timeline-feed/lib/Types';






// From Search.jss
import firebase from 'firebase';
require('firebase/firestore');

export default function diary(props) {
    const [searchQuery, setSearchQuery] = React.useState('');
    // const onChangeSearch = query => setSearchQuery(query);

    // ! FROM profile.js
    const [userPosts, setUserPosts] = useState([])
    const [user, setUser] = useState(null)
    const [uid, setuid] = useState(null) 

    useEffect(() => {
        const {currentUser, posts} = props;

        if(uid != null){
            console.log("uid:",uid);
            firebase.firestore()
                .collection("users")
                .doc(uid)
                .get()
                .then((snapshot) => {
                    if(snapshot.exists){
                        setUser(snapshot.data());
                    }else{
                        console.log('does not exist')
                    }
                })

            console.log("uid 2:",uid);
            

            firebase.firestore()
                .collection("posts")
                .doc(uid)
                .collection("userPosts")
                .orderBy("creation", "asc")
                .get()
                .then((snapshot) => {
                    let posts = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return {id, ...data}
                    })
                    setUserPosts(posts);
                    // console.log("conse");
                    console.log(posts);
                    console.log(user);
                })
        } else {
            console.log("null for uid");
        }
        
    }, [uid])
    
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
                                onPress={() => setuid(item.id)}>
                                <Text>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                <View style={styles.containerGallery}>
                    <Text style={{fontSize: 35, fontWeight: 'bold', color: '#abcfe4', margin: 20, textAlign: 'center'}}>Your Journey</Text>
                    <FlatList
                        numColumns={2}
                        horizontal={true}
                        data={userPosts}
                        renderItem={({ item }) => (
                            <View
                                style={styles.containerImage}>
                                {/* <Text style={{fontSize: 20}}>{item.downloadURL}</Text> */}

                                <Image
                                    style={styles.image}
                                    source={{ uri: item.downloadURL }}
                                />
                                
                            </View>
                        )}/>
                </View>
            </View>

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

// const mapStateToProps = (store) => ({
//     currentUser: store.userState.currentUser,
//     posts: store.userState.posts,
// });

// export default connect(mapStateToProps, null)(profile);