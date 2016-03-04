'use strict';
import React, {AsyncStorage, DeviceEventEmitter} from 'react-native';
import Constants from '../Configs/Constants.js';

/* GCM */
import GcmAndroid from 'react-native-gcm-android';
import Notification from 'react-native-system-notification';

function createNotificationBody (info) {
    Notification.create({
        subject: info.subject,
        message: info.message
    });
}

export default class Push {

    /**
     * Set First Time GCM Token
     */
    static subscribe() {
        GcmAndroid.addEventListener('register', function (token) {
            AsyncStorage.setItem(Constants.StorageKeys.GCM_TOKEN, token);
            console.log('GCM Token: ' + token);
        });

        GcmAndroid.addEventListener('registerError', function (error) {
            AsyncStorage.setItem(Constants.StorageKeys.GCM_TOKEN, '');
            console.log('registerError', error.message);
        });
    }

    static launchNotification() {
        if (GcmAndroid.launchNotification) {
            var notification = GcmAndroid.launchNotification;
            var info = JSON.parse(notification.info);
            createNotificationBody(info);
            GcmAndroid.stopService();
        }
    }

    static launchLiveNotification(clickCallback) {
        GcmAndroid.addEventListener('notification', function (notification) {
            console.log('receive gcm notification', notification);
            var info = JSON.parse(notification.data.info);
            createNotificationBody(info);
        });

        DeviceEventEmitter.addListener('sysNotificationClick', function (e) {
            if (clickCallback) clickCallback(e);
            console.log('sysNotificationClick', e);
        });

        GcmAndroid.requestPermissions();
    }
};



