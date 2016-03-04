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
import Constants from './Configs/Constants';
import Labels from './Configs/Labels';
import Push from './Util/Push';

var _navigator;

Push.launchNotification();

/**
 * Setup GCM
 */
function initGCM() {
    Push.subscribe();
    Push.launchLiveNotification((e) => {
        console.log("Todo - PUSH");
    });
}

/**
 * Init Application
 */
function initApp() {
    //Handle Back Button
    BackAndroid.addEventListener('hardwareBackPress', () => {
        if (_navigator.getCurrentRoutes().length === 1) {
            return false;
        }
        _navigator.pop();
        return true;
    });

    //StatusBarAndroid.hideStatusBar();
    StatusBarAndroid.setHexColor(AppStyle.Colors.FG);
    //TODO - Add Other Initializations Here
}

/**
 * Main Application Component
 */
export default class JapJete extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        initApp();
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
