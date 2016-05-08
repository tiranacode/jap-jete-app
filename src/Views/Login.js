/**
 * Application Start Screen.
 * If the user is not logged in it shows Facebook log in screen
 * otherwise it switches to the next route in the application flow
 */

'use strict';
import React, {
    Component,
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    ToastAndroidk,
    Image,
    Dimensions
} from "react-native";
import FBLogin from "react-native-facebook-login";
import Labels from "../Configs/Labels";
import NetworkStatus from "../Components/Util/NetworkStatus";
import {doFBLogin} from "../Util/Backend";
import {tryLogin, tryLogout} from "../Util/Events";
import MessageDialog from "../Components/UI/MessageDialog";
import Spinner from "../Components/UI/Spinner";
import {AppStyle} from "../Styles/CommonStyles";

let logo = require('../../assets/imgs/logo.png');
let bg = require('../../assets/imgs/login-bg.jpg');

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
                    <View style={styles.mainTitle}>
                        <Image
                            source={logo}
                            style={styles.logoImage}>
                        </Image>
                        <Text style={styles.appName}>
                            {Labels.APP_NAME}
                        </Text>
                        <Text style={styles.appVersion}>
                            version_{Labels.APP_VERSION}
                        </Text>
                        <View style={styles.topText}>
                            <Text style={{color: 'white', fontSize: 12}}>Developed with {'<3'} by <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold'}}>{Labels.APP_AUTHOR}</Text></Text>
                        </View>
                    </View>
                    <View style={styles.bottomBar}>
                        <FBLogin
                            style={styles.fbLogin}
                            onLogin={(e) => {
                            doFBLogin(e,() => {
                                //Successful Login
                                this.goToNextScreen();
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
        backgroundColor: 'white',
        height: 150
    },
    mainTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
        paddingTop: 0,
        width: 200
    },
    topText: {
        marginTop: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoImage: {
        width: 180,
        height: 180,
    },
    appName: {
        fontSize: 35,
        fontWeight: 'bold',
        marginLeft: 5,
        color: AppStyle.Colors.BG
    },
    appVersion: {
        color: 'white',
        fontSize: 12,
        position: 'absolute',
        right: 20,
        marginTop: -5
    },
    backgroundImage: {
        flex: 1,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomBar: {
        width: Dimensions.get('window').width - 100,
        position: 'absolute',
        bottom: 50,
        marginLeft: 50
    }
});

