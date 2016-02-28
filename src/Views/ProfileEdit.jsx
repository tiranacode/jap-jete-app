/**
 * Edit User Profile
 */

'use strict';
import React, {
    Component,
    StyleSheet,
    View,
    Text,
    Switch,
    Dimensions,
    TextInput,
    ScrollView
} from 'react-native';

import MK, {
    MKButton,
    MKColor,
    MKTextField
} from 'react-native-material-kit';

import {Router, Route, Schema, Animations, TabBar, Actions} from 'react-native-router-flux';
import Button from 'react-native-button';
import Labels from '../Configs/Labels';
import Rest from '../Util/Rest';
import Form from 'react-native-form'
import {AppStyle} from '../Styles/CommonStyles.js';

import { Endpoints } from '../Configs/Url';


var styles = StyleSheet.create({
    title: {
        fontSize: 30
    },
    titleCard: {
        flex: 0.4
    },
    profileForm: {
        flex: 0.6,
    },
    textField: {
        marginTop: 10,
        marginBottom: 10,
    },
    container: {
        flex: 1,
        margin: 20,
        width: Dimensions.get('window').width - 40,
    }
});

var TextMaterialInput, SubmitBtn;

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
}

function saveUser(navigator, user) {
    console.log("User Saved");
    navigator.push({
        id: 'Home',
        user: user
    });
}

export default class ProfileEdit extends Component {

    constructor(props) {
        super(props);
        initializeInputs();
        this.state = {
            user: props.user
        }
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.titleCard}>
                    <Text style={styles.title}>
                        {Labels.Ui.YOUR_ACCOUNT}
                    </Text>
                </View>
                <Form ref="form" style={styles.profileForm}>
                    <View>
                        <TextMaterialInput placeholder={Labels.Domain.User.USERNAME} value={this.state.user.username}/>
                        <TextMaterialInput placeholder={Labels.Domain.User.PHONE_NUMBER} value={this.state.user.phoneNumber}/>
                        <TextMaterialInput placeholder={Labels.Domain.User.EMAIL} value={this.state.user.email}/>
                        <TextMaterialInput placeholder={Labels.Domain.User.LOCATION} value={this.state.user.location}/>
                        <TextMaterialInput placeholder={Labels.Domain.User.GROUP} value={this.state.user.group}/>
                        <SubmitBtn onPress={() => {saveUser(this.props.navigator, this.state.user)}}/>
                    </View>
                </Form>
            </ScrollView>
        )
    }
}