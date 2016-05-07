/**
 * Application Dashboard View
 */

'use strict';
import React, {Component, StyleSheet, View, Text, ScrollView, Dimensions} from "react-native";
import Labels from "../Configs/Labels";
import {tryLogout} from "../Util/Events";
import {AppStyle} from "../Styles/CommonStyles";
import {
    MKSwitch,
    MKColor,
    MKButton
} from 'react-native-material-kit';
import Header from "../Components/UI/Header";
import InstantActionBtn from "../Components/UI/InstantActionBtn";

let LogoutBtn = MKButton.coloredButton()
    .withText(Labels.Ui.LOGOUT)
    .withBackgroundColor(AppStyle.Colors.FG)
    .build();


export default class SettingsView extends Component {

    constructor(props) {
        super(props);
    }

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
                    <View>
                        <Text style={styles.title}>
                            {Labels.Messages.SETTINGS}
                        </Text>
                    </View>
                    <View style={styles.settings}>
                        <View style={styles.setting}>
                            <Text style={styles.settingKey}>{Labels.Settings.NOTIFICATIONS}</Text>
                            <MKSwitch style={styles.settingValue} checked={true}
                                      trackSize={30}
                                      trackLength={52}
                                      onColor="#eee"
                                      thumbOnColor={AppStyle.Colors.FG}
                                      rippleColor="#aaa"
                                      onPress={() => console.log('orange switch pressed')}
                                      onCheckedChange={(e) => console.log('orange switch checked', e)}/>
                        </View>
                        <View style={styles.setting}>
                            <Text style={styles.settingKey}>{Labels.Settings.BLACK_BAR}</Text>
                            <MKSwitch style={styles.settingValue} checked={true}
                                      trackSize={30}
                                      trackLength={52}
                                      onColor="#eee"
                                      thumbOnColor={AppStyle.Colors.FG}
                                      rippleColor="#aaa"
                                      onPress={() => console.log('orange switch pressed')}
                                      onCheckedChange={(e) => console.log('orange switch checked', e)}/>
                        </View>
                    </View>
                    <View style={styles.versionSeparator}>
                        <Text>
                            {Labels.APP_NAME} {Labels.APP_VERSION}
                        </Text>
                    </View>
                </View>
                <InstantActionBtn style={styles.logoutBtn} icon={AppStyle.Icons.EXIT} onPress={() => { tryLogout(() => { this._goToLogin(this.props.navigator) })}}/>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        height: Dimensions.get('window').height - 80
    },
    settings: {
        marginTop: 30
    },
    setting: {
        flexDirection: "column",
        marginBottom: 20
    },
    settingKey: {

    },
    settingValue: {

    },
    title: {
        fontSize: 20
    },
    logoutSeparator: {
        marginTop: 20,
        marginBottom: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },
    versionSeparator: {
        marginTop: 20,
        marginBottom: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderTopColor: "#efefef",
        borderTopWidth: 1,
    }
});