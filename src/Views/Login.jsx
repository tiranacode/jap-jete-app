/**
 * Application Start Screen.
 * If the user is not logged in it shows Facebook log in screen
 * otherwise it switches to the next route in the application flow
 */

'use strict';
import React, {AsyncStorage, Component, StyleSheet, View, Text, TouchableHighlight, ToastAndroid } from 'react-native';
import {Router, Route, Schema, Animations, TabBar, Actions} from 'react-native-router-flux';
import {AppStyle} from '../styles/CommonStyles';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeView from './Home';
import FBLogin from 'react-native-facebook-login';
import Labels from '../Configs/Labels';
import NetworkStatus from '../Components/NetworkStatus';

function do_server_login() {
    // TODO: Register gcmID

    let gcmID = "";
    let user_id = AsyncStorage.getItem("user_id");
    let fb_token = AsyncStorage.getItem("fb.token");

    fetch(LOGIN_ENDPOINT, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: user_id,
            gcmID: gcmID,
            fb_token: fb.token
        })
    });

    // TODO: Check for server response. If success, save session_token in AsyncStorage
}

function do_fb_login(e) {
    // TODO: Check for valid response

    let user_id = e.profile.id;
    let fb_token = e.token;
    AsyncStorage.setItem("user_id", user_id);
    AsyncStorage.setItem("fb_token", fb_token);
}


export default class LoginView extends Component {
    render() {
        return (
            <View style={styles.loginWrapper}>
                <Icon
                    name="heartbeat"
                    size={120}
                    color={AppStyle.Colors.FG}
                    style={{marginBottom: 20}}/>
                <FBLogin
                    onLogin={function(e) {do_fb_login(e)}}
                    onLogout={function(e){console.log(e)}}
                    onCancel={function(e){console.log(e)}}
                    onPermissionsMissing={function(e){console.log(e)}}/>
                <Button onPress={()=>Actions.home()}>Go to Home</Button>
                <NetworkStatus />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    loginWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: AppStyle.Colors.BG
    }
});

