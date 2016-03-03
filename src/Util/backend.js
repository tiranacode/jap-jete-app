import React, {AsyncStorage, ToastAndroid } from 'react-native';
import Constants from '../Configs/Constants';
import {Endpoints} from '../Configs/Url';
import {Profile} from '../Domain/Profile';
import _ from 'lodash';
import GcmAndroid from 'react-native-gcm-android';

function saveUserDetails(facebookData) {
    var userProfile = new Profile(
        facebookData.name,
        facebookData.email,
        facebookData.id
    );
    AsyncStorage.setItem(Constants.StorageKeys.USER, JSON.stringify(userProfile));
}

export function do_server_login(on_login_success) {
    // TODO: Register gcmID

    let gcmID = "";

    /**
     * Set Furst Time GCM Token
     */
    AsyncStorage.getItem(Constants.StorageKeys.GCM_TOKEN).then((token) => {
        if (!token) {
            console.log('no gcm tokan stored locally', token);
            GcmAndroid.addEventListener('register', function (token) {
                gcmID = token;
                AsyncStorage.setItem(Constants.StorageKeys.GCM_TOKEN, token);
                console.log('send gcm token to server', token);
            });

            GcmAndroid.addEventListener('registerError', function (error) {
                AsyncStorage.setItem(Constants.StorageKeys.GCM_TOKEN, '');
                console.log('registerError', error.message);
            });
        }
    });

    AsyncStorage.multiGet([Constants.StorageKeys.USER_ID, Constants.StorageKeys.FB_TOKEN])
        .then((data) => {
            let obj = _.fromPairs(data);
            return obj;
        })
        .then((obj) => {
            let user_id = obj[Constants.StorageKeys.USER_ID];
            let fb_token = obj[Constants.StorageKeys.FB_TOKEN];
            fetch(Endpoints.LOGIN, {
                method: 'post',
                synchronous: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: user_id,
                    gcmID: gcmID,
                    fb_token: fb_token
                })
            }).then(function (res) {
                console.log(res);
                return res.json();
            }).then(function (res) {
                let status = res.status;
                if (status == "OK") {
                    let session_token = res.session_token;
                    AsyncStorage.setItem(Constants.StorageKeys.SESSION_TOKEN, session_token);
                    AsyncStorage.getItem(Constants.StorageKeys.SESSION_TOKEN)
                        .then((session_token) => {
                            console.log("Logged in with session_token " + session_token);
                            on_login_success(session_token);
                        });
                }
                else {
                    // TODO: Handle this
                }
            });
        });


}

export function do_fb_login(e, on_login_success) {
    // TODO: Check for valid response
    // console.log(e);

    let user_id = e.profile.id;
    let fb_token = e.token;
    AsyncStorage.setItem(Constants.StorageKeys.USER_ID, user_id);
    AsyncStorage.setItem(Constants.StorageKeys.FB_TOKEN, fb_token);

    saveUserDetails(e.profile);
    do_server_login(on_login_success);

}


// fetch('https://graph.facebook.com/me?access_token=' + fb_token + '&fields=id,name')
//     .then(function(res) {
//         console.log(res.json());
//     })
//     .catch(function(err) {
//         console.log("error");
//         console.log(err.json());
//     });
