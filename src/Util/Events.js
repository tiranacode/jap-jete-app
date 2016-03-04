'use strict';
import React, {AsyncStorage} from 'react-native';
import Constants from '../Configs/Constants';
import IO from './IO';
import Labels from '../Configs/Labels';
import MessageDialog from '../Components/UI/MessageDialog';
var FBLoginManager = require('NativeModules').FBLoginManager;


export function tryLogin(onLogin) {
    return IO.getSessionToken().then((item) => {
        if (item && onLogin) {
            onLogin(item)
        } else {
            FBLoginManager.logout(function() {
                MessageDialog.show(Labels.Ui.ERROR, Labels.Messages.FACEBOOK_LOGIN_ERROR);
            });
        }
    });
}

export function tryLogout(onLogout) {
    return IO.removeSessionToken().then((item) => {
        console.log("Session Token Removed");
        FBLoginManager.logout(function (error, data) {
            IO.removeUser().then(() => {
                if (onLogout) onLogout();
            });
        });
    })
}