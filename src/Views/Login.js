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
import {doFBLogin, doServerLogin} from '../Util/Backend';
import {tryLogin, tryLogout} from '../Util/Events';
import MessageDialog from '../Components/UI/MessageDialog';
import IO from '../Util/IO';
import Spinner from '../Components/UI/Spinner';
let logo = require('../../assets/imgs/logo.png');

export default class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialView: true
        }
    }

    goToNextScreen() {
        this.props.navigator.push({id: 'TabView'})
    }

    componentDidMount() {
        //Go to Tab View if LoggedIn
        tryLogin().then((data) => {
            if (data) {
                this.goToNextScreen();
                this.setState({initialView: false});
            } else {
                this.setState({initialView: false});
            }
        })
    }

    shouldComponentUpdate() {
        return true;
    }

    render() {
        let view = null;
        //Default View
        if (this.state.initialView) {
            view = (
                <View style={styles.loginWrapper}>
                    <Spinner inverted={true}/>
                </View>
            );
        } else {
            view = (
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
                            doFBLogin(e,() => {
                                //Successful Login
                                this.goToNextScreen();
                                MessageDialog.show("", "Ju u kycet me sukses");
                        }, () => {
                            //Login Failed
                            MessageDialog.show(Labels.Ui.ERROR, Labels.Messages.FACEBOOK_LOGIN_ERROR);
                        });
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
                    <NetworkStatus />
                </View>
            );
        }
        return view;
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

