import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUser} from '../Redux/actions/index'
import FeedScreen from './main/diary'
import addScreen from './main/write'
import profileScreen from './main/profile'

const Tab = createMaterialBottomTabNavigator();

export class main extends Component {
    componentDidMount(){
        this.props.fetchUser();
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
                <Tab.Screen name="Write" component={addScreen} 
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
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)


export default connect(mapStateToProps, mapDispatchProps)(main)
