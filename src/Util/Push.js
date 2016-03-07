'use strict';
import React, {AsyncStorage, DeviceEventEmitter} from 'react-native';
import Constants from '../Configs/Constants.js';

/* GCM */
import GcmAndroid from 'react-native-gcm-android';
import Notification from 'react-native-system-notification';

function createNotificationBody(info) {
    Notification.create({
        subject: info.subject,
        message: info.message
    });
}

function getGCMMessage(notification) {
    let info = {};
    try {
        info = JSON.parse(notification.data.info);
    } catch (e) {
        info.subject = "Push";
        info.message = "Message Error";
        console.error(e);
    }
    return info;
}

export default class Push {

    /**
     * Set First Time GCM Token
     */
    static subscribe() {
        GcmAndroid.addEventListener('register', function (token) {
            AsyncStorage.setItem(Constants.StorageKeys.GCM_ID, token);
            console.log('GCM Token: ' + token);
        });

        GcmAndroid.addEventListener('registerError', function (error) {
            AsyncStorage.setItem(Constants.StorageKeys.GCM_ID, '');
            console.log('registerError', error.message);
        });
    }

    static launchNotification() {
        if (GcmAndroid.launchNotification) {
            let notification = GcmAndroid.launchNotification;
            let info = getGCMMessage(notification);
            createNotificationBody(info);
            GcmAndroid.stopService();
        }
    }

    static launchLiveNotification(clickCallback) {
        GcmAndroid.addEventListener('notification', function (notification) {
            console.log('receive gcm notification', notification);
            let info = getGCMMessage(notification);
            createNotificationBody(info);
        });

        DeviceEventEmitter.addListener('sysNotificationClick', function (e) {
            if (clickCallback) clickCallback(e);
            console.log('sysNotificationClick', e);
        });

        GcmAndroid.requestPermissions();
    }
};



