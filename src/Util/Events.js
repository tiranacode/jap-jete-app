'use strict';
import React, {AsyncStorage} from 'react-native';
import Constants from '../Configs/Constants';
import IO from './IO';
import Labels from '../Configs/Labels';
import MessageDialog from '../Components/UI/MessageDialog';
var FBLoginManager = require('NativeModules').FBLoginManager;

export function tryLogin() {
    return IO.getSessionToken();
}

export function tryLogout(onLogout) {
    return IO.removeSessionToken().then((item) => {
        console.log("Session Token Removed");
        FBLoginManager.logout(function (error, data) {
            IO.removeUser().then(() => {
                IO.removeSessionToken().then(() => {
                    if (onLogout) onLogout();
                });
            });
        });
    })
}