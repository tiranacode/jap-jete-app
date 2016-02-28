import React, {AsyncStorage} from 'react-native';
import Constants from '../Configs/Constants.js';
import _ from 'lodash';
var FBLoginManager = require('NativeModules').FBLoginManager;

function getSessionToken() {
    return AsyncStorage.getItem(Constants.StorageKeys.SESSION_TOKEN);
}

function removeSessionToken() {
    return AsyncStorage.removeItem(Constants.StorageKeys.SESSION_TOKEN);
}

function getLoginToken() {
    return AsyncStorage.getItem(Constants.StorageKeys.SESSION_TOKEN);
}

export function onLoginSuccess(onLogin) {
    return getLoginToken().then((item) => {
        console.log("Session Token: " + item);
        if (item && onLogin) onLogin(item);
    })
}

export function onLogoutSuccess(onLogout) {
    return removeSessionToken().then((item) => {
        console.log("Session Token Removed");
        FBLoginManager.logout(function(error, data){
            AsyncStorage.removeItem(Constants.StorageKeys.USER).then(() => {
                if (onLogout) onLogout();
            });
        });
    })
}