import React, {useState, useEffect} from 'react'
import { Keyboard,StyleSheet, Text, View, FlatList,TouchableOpacity, Image, KeyboardAvoidingView,TouchableWithoutFeedback, ScrollView } from 'react-native';
import { dCard, ListItem, dButton, Icon } from 'react-native-elements'
import { Searchbar, Avatar, Button, Card, Title, Paragraph  } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


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
    const [isSearching, setIsSearching] = useState(false)


    async function fetchPosts() {
        console.log("fetchPosts")
        response = await firebase.firestore().collection('posts').doc(userid)
        .collection("userPosts").orderBy("creation", "asc").limit(1).get().docs[0].data();

        return response;
    }

    async function fetchUserPosts() {
        console.log("fetchUserPosts")

        const feedPosts = await Promise.all(defaultFeedUsers.map((u, i) => {
            const posts = firebase.firestore()
                   .collection("posts")
                   .doc(u.id)
                   .collection("userPosts")
                   .orderBy("creation", "desc")
                   .limit(1)
                   .get()
                   .then((querySnapshot) => {
                       const queryDocumentSnapshot = querySnapshot.docs[0];
                       // console.log("querySnapshot",queryDocumentSnapshot.id);
                       // console.log("querySnapshot",queryDocumentSnapshot.data());
                       // let post = {
                       //     caption: queryDocumentSnapshot.data().caption,
                       //     creation: queryDocumentSnapshot.data().creation,
                       //     image: queryDocumentSnapshot.data().downloadURL
                       // }
                       // setDefaultFeedPosts({ id, ...data })
                       return { id, ...queryDocumentSnapshot.data() };
                   });
            return posts;
        }));
        console.log(feedPosts);
        setDefaultFeedPosts(feedPosts);
        // return feedPosts;
    }

    async function fetchUserData() {
        const result = await firebase.firestore()
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
            // setIsFeed(true);
            setDefaultFeedUsers(searchResult);

            // return searchResult;
            return
        });
    }

    // fetch users information who has more than 1 posts, then store their id&data in defaultFeedUsers
    useEffect(() => {
        console.log("UseEffect[]")
        console.log('\n===================================================\nstart\n===================================================\n')
        try {
            const userSearchResult = fetchUserData();
        } catch (e) {
            console.error(e);
        }
        // setDefaultFeedUsers(userSearchResult);
    },[])

    async function fetchUploadedUsers() {
        console.log("fetchUploadedUsers")

        const uploadedUsers = await Promise.all(defaultFeedUsers.map((u, i) => {
            const posts = firebase.firestore()
                   .collection("posts")
                   .doc(u.id)
                   .collection("userPosts")
                   .orderBy("creation", "desc")
                   .limit(1)
                   .get()
                   .then((querySnapshot) => {
                       const queryDocumentSnapshot = querySnapshot.docs[0];
                       // console.log("querySnapshot",queryDocumentSnapshot.id);
                       // console.log("querySnapshot",queryDocumentSnapshot.data());
                       // let post = {
                       //     caption: queryDocumentSnapshot.data().caption,
                       //     creation: queryDocumentSnapshot.data().creation,
                       //     image: queryDocumentSnapshot.data().downloadURL
                       // }
                       // setDefaultFeedPosts({ id, ...data })
                       return { id, ...queryDocumentSnapshot.data() };
                   });
            return posts;
        }));
        console.log(feedPosts);
        setDefaultFeedPosts(feedPosts);
        // return feedPosts;
    }

    // fetch users information who has more than 1 posts, then store their id&data in defaultFeedUsers
    useEffect(() => {
        console.log();

        async function fetchUserData() {
            const result = await firebase.firestore()
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
                // setIsFeed(true);
                setDefaultFeedUsers(searchResult);

                return searchResult;
            });
        }
        console.log('\n===================================================\nstart\n===================================================\n')
        try {
            const userSearchResult = fetchUserData();
        } catch (e) {
            console.error(e);
        }
        // setDefaultFeedUsers(userSearchResult);
    },[])

    useEffect( () => {
        console.log("-----------------------------------\ndefaultFeedUsers changed\n-----------------------------------\n")
        try {
            const feedPosts = fetchUserPosts();
            console.log(feedPosts);
        } catch (e) {
            console.error(e);
        }
    },[defaultFeedUsers])

    useEffect(() => {
        console.log("-----------------------------------\ndefaultFeedPosts changed\n-----------------------------------\n")
        console.log("defaultFeedPosts:",defaultFeedPosts)
        console.log("defaultFeedUser:",defaultFeedUsers)

    },[defaultFeedPosts])
    

    // when uid is changed
    useEffect(() => {
        console.log("-----------------------------------\nuseEffect - [uid]\n-----------------------------------\n")
        // console.log("UseEffect[uid]")
        setIsSearching('false')
        setIsFeed('false')
        console.log("isFeed:",isFeed)
        // console.log("useEffect - [uid]")
        const {currentUser, posts, allUsers} = props;
        if(uid != null){
            // console.log("original uid:",uid);
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
        console.log('getValues()')
        let fetched = await firebase.firestore().collection('posts').doc(userid)
                .collection("userPosts").orderBy("creation", "asc").limit(1).get();

        // console.log("-----------------------------------\ngetValues-fetched\n-----------------------------------\n")
        // console.log(fetched.docs[0].id, '=>', fetched.docs[0].data());
        return fetched.docs[0].id
    }

    const timestampToTime = (timestampObj) => {
        console.log('timestampToTime()')
        console.log("isFeed:",isFeed)
        // Date javaDate = firebaseTimestampObject.toDate();
        let second = timestampObj.seconds;
        // let timestamp = '1452488445471';
        let newDate = new Date(second * 1000)
        let Hours = newDate.getHours()
        let Month = newDate.getMonth()
        let Day = newDate.getDate()
        let Minutes = newDate.getMinutes()
        const HourComplete = Month + '/' + Day + ' ' + Hours + ':' + Minutes
        let formatedTime = HourComplete
        // console.log(formatedTime)
        return formatedTime

    }
    // console.log("-----------------------------------\nLength\n-----------------------------------\n")
    // console.log("defaultFeedPosts",defaultFeedPosts.length)
    // console.log("defaultFeedUser:",defaultFeedUsers.length)
    // setTimeout(()=>{console.log("&",defaultFeedPosts,"&")}, 2000);

    return (
        // <SafeAreaView style={{ flex: 1}}>
            <View style={{}}>
                <View style={{ flexDirection: "row", width:"100%"}}>
                    <Searchbar
                        placeholder="Search other user..."
                        onChangeText={(username) => {fetchUsers(username),setIsSearching(true)}}
                        style={{width:"90%"}}
                        />
                    {/* <TouchableOpacity>
                    </TouchableOpacity> */}

                    <Button icon="cancel" mode="contained" onPress={() => {setIsSearching(false); setSearchQuery(''); Keyboard.dismiss()}}>
                    </Button>
                </View>
                {/* <ScrollView style={styles.scrollView}> */}
                <FlatList style={styles.FlatList}
                        style={{display: isSearching ? 'flex' : 'none'}}
                        numColumns={1}
                        horizontal={false}
                        data={searchQuery}
                        // visible={isSearching}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.searchitem}
                            onPress={() => {setuid(item.id); setIsFeed(false); setIsSearching(false)}}>
                                <Text>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                        />
                <View style={{display: isFeed ? 'flex' : 'none'}}>
                    <View style={styles.FlatList} >
                        <FlatList
                            numColumns={1}
                            horizontal={false}
                            data={defaultFeedPosts}
                            renderItem={({ item, index}) => (
                                    <Card key={index} style={styles.card}>
                                        <Card.Title title={defaultFeedUsers[index].name}>{defaultFeedUsers[index].name}</Card.Title>
                                        <Card.Cover style={styles.image} source={{ uri: item.downloadURL }} />
                                        <Card.Content style={styles.cardContent}>
                                            {/* <Card.Title title={item.name}/> */}
                                            <Paragraph style={styles.cardText}>{item.caption}</Paragraph>
                                            {/* <Text>{"\n"}</Text> */}
                                            <View style={{borderRadius:30, backgroundColor:'#b2dad1', paddingHorizontal:"4%",paddingVertical:"1%", }}>
                                                <Text>
                                                    <Text style={styles.cardDate}>{timestampToTime(item.creation)}</Text>
                                                </Text>
                                            </View>
                                        </Card.Content>
                                    </Card>
                                // {/* </View> */}
                            )}/>
                    
                    </View>
                </View>


            
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
    card: {
        margin: 10,
        borderRadius: 5,
        // justifyContent: 'center',
        justifyContent: 'space-between',
        // alignItems: 'center',
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,

    },
    cardContent: {
        // transform: ([{ scale: '0.9' }]),     
        marginLeft: 5,
        marginRight: 5,
        flex: 1,
        flexWrap:'wrap',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection:'column',
    },
    cardDate:{
        margin:'auto',
        padding:'auto',
        color:"#FFF", 
    },
    image: {
        // flex: 1,
        // height:'1%',
        // aspectRatio: 1/1,
        // marginTop: 10,
        // marginLeft: "auto",
        // // marginLeft: "auto",
        // marginRight: "auto",
        // transform: ([{ scale: '0.9' }]),      

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
        marginBottom: 100,
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
    cardDate:{
        margin:'auto',
        padding:'auto',
        color:"#FFF", 
    },
    cardText: {
        fontSize: 14,
        fontWeight: "400",
        marginBottom: "3%",
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