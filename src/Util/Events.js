'use strict';
import React, {AsyncStorage} from 'react-native';
import Constants from '../Configs/Constants';
import IO from './IO';
var FBLoginManager = require('NativeModules').FBLoginManager;

export function onLoginSuccess(onLogin) {
    return IO.getSessionToken().then((item) => {
        console.log("Session Token: " + item);
        if (item && onLogin) onLogin(item);
    });
}

export function onLogoutSuccess(onLogout) {
    return IO.removeSessionToken().then((item) => {
        console.log("Session Token Removed");
        FBLoginManager.logout(function (error, data) {
            IO.removeUser().then(() => {
                if (onLogout) onLogout();
            });
        });
    })
}