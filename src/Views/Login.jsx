/**
 * Application Start Screen.
 * If the user is not logged in it shows Facebook log in screen
 * otherwise it switches to the next route in the application flow
 */

'use strict';
import React, { Component, StyleSheet, View, Text, TouchableHighlight, ToastAndroidk, Image } from 'react-native';
import {Router, Route, Schema, Animations, TabBar, Actions} from 'react-native-router-flux';

import {AppStyle} from '../Styles/CommonStyles';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeView from './Home';
import FBLogin from 'react-native-facebook-login';
import Labels from '../Configs/Labels';
import NetworkStatus from '../Components/Util/NetworkStatus';
import {do_fb_login, do_server_login} from '../Util/Backend';
import {tryLogin, tryLogout} from '../Util/Events';

let logo = require('../../assets/imgs/logo.png');

function loginSuccess(navigator) {
    navigator.push({
        id: 'TabView'
    });
}

export default class LoginView extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        tryLogin(() => loginSuccess(this.props.navigator))
    }

    render() {
        return (
            <View style={styles.loginWrapper}>
                <Image
                    source={logo}
                    style={styles.logoImage}>
                </Image>
                <Text style={styles.mainTitle}>
                    {Labels.APP_NAME}
                </Text>
                <FBLogin
                    style={styles.fbLogin}
                    onLogin={(e) => {
                        do_fb_login(e,(token) => {
                            loginSuccess(this.props.navigator);
                        })
                    }}
                    onLogout={(e) => {
                        tryLogout();
                    }}
                    onCancel={(e) => {
                        console.log(e)
                    }}
                    onPermissionsMissing={(e) => {
                        console.log(e)}
                    }/>
                {/* TODO - For Testing Purposes Only */}
                <Text onPress={()=> { loginSuccess(this.props.navigator) }}>Go to Home</Text>
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
        backgroundColor: AppStyle.Colors.FG
    },
    fbLogin: {
        marginBottom: 20
    },
    mainTitle: {
        color: AppStyle.Colors.BG,
        fontSize: 30,
        marginBottom: 20
    },
    logoImage: {
        width: 150,
        height: 150,
        marginBottom: 10
    }
});

