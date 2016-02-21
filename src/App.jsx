/**
 * Main Application Component, As the entry point of the app some actions happen here:
 * - Defines Routes
 * - Handles Network Connection
 * - Loads Some Data from Local Storage
 * - Configures misc UI Components
 */

'use strict';
import React, {Component, StyleSheet, Text, View, Navigator, TouchableHighlight, NetInfo, ToastAndroid} from 'react-native';
import {Router, Route, Schema, Animations, TabBar} from 'react-native-router-flux';
import {Actions} from 'react-native-router-flux'
import StatusBarAndroid from 'react-native-android-statusbar';
import {AppStyle} from './Styles/CommonStyles';

import TestComponent from './Components/Util/TestComponent';
import HomeView from './Views/Home'
import TabView from './Views/TabView'
import LoginView from './Views/Login'
import ProfileView from './Views/Profile'
import Header from './Components/UI/Header';
import Footer from './Components/UI/Footer';

import { API_ENDPOINT } from './Configs/Url';
/* Test Rest */
import Rest from './Util/Rest.js'

/**
 * Main Application Component
 */
export default class JapJete extends Component {
    render() {
        Rest.READ(API_ENDPOINT.Test, "",
            function (res) {
                ToastAndroid.show(res._bodyText, ToastAndroid.SHORT);
            }, function (res) {
                ToastAndroid.show(res.data, ToastAndroid.SHORT);
            });
        return (
            /* Enable Header or Footer by using header={Header} | footer={Footer} */
            <Router hideNavBar={true} hideTabBar={true}>
                <Schema name="default" sceneConfig={Navigator.SceneConfigs.FadeAndroid}/>
                <Route name="login" hideTabBar={true} hideNavBar={true} component={LoginView} initial={true}
                       title="Login"/>
                <Route name="tabView" component={TabView} title="TabView"/>
                <Route name="profile" hideTabBar={false} hideNavBar={false} component={ProfileView}/>
            </Router>
        );
    }
}

(function initialiseApp() {
    //StatusBarAndroid.hideStatusBar();
    StatusBarAndroid.setHexColor(AppStyle.Colors.FG);
    //TODO - Add Other Initializations Here
})();

/**
 * Main Application Style
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    }
});
