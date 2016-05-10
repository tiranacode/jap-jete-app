'use strict';
import React, {AsyncStorage, DeviceEventEmitter} from 'react-native';
import Constants from '../Configs/Constants';
import MessageDialog from '../Components/UI/MessageDialog';

/* GCM */
import GcmAndroid from 'react-native-gcm-android';
import Notification from 'react-native-system-notification';

function notify(data) {
    if (data && data.subject && data.message) {
        Notification.create({
            subject: data.subject,
            message: data.message,
            smallIcon: 'drop',
            largeIcon: 'drop_large'
        });
    }
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
            notify(GcmAndroid.launchNotification);
            GcmAndroid.stopService();
        }
    }

    static launchLiveNotification(clickCallback) {
        GcmAndroid.addEventListener('notification', function (notification) {
            console.log('receive gcm notification', notification);
            notify(notification.data);
        });

        DeviceEventEmitter.addListener('sysNotificationClick', function (e) {
            if (clickCallback) clickCallback(e);
            console.log('sysNotificationClick', e);
        });

        GcmAndroid.requestPermissions();
    }
};



