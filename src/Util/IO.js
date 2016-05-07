'use strict';
import React, {AsyncStorage} from 'react-native';
import Constants from '../Configs/Constants';

export default class IO {

    static getSessionToken () {
        return AsyncStorage.getItem(Constants.StorageKeys.SESSION_TOKEN);
    }

    static removeSessionToken () {
        return AsyncStorage.removeItem(Constants.StorageKeys.SESSION_TOKEN);
    }

    static getGCMToken () {
        return AsyncStorage.getItem(Constants.StorageKeys.GCM_TOKEN);
    }

    static removeUser () {
        return AsyncStorage.removeItem(Constants.StorageKeys.USER);
    }

    static getUser () {
        return AsyncStorage.getItem(Constants.StorageKeys.USER);
    }
    
    static getSettings () {
        return AsyncStorage.getItem(Constants.StorageKeys.SETTINGS);
    }

    static setSettings (settings) {
        return AsyncStorage.setItem(Constants.StorageKeys.SETTINGS, settings);
    }
};



