/**
 * Main View of the application which provides navigation
 */

'use strict';
import React, {
    Component,
    StyleSheet,
    View,
    Text,
} from 'react-native';

import MK, {
    MKButton,
    MKColor,
    MKTextField
} from 'react-native-material-kit';

import {Actions} from 'react-native-router-flux';

import InstantActionBtn from '../Components/UI/InstantActionBtn';
import DialogAndroid from 'react-native-dialogs';
import {onLogoutSuccess} from '../Util/Events';
import Labels from '../Configs/Labels';
import {AppStyle} from '../Styles/CommonStyles';

let LogoutBtn = MKButton.coloredButton()
    .withText(Labels.Ui.LOGOUT)
    .withBackgroundColor(AppStyle.Colors.FG)
    .build();



export default class HomeView extends Component {
    constructor(props) {
        super(props);
        this.props = {
            isLoggedIn: true
        }
    }

    goToLogin(navigator) {
        navigator.push({
            id: 'Login'
        });
    }

    render() {
        return (
            <View style={styles.container} onLayout={this.showDialog}>
                <Text>Home</Text>
                <InstantActionBtn />
                <LogoutBtn onPress={() => { onLogoutSuccess(() => { this.goToLogin(this.props.navigator) })}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});