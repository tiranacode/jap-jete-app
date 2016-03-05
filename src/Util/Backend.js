import React, {AsyncStorage, ToastAndroid } from 'react-native';
import Constants from '../Configs/Constants';
import {Endpoints} from '../Configs/Url';
import {Profile} from '../Domain/Profile';
import _ from 'lodash';

function saveUserDetails(facebookData) {
    var userProfile = new Profile(
        facebookData.name,
        facebookData.email,
        facebookData.id
    );
    AsyncStorage.setItem(Constants.StorageKeys.USER, JSON.stringify(userProfile));
}

export function doServerLogin(onLoginSuccess, onLoginError) {
    let gcmID = "";

    AsyncStorage.multiGet([Constants.StorageKeys.USER_ID, Constants.StorageKeys.FB_TOKEN])
        .then((data) => {
            let obj = _.fromPairs(data);
            return obj;
        })
        .then((obj) => {
            let user_id = obj[Constants.StorageKeys.USER_ID];
            let fb_token = obj[Constants.StorageKeys.FB_TOKEN];
            let body = JSON.stringify({
                user_id: user_id,
                gcmID: gcmID,
                fb_token: fb_token
            });
            fetch(Endpoints.LOGIN, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                timeout: 2000,
                body: body
            }).then(function (res) {
                console.log("Success");
                console.dir(res);
                return res.json();
            }).then(function (res) {
                let status = res.status;
                if (status == "OK") {
                    let session_token = res.session_token;
                    AsyncStorage.setItem(Constants.StorageKeys.SESSION_TOKEN, session_token);
                    AsyncStorage.getItem(Constants.StorageKeys.SESSION_TOKEN)
                        .then((session_token) => {
                            console.log("Logged in with session_token " + session_token);
                            onLoginSuccess(session_token);
                        });
                } else {
                    console.log("Status Not OK");
                    if (onLoginError) onLoginError();
                }
            }).catch((err) => {
                console.log("Catched Network Exception");
                console.dir(err);
                if (onLoginError) onLoginError();
            });
        });
    return true;
}

export function doFBLogin(e, onLoginSuccess, onLoginError) {
    if (e && e.profile && e.token) {
        let userId = e.profile.id;
        let fbToken = e.token;
        AsyncStorage.setItem(Constants.StorageKeys.USER_ID, userId);
        AsyncStorage.setItem(Constants.StorageKeys.FB_TOKEN, fbToken);
        saveUserDetails(e.profile);
        doServerLogin(onLoginSuccess, onLoginError);
    } else {
        onLoginError();
    }
}
