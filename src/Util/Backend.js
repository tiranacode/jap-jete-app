import React, {AsyncStorage, ToastAndroid } from 'react-native';
import Constants from '../Configs/Constants';
import {Endpoints} from '../Configs/Url';
import {Profile} from '../Domain/Profile';
import _ from 'lodash';
import MessageDialog from '../Components/UI/MessageDialog';

function saveUserDetails(facebookData) {
    var userProfile = new Profile(
        facebookData.name,
        facebookData.email,
        facebookData.id
    );
    AsyncStorage.setItem(Constants.StorageKeys.USER, JSON.stringify(userProfile));
}

export function doServerLogin(onLoginSuccess, onLoginError) {
    //Get GCM ID
    AsyncStorage.getItem(Constants.StorageKeys.GCM_ID)
        .then((gcmID) => {
            //Get User Params
            AsyncStorage.multiGet([Constants.StorageKeys.USER_ID, Constants.StorageKeys.FB_TOKEN])
                .then((data) => {
                    let params = _.fromPairs(data);
                    var requestParams = {};
                    requestParams[Constants.StorageKeys.USER_ID] = params[Constants.StorageKeys.USER_ID];
                    requestParams[Constants.StorageKeys.FB_TOKEN] = params[Constants.StorageKeys.FB_TOKEN];
                    requestParams[Constants.StorageKeys.GCM_ID] = gcmID;
                    let body = JSON.stringify(requestParams);
                    MessageDialog.debug("Sending Body: " + body);
                    fetch(Endpoints.LOGIN, {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: body
                    }).then(function (res) {
                        MessageDialog.debug("Login Success " + JSON.stringify(res));
                        let status = res.status;
                        if (status == 200) {
                            let sessionToken = res.session_token;
                            AsyncStorage.setItem(Constants.StorageKeys.SESSION_TOKEN, sessionToken);
                            AsyncStorage.getItem(Constants.StorageKeys.SESSION_TOKEN)
                                .then((sessiontoken) => {
                                    console.log("Logged in with session_token " + sessiontoken);
                                    onLoginSuccess(sessiontoken);
                                });
                        } else {
                            console.log("Status Not OK");
                            if (onLoginError) onLoginError();
                        }
                    }).catch((err) => {
                        MessageDialog.debug("Catched Network Exception", obj);
                        if (onLoginError) onLoginError();
                    });
                })
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
