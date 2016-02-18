'use strict';

import React, { Component, StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import {Router, Route, Schema, Animations, TabBar, Actions} from 'react-native-router-flux';
import {AppStyle} from '../Styles/CommonStyles';
import Button from 'react-native-button';
import HomeView from './Home';

export default class LoginView extends Component {
    render() {
        return (
            <View style={styles.loginWrapper}>
                <Text>Login View</Text>
                <Button onPress={()=>Actions.home({data:"LoginData", title:'Login' })}>Login</Button>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    loginWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    }
});

