'use strict';
import React, {
    Component,
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    AsyncStorage,
    InteractionManager,
    ToastAndroid
} from 'react-native';

import {AppStyle, ComponentsStyle} from '../../Styles/CommonStyles';
/*import DialogAndroid from 'react-native-dialogs';*/
import Labels from '../../Configs/Labels';

var dialogOptions = {
    negativeText: Labels.Ui.CANCEL
};

export default class MessageDialog {

    static show = function (title, message) {
        return ToastAndroid.show(message, ToastAndroid.LONG);
        /*var dialog = new DialogAndroid();
        dialogOptions.content = message;
        dialogOptions.title = title;
        dialog.set(dialogOptions);
        dialog.show();*/
    };
}

const styles = StyleSheet.create({});