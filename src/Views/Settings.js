/**
 * Application Dashboard View
 */

'use strict';
import React, {Component, StyleSheet, View, Text} from "react-native";
import Labels from "../Configs/Labels";
import {tryLogout} from "../Util/Events";
import {AppStyle} from "../Styles/CommonStyles";
import {MKButton, MKColor} from "react-native-material-kit";
import Header from "../Components/UI/Header";
import "../Components/UI/Header";


let LogoutBtn = MKButton.coloredButton()
    .withText(Labels.Ui.LOGOUT)
    .withBackgroundColor(AppStyle.Colors.FG)
    .build();


export default class SettingsView extends Component {

    _goToLogin(navigator) {
        navigator.push({
            id: 'Login'
        });
    }

    render() {
        return (
            <View>
                <Header navigator={this.props.navigator} title={Labels.Ui.SETTINGS} hideActionButtons={true}
                        color={AppStyle.Colors.FG} nestedView={true}/>
                <View style={styles.container}>
                    <Text>Settings</Text>
                    <LogoutBtn onPress={() => { tryLogout(() => { this._goToLogin(this.props.navigator) })}}/>
                </View>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
});