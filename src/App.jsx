/**
 * Main Application Component, As the entry point of the app some actions happen here:
 * - Defines Routes
 * - Handles Network Connection
 * - Loads Some Data from Local Storage
 * - Configures misc UI Components
 * - Initializes Global Event Handlers (Back Btn)
 * - Sets up GCM
 */

'use strict';
import React, {Component, StyleSheet, NetInfo, BackAndroid, Navigator, DeviceEventEmitter} from 'react-native';
import StatusBarAndroid from 'react-native-android-statusbar';

import {AppStyle} from './Styles/CommonStyles';
import TabView from './Views/TabView'
import LoginView from './Views/Login'
import ProfileView from './Views/Profile'
import ProfileEdit from './Views/ProfileEdit'
import Header from './Components/UI/Header';
import Footer from './Components/UI/Footer';
import SplashScreen from './Views/SplashScreen';

/* GCM */
import GcmAndroid from 'react-native-gcm-android';
import Notification from 'react-native-system-notification';

var _navigator;

/**
 * Setup GCM
 */
function initGCM() {

    GcmAndroid.addEventListener('notification', function (notification) {
        console.log('receive gcm notification', notification);
        var info = JSON.parse(notification.data.info);
        /*if (!GcmAndroid.isInForeground) {
         Notification.create({
         subject: info.subject,
         message: info.message
         });
         }*/
        Notification.create({
            subject: info.subject,
            message: info.message
        });
    });

    DeviceEventEmitter.addListener('sysNotificationClick', function (e) {
        //TODO - Handle Notification Click
        console.log('sysNotificationClick', e);
    });

    GcmAndroid.requestPermissions();
}

/**
 * Init Other Events
 */
function initEventHandlers() {

    BackAndroid.addEventListener('hardwareBackPress', () => {
        if (_navigator.getCurrentRoutes().length === 1) {
            return false;
        }
        _navigator.pop();
        return true;
    });
}

/**
 * Main Application Component
 */
export default class JapJete extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        initEventHandlers();
        initGCM();
    }

    navigatorRenderScene(route, navigator) {
        _navigator = navigator;
        switch (route.id) {
            case 'Login':
                return (<LoginView navigator={navigator}/>);
            case 'TabView':
                return (<TabView navigator={navigator}/>);
            case 'Profile':
                return (<ProfileView navigator={navigator}/>);
            case 'ProfileEdit':
                return (<ProfileEdit navigator={navigator} user={route.user}/>);
            case 'Home':
                return (<HomeView navigator={navigator}/>);
        }
    }

    render() {
        return (
            <Navigator
                initialRoute={{id: 'Login'}}
                renderScene={this.navigatorRenderScene}
                configureScene={(route) => {return Navigator.SceneConfigs.FadeAndroid}}/>
        )
    }
}

(function initApp() {
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
