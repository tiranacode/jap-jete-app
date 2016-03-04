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

export function do_server_login(on_login_success, on_login_error) {
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
                            on_login_success(session_token);
                        });
                } else {
                    console.log("Status Not OK");
                    //TODO - Handle
                    if (on_login_error) on_login_error();
                }
            }).catch((err) => {
                console.log("Catched Network Exception");
                console.dir(err);
                if (on_login_error) on_login_error();
            });
        });
    return true;
}

export function do_fb_login(e, on_login_success, on_login_error) {
    // TODO: Check for valid response
    let user_id = e.profile.id;
    let fb_token = e.token;
    AsyncStorage.setItem(Constants.StorageKeys.USER_ID, user_id);
    AsyncStorage.setItem(Constants.StorageKeys.FB_TOKEN, fb_token);
    saveUserDetails(e.profile);
    do_server_login(on_login_success, on_login_error);
}


// fetch('https://graph.facebook.com/me?access_token=' + fb_token + '&fields=id,name')
//     .then(function(res) {
//         console.log(res.json());
//     })
//     .catch(function(err) {
//         console.log("error");
//         console.log(err.json());
//     });
