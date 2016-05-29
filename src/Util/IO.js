'use strict';
import React, {AsyncStorage} from 'react-native';
import Constants from '../Configs/Constants';
import Q from 'q';

export default class IO {
    
    static async getItem(hash) {
        let response = [];
        await AsyncStorage.getItem(hash).then((data) => {
            response = data;
        });
        if (response) {
            try {
                response = JSON.parse(response);
            } catch (e) {
                console.error(e)
            }
        }
        return response;
    }
    
    static async setItem(hash, data) {
        return await AsyncStorage.setItem(hash, data);
    }
    
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
    
    static getDonationCampaigns () {
        return IO.getItem(Constants.StorageKeys.DONATION_CAMPAIGNS);
    }
    
    static setDonationCampaigns (data) {
        return IO.setItem(Constants.StorageKeys.DONATION_CAMPAIGNS, data);
    }
};



