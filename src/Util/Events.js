import React, {AsyncStorage} from 'react-native';
import Constants from '../Configs/Constants.js';
import _ from 'lodash';

function getLoginToken() {
    return AsyncStorage.getItem(Constants.StorageKeys.SESSION_TOKEN);
}

export function onLoginSuccess(onSuccess) {
    return getLoginToken().then((item) => {
        console.log("Session Token: " + item);
        if (item) onSuccess(item);
    })
}