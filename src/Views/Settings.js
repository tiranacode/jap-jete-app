/**
 * Application Dashboard View
 */

'use strict';
import React, {Component, StyleSheet, View, Text, ScrollView, Dimensions} from "react-native";
import Labels from "../Configs/Labels";
import {tryLogout} from "../Util/Events";
import {AppStyle} from "../Styles/CommonStyles";
import {MKSwitch, MKColor, MKButton} from "react-native-material-kit";
import Header from "../Components/UI/Header";
import InstantActionBtn from "../Components/UI/InstantActionBtn";
import IO from "../Util/IO";
import Setting from "../Domain/Setting";
import MessageDialog from "../Components/UI/MessageDialog";

let LogoutBtn = MKButton.coloredButton()
    .withText(Labels.Ui.LOGOUT)
    .withBackgroundColor(AppStyle.Colors.FG)
    .build();

let userSettings = new Setting();

export default class SettingsView extends Component {

    constructor(props) {
        super(props);
    }

    _goToLogin(navigator) {
        navigator.push({
            id: 'Login'
        });
    }

    _changeSetting(key, value) {
        userSettings.setSetting(key, value);
        IO.setSettings(userSettings.toString());
    }

    componentDidMount() {
        //Get or save settings
        IO.getSettings().then((settings) => {
            if (settings) {
                userSettings = new Setting(settings);
            } else {
                userSettings = new Setting(null);
                IO.setSettings(userSettings.toString());
            }
        })
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
                            <MKSwitch style={styles.settingValue} checked={userSettings.getSetting(Setting.KEYS.NOTIFICATIONS)}
                                      trackSize={30}
                                      trackLength={52}
                                      onColor="#eee"
                                      thumbOnColor={AppStyle.Colors.FG}
                                      rippleColor="#aaa"
                                      onPress={() => console.log('orange switch pressed')}
                                      onCheckedChange={(val) => this._changeSetting(Setting.KEYS.NOTIFICATIONS, val.checked)}/>
                        </View>
                        <View style={styles.setting}>
                            <Text style={styles.settingKey}>{Labels.Settings.BLACK_BAR}</Text>
                            <MKSwitch style={styles.settingValue} checked={userSettings.getSetting(Setting.KEYS.DARK_HEADER)}
                                      trackSize={30}
                                      trackLength={52}
                                      onColor="#eee"
                                      thumbOnColor={AppStyle.Colors.FG}
                                      rippleColor="#aaa"
                                      onPress={() => console.log('orange switch pressed')}
                                      onCheckedChange={(val) => this._changeSetting(Setting.KEYS.DARK_HEADER, val.checked)}/>
                        </View>
                    </View>
                    <View style={styles.versionSeparator}>
                        <Text>
                            {Labels.APP_NAME} {Labels.APP_VERSION}
                        </Text>
                    </View>
                </View>
                <InstantActionBtn style={styles.logoutBtn} icon={AppStyle.Icons.EXIT}
                                  onPress={() => { tryLogout(() => { this._goToLogin(this.props.navigator) })}}/>
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
    settingKey: {},
    settingValue: {},
    title: {
        fontSize: 20
    },
    logoutSeparator: {
        marginTop: 20,
        marginBottom: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    versionSeparator: {
        marginTop: 20,
        marginBottom: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderTopColor: "#efefef",
        borderTopWidth: 1
    }
});