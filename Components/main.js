import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUser, fetchUserPosts, clearData} from '../Redux/actions/index'
import FeedScreen from './main/diary'

import profileScreen from './main/profile'
import { event } from 'react-native-reanimated';

const Empty = () => {
    return(null);
}

const Tab = createMaterialBottomTabNavigator();

export class main extends Component {
    componentDidMount(){
        this.props.clearData();
        this.props.fetchUser();
        this.props.fetchUserPosts();
    }
    render() {
        return (
            <Tab.Navigator  barStyle={{ backgroundColor: '#b5dad3' }} activeColor="#3a4442" inactiveColor="#e6f3f0">
                <Tab.Screen name="Diary" component={FeedScreen} 
                options={{
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="book-open-outline" color={color} size={25}/>
                    ),
                }}
                />
                <Tab.Screen name="Write" component={Empty} 
                listeners={({ navigation }) => ({
                    tabPress: event => {
                        event.preventDefault();
                        navigation.navigate("write")
                    }
                })}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="marker" color={color} size={25}/>
                    ),
                }}
                />
                <Tab.Screen name="Profile" component={profileScreen} 
                options={{
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="account-box" color={color} size={25}/>
                    ),
                }}
                />
            </Tab.Navigator>
        )
    }
}
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser, fetchUserPosts, clearData}, dispatch)


export default connect(mapStateToProps, mapDispatchProps)(main)
