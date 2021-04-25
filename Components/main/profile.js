import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import { Searchbar, Avatar, Button, Card, Title, Paragraph  } from 'react-native-paper';
import firebase from 'firebase'
require('firebase/firestore')
import {connect} from "react-redux"

function profile(props) {
    const [userPosts, setUserPosts] = useState([])
    const [user, setUser] = useState(null)

    useEffect(() => {
        const {currentUser, posts} = props;

        if(props.route.params.uid === firebase.auth().currentUser.uid){
            setUser(currentUser)
            setUserPosts(posts)      
            // console.log(userPosts);

        } else {
            firebase.firestore()
                .collection("users")
                .doc(props.route.params.uid)
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
                .doc(props.route.params.uid)
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
        }
        
    }, [props.route.params.uid])

    const onLogout = () => {
        firebase.auth().signOut();
    }

    const timestampToTime = (timestampObj) => {
        // console.log('timestampToTime()')
        // console.log("isFeed:",isFeed)
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

    if (user === null) {
        return <View />
    }
    console.log(userPosts);

    // {console.log(userPosts)}
    return (
        <View style={styles.container}>
            <View style={styles.containerInfo}>
                <Text style={{fontSize: 32}}>Hello, 
                    <Text style={{fontSize: 35, fontWeight: 'bold', color: '#b0e0e6'}}> {user.name} !</Text>
                </Text>
            </View>
            <View style={styles.containerGallery}>
                <Text style={{fontSize: 28, fontWeight: 'bold', color: '#abcfe4', margin: 20, textAlign: 'center'}}>Your Journey</Text>
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={userPosts}
                    renderItem={({ item }) => (
                        // <View
                        //     style={styles.containerImage}>
                        //     <Image
                        //         style={styles.image}
                        //         source={{ uri: item.downloadURL }}
                        //     />
                        // </View> 
                        // <View>
                            <Card style={styles.card}>
                            {/* <Card.Title title={defaultFeedUsers[i].name} subtitle={timestampToTime(u.creation)} /> */}
                                <Card.Cover style={styles.image} source={{ uri: item.downloadURL }} />
                                {/* <Card.Title title={defaultFeedUsers[i].name} subtitle={timestampToTime(item.creation)} /> */}
                                <Card.Content style={styles.cardContent}>
                                    <Paragraph style={styles.cardText}>{item.caption}</Paragraph>
                                    <View style={{borderRadius:30, backgroundColor:'#b2dad1', paddingHorizontal:"3%",paddingVertical:"1%",marginTop:6, }}>
                                        <Text>
                                            <Text style={styles.cardDate}>{timestampToTime(item.creation)}</Text>
                                        </Text>
                                    </View>
                                </Card.Content>
                                {/* <Card.Actions>
                                    <Button>Like</Button>
                                    <Button>Dislike</Button>
                                </Card.Actions> */}
                            </Card>
                        // {/* </View> */}
                            
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
        // flexDirection: 'horizontal',
        padding: '4%',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff'
        
    },
    containerInfo: {
        margin: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '5%',
    },
    containerGallery: {
        width: '100%',
        backgroundColor: '#e6f3f0',
        padding: '3%',
        margin: 5,
        borderRadius: 20,
        marginBottom: 170
    },
    containerImage: {
        // flex: 1/2,
        
    },
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

        flexDirection:'row',
    },
    cardDate:{
        margin:'auto',
        padding:'auto',
        color:"#FFF", 
    },
    image: {
        flex: 1,
        height:'1%',
        aspectRatio: 1/1,
        marginTop: 10,
        marginLeft: "auto",
        // marginLeft: "auto",
        marginRight: "auto",
        transform: ([{ scale: '0.9' }]),      

    },
    buttonContainer: {
        // alignItems: "center",
        // justifyContent: 'flex-end',
    },
    button: {
        alignItems: "center",
        justifyContent: 'flex-end',
        backgroundColor: "#5078C8",
        padding: 5,
        width: 250,
        borderRadius: 20,
      },
      cardText: {
        fontSize: 14,
        fontWeight: "400"
    },
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts,
});

export default connect(mapStateToProps, null)(profile);