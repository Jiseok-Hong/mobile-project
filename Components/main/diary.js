import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList,TouchableOpacity, Image, KeyboardAvoidingView,TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
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
    const [defaultFeedUsers, setDefaultFeedUsers] = useState([]);
    const [defaultFeedPosts, setDefaultFeedPosts] = useState([]);
    // const onChangeSearch = query => setSearchQuery(query);
    

    // ! FROM profile.js
    const [userPosts, setUserPosts] = useState([])
    const [user, setUser] = useState(null)
    const [uid, setuid] = useState(null) 
    const [isFeed, setIsFeed] = useState(true)


    useEffect(() => {
        const result = firebase.firestore()
            .collection('users')
            .where('numPost', '>', 0)
            // .doc()
            .get()
            .then((snapshot) => {
                // snapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    // console.log(doc.id, " => ", doc.data());
                // });
                let searchResult = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                }); 
                // let searchResult = snapshot.docs.map(doc => { doc.id, ...doc.data()} )
                setIsFeed(true);
                setDefaultFeedUsers(searchResult);
                return searchResult;
            })
            // .then((searchResult) => {
            //     let posts = searchResult.map(u => {
            //         console.log("uid:",u.id);
            //         const post = firebase.firestore()
            //             .collection("posts")
            //             .doc(u.id)
            //             .collection("userPosts")
            //             .orderBy("creation", "desc")
            //             .limit(1)
            //             .get()
            //             .then((querySnapshot) => {
            //                 const queryDocumentSnapshot = querySnapshot.docs[0];
            //                 let post = {
            //                     caption: queryDocumentSnapshot.data().caption,
            //                     creation: queryDocumentSnapshot.data().creation,
            //                     image: queryDocumentSnapshot.data().downloadURL
            //                 }
            //                 return post
            //             })
            //             // console.log("$$$$$",post,"$$$$$");
            //             // console.log("&&&&&&&:",postResult);
            //         return post;
            //     });
            //     setDefaultFeedPosts(posts)
            //     return posts;
            // })
    },[])

    useEffect(() => {
        const returnpost = defaultFeedUsers.map((u, i) => {
            console.log("uid:",u.id);
            const posts = firebase.firestore()
                .collection("posts")
                .doc(u.id)
                .collection("userPosts")
                .orderBy("creation", "desc")
                .limit(1)
                .get()
                .then( async (querySnapshot) => {
                    const queryDocumentSnapshot = querySnapshot.docs[0];
                    // console.log("querySnapshot",queryDocumentSnapshot.id);
                    // console.log("querySnapshot",queryDocumentSnapshot.data());
                    // let post = {
                    //     caption: queryDocumentSnapshot.data().caption,
                    //     creation: queryDocumentSnapshot.data().creation,
                    //     image: queryDocumentSnapshot.data().downloadURL
                    // }
                    // setDefaultFeedPosts({ id, ...data })

                    return  { id, ...queryDocumentSnapshot.data() }
                })
                // console.log("$$$$$",posts,"$$$$$");
                // console.log("&&&&&&&:",postResult);
                // console.log("^^^^^^^^^^^^^^^^^^^^");
                // console.log(posts);
                return posts;
            });
        // console.log(returnpost);
        setDefaultFeedPosts(returnpost)
        
    },[defaultFeedUsers])
    

    // when uid is changed
    useEffect(() => {
        const {currentUser, posts, allUsers} = props;
        if(uid != null){
            console.log("original uid:",uid);
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

            // console.log("uid 2:",uid);

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
                    // console.log(posts);
                    // console.log(user);
                })
        } else {
            console.log("null for uid");
        }
        
    }, [uid])
    
    const fetchUsers = (username) => {
        // setIsFeed(false);

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
    const fetchUserLastPost = async (uid) => {
        // setIsFeed(false);

        firebase.firestore()
                .collection("posts")
                .doc(uid)
                .collection("userPosts")
                .orderBy("creation", "asc")
                .limit(1)
                .get()
                .then((querySnapshot) => {
                    if (!querySnapshot.empty) {
                        const queryDocumentSnapshot = querySnapshot.docs[0];
                    } else {
                        const queryDocumentSnapshot = 0;
                    }
                setSearchQuery(searchResult);
                })
    }

    async function getValues(userid) {
        let fetcehd = await firebase.firestore().collection('posts').doc(userid)
                .collection("userPosts").orderBy("creation", "asc").limit(1).get();

        for(const doc of fetcehd.docs){
            console.log(doc.id, '=>', doc.data());
            return doc.data().downloadURL;
            }
        // console.log('id::',fetcehd.id);
        // if (fetcehd.docs.exists){ console.log(fetcehd.docs.doc); return fetcehd.docs.data();}
        throw new Error("No such document");
        return fetcehd.docs.doc
    }

    const rse=getValues('r7B6G6YHtBMaQAd1BH585mfjN5l1');
    console.log(rse);

    // {console.log("&&&&fetch users:",defaultFeedUsers)}
    // {console.log("\n\n",defaultFeedPosts)}
    // {console.log("****",isFeed)}
    
    
    // setTimeout(()=>{console.log("&",defaultFeedPosts,"&")}, 2000);

    return (
        // <SafeAreaView style={{ flex: 1}}>
            <View>
                <Searchbar
                    placeholder="Search other user..."
                    onChangeText={(username) => fetchUsers(username)}
                    />
                {/* <ScrollView style={styles.scrollView}> */}
                <FlatList style={styles.FlatList}
                        numColumns={1}
                        horizontal={false}
                        data={searchQuery}
                        visible={isFeed}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.searchitem}
                            onPress={() => setuid(item.id)}>
                                <Text>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                        />
                <View style={{display: isFeed ? 'flex' : 'none'}}>
                        {
                            defaultFeedUsers.map((u, i) => {
                                // {console.log("&",defaultFeedPosts,"&")}
                                // {console.log("*",defaultFeedPosts.image,"*")}
                                {console.log("-----------------------------------")}
                                {console.log(u,i)}
                                return (
                                <Card key={i}>
                                    <Card.Title>{u.name}</Card.Title>
                                    <Card.Divider/>
                                    <View  style={styles.user}>
                                    <Image
                                        style={styles.image}
                                        resizeMode="cover"
                                        source={{ uri: getValues(u.id).urls }}
                                        />
                                    {/* <Text style={styles.name}>{defaultFeedPosts.item[i]}</Text> */}
                                    </View>
                                </Card>
                                );
                            })
                        }
                </View>

                {/* 
                // implemented without image without header, using ListItem component
                <Card containerStyle={{padding: 0}} >
                {
                    users.map((u, i) => <ListItem key={i} />)
                }
                </Card> */}
                <ScrollView style={styles.containerGallery} style={{display: isFeed ? 'none' : 'flex'}}>
                    <Text style={{fontSize: 35, fontWeight: 'bold', color: '#abcfe4', margin: 20, textAlign: 'center'}}>Your Journey</Text>
                    <FlatList
                        // numColumns={2}
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
                </ScrollView>
                {/* </ScrollView> */}
            </View>


    )
}

const styles = StyleSheet.create({
    scrollView: {
        // backgroundColor: 'pink',
        // marginHorizontal: 20,
        flex:8
      },
    
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