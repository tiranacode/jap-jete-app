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
import React, {
    Component,
    StyleSheet,
    NetInfo,
    BackAndroid,
    Navigator,
    DeviceEventEmitter,
    AsyncStorage
} from "react-native";
import StatusBarAndroid from "react-native-android-statusbar";
import {AppStyle} from "./Styles/CommonStyles";
import TabView from "./Views/TabView";
import LoginView from "./Views/Login";
import ProfileView from "./Views/Profile";
import ProfileEdit from "./Views/ProfileEdit";
import SplashScreen from "./Views/SplashScreen";
import Constants from "./Configs/Constants";
import Push from "./Util/Push";
import MessageDialog from "./Components/UI/MessageDialog";
import SettingsView from "./Views/Settings";
import DonationDetailsView from "./Views/DonationDetails";

var _navigator;

Push.launchNotification();

/**
 * Setup GCM
 */
function initGCM() {
    Push.subscribe();
    Push.launchLiveNotification((e) => {
        console.log("Todo - Hande PUSH");
    });
}

/**
 * Init Application
 */
function initApp() {
    //Handle Back Button
    BackAndroid.addEventListener('hardwareBackPress', () => {
        let routes = _navigator.getCurrentRoutes();
        let lastRouteId = (routes[routes.length - 2]) ?
            routes[routes.length - 2].id : routes[routes.length - 1].id;
        //Exit if there is no more routing
        if (routes.length == 1 || lastRouteId == "Login" || lastRouteId == "Splash") {
            return false;
        }
        //Exit if in login screen
        if (routes[routes.length - 1].id == "Login") {
            return false;
        }
        _navigator.pop();
        return true;
    });

    //StatusBarAndroid.hideStatusBar();
    StatusBarAndroid.setHexColor(AppStyle.Colors.FG_DARK);
}

/**
 * Main Application Component
 */
export default class JapJete extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    shouldComponentUpdate() {
        return true;
    }

    componentDidMount() {
        initApp();
        initGCM();
        //Show splash if is not opened otherwise login
        AsyncStorage.getItem(Constants.StorageKeys.SPLASH_SCREEN_FLAG).then((item) => {
            MessageDialog.debug("Splash Received: " + item);
            this.setState({initialScreen: false});
        }).catch((item) => {
            MessageDialog.debug("Splash Error: " + item);
            this.setState({initialScreen: true});
        });
    }

    navigatorRenderScene(route, navigator) {
        _navigator = navigator;
        switch (route.id) {
            case 'Login':
                return (<LoginView navigator={navigator}/>);
            case 'TabView':
                return (<TabView navigator={navigator}/>);
            case 'DonationDetailsView':
                return (<DonationDetailsView navigator={navigator}/>);
            case 'Profile':
                return (<ProfileView navigator={navigator}/>);
            case 'ProfileEdit':
                return (<ProfileEdit navigator={navigator} user={route.user}/>);
            case 'Home':
                return (<HomeView navigator={navigator}/>);
            case 'Splash':
                return (<SplashScreen navigator={navigator}/>);
            case 'Settings':
                return (<SettingsView navigator={navigator}/>);
        }
    }

    render() {
        if (this.state.initialScreen) {
            MessageDialog.debug("Rendering Splash");
            return (
                <Navigator
                    initialRoute={{id: "Splash"}}
                    renderScene={this.navigatorRenderScene}
                    configureScene={(route) => {return Navigator.SceneConfigs.FadeAndroid}}/>
            );
        }
        MessageDialog.debug("Rendering Login");
        return (
            <Navigator
                initialRoute={{id: "Login"}}
                renderScene={this.navigatorRenderScene}
                configureScene={(route) => {return Navigator.SceneConfigs.FadeAndroid}}/>
        );
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
