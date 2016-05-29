/**
 * Edit User Profile
 */

'use strict';
import React, {Component, StyleSheet, View, Text, Switch, Dimensions, TextInput, ScrollView, ToastAndroid} from "react-native";
import {MKButton, MKColor, MKTextField} from "react-native-material-kit";
import Labels from "../Configs/Labels";
import Rest from "../Util/Rest";
import IO from "../Util/IO";
import Form from "react-native-form";
import {AppStyle} from "../Styles/CommonStyles";
import MessageDialog from "../Components/UI/MessageDialog";
import Commons from "../Util/Commons";
import {Endpoints} from "../Configs/Url";
import Constants from "../Configs/Constants.js";
import Header from "../Components/UI/Header";
import BloodTypes from "../Data/BloodTypes"
var DialogAndroid = require('react-native-dialogs');

var styles = StyleSheet.create({
    title: {
        fontSize: 30
    },
    titleCard: {
        flex: 0.4
    },
    profileForm: {
        flex: 0.6
    },
    textField: {
        marginTop: 10,
        marginBottom: 10
    },
    container: {
        flex: 1,
        margin: 20,
        width: Dimensions.get('window').width - 40
    }
});

var TextMaterialInput, SubmitBtn, ColoredRaisedButton;
var dialogOptions = {};

function initializeInputs() {
    TextMaterialInput = MKTextField.textfield()
        .withFloatingLabelEnabled(true)
        .withStyle(styles.textField)
        .withTextInputStyle({color: MKColor.Grey})
        .withHighlightColor(AppStyle.Colors.FG)
        .build();
    SubmitBtn = MKButton.coloredButton()
        .withText(Labels.Ui.MODIFY)
        .withBackgroundColor(AppStyle.Colors.FG)
        .build();
    ColoredRaisedButton = MKButton.flatButton()
        .build();
}

function mapUserParams(user) {
    let params = {};
    params[Constants.RestParams.USERNAME] = user.username;
    params[Constants.RestParams.EMAIL] = user.email;
    params[Constants.RestParams.PHONE_NUMBER] = user.phoneNumber;
    params[Constants.RestParams.ADDRESS] = user.location;
    params[Constants.RestParams.BLOOD_TYPE] = user.group;
    return params;
}

function saveUser(navigator, user) {
    IO.getSessionToken().then((token) => {
        if (token) {
            let requestParams = mapUserParams(user);
            let queryParams = {};
            queryParams[Constants.StorageKeys.SESSION_TOKEN] = token;
            queryParams[Constants.StorageKeys.USER_ID] = user.facebookId;
            let url = Endpoints.USER + Commons.getQueryStringFromObject(queryParams);
            Rest.update(url, requestParams, (data) => {
                if (data.status == 200) {
                    MessageDialog.show("", Labels.Messages.PROFILE_UPDATE_SUCCESS);
                } else {
                    MessageDialog.show(Labels.Ui.ERROR, Labels.Messages.PROFILE_UPDATE_ERROR);
                }
            }, (err) => {
                console.error("User update Error");
            });
        }
    });
}

export default class ProfileEdit extends Component {

    constructor(props) {
        super(props);
        initializeInputs();
        this.state = {
            position: this.props.user.location,
            group : this.props.user.group
        };
        dialogOptions = {
            title: Labels.Ui.CHOOSE_BLOOD,
            positiveText: Labels.Ui.OK,
            negativeText: Labels.Ui.CANCEL,
            items: BloodTypes,
            itemsCallbackSingleChoice: (id, text) => {
                this.setState({
                    group: text
                });
                this.props.user.group = text;
            }
        };
    }

    showDialog () {
        var dialog = new DialogAndroid();
        dialog.set(dialogOptions);
        dialog.show();
    };

    componentDidMount() {
        {/* TODO - Change GPS Retrival Strategy */
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
                var gpsPosition = position.coords.latitude + "," + position.coords.longitude;
                this.setState({position: gpsPosition});
            },
            (error) => {
                console.error(error);
                MessageDialog.show(Labels.Ui.ERROR, Labels.Messages.GPS_ERROR);
            },
            {enableHighAccuracy: true, timeout: 2000, maximumAge: 1000}
        );
    }

    render() {
        return (
            <View>
                <Header navigator={this.props.navigator} title={Labels.Ui.YOUR_ACCOUNT} hideActionButtons={true}
                        color={AppStyle.Colors.FG} nestedView={true}/>
                <ScrollView style={styles.container}>
                    <View style={styles.titleCard}>
                        <Text style={styles.title}>
                            {Labels.Ui.MODIFY}
                        </Text>
                    </View>
                    <Form ref="form" style={styles.profileForm}>
                        {/* TODO - Change GPS value from GPS and Blood Group from select */}
                        <View>
                            <TextMaterialInput placeholder={Labels.Domain.User.USERNAME}
                                               defaultValue={this.props.user.username}
                                               onChangeText={(txt) => {this.props.user.username = txt}}/>
                            <TextMaterialInput placeholder={Labels.Domain.User.PHONE_NUMBER}
                                               defaultValue={this.props.user.phoneNumber}
                                               onChangeText={(txt) => {this.props.user.phoneNumber = txt}}/>
                            <TextMaterialInput placeholder={Labels.Domain.User.EMAIL}
                                               defaultValue={this.props.user.email}
                                               onChangeText={(txt) => {this.props.user.email = txt}}/>
                            <TextMaterialInput placeholder={Labels.Domain.User.LOCATION}
                                               defaultValue={this.state.position || "-"}
                                               onChangeText={(txt) => {this.props.user.location = txt}}/>
                            <TextMaterialInput placeholder={Labels.Domain.User.GROUP}
                                               onFocus={this.showDialog}
                                               defaultValue={this.state.group || "-"}/>
                            {/* Submit */}
                            <SubmitBtn onPress={() => {saveUser(this.props.navigator, this.props.user)}}/>
                        </View>
                    </Form>
                </ScrollView>
            </View>
        )
    }
}