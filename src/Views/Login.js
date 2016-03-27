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
                    <Image source={bg} style={styles.backgroundImage}>
                        <View style={styles.mainTitle}>
                            <Image
                                source={logo}
                                style={styles.logoImage}>
                            </Image>
                            <Text style={styles.appName}>
                                {Labels.APP_NAME}
                            </Text>
                        </View>
                        <View style={styles.bottomBar}>
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

                    </Image>
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
        alignItems: 'center'
    },
    fbLogin: {
        backgroundColor: 'white',
        height: 150
    },
    mainTitle: {
        flex: 1,
        marginBottom: 10,
        position: 'absolute',
        marginTop: 0,
        bottom: 30,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.5)',
        paddingBottom: 20,
        paddingTop: 20
    },
    logoImage: {
        width: 80,
        height: 80,
    },
    appName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 5
    },
    backgroundImage: {
        flex: 1,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomBar: {
        width: Dimensions.get('window').width,
        position: 'absolute',
        bottom: 0,
    }
});

