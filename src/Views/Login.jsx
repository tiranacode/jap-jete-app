/**
 * Application Start Screen.
 * If the user is not logged in it shows Facebook log in screen
 * otherwise it switches to the next route in the application flow
 */

'use strict';
import React, { Component, StyleSheet, View, Text, TouchableHighlight, ToastAndroid } from 'react-native';
import {Router, Route, Schema, Animations, TabBar, Actions} from 'react-native-router-flux';
import {AppStyle} from '../Styles/CommonStyles';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeView from './Home';
import FBLogin from 'react-native-facebook-login';
import Labels from '../Configs/Labels';
import NetworkStatus from '../Components/Util/NetworkStatus';

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
                    onLogin={function(e) {console.log(e)}}
                    onLogout={function(e){console.log(e)}}
                    onCancel={function(e){console.log(e)}}
                    onPermissionsMissing={function(e){console.log(e)}}/>
                <Button onPress={()=>Actions.tabView()}>Go to Home</Button>
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

