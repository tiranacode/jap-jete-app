import React, {AsyncStorage, ToastAndroid } from 'react-native';
var _ = require('lodash');

let LOGIN_ENDPOINT = "http://52.59.251.182/api/v1/login/";

export function do_server_login() {
    // TODO: Register gcmID

    let gcmID = "";
    // let user_id = AsyncStorage.getItem("user_id")
    //     .then((user_id) => {
    //         AsyncStorage.getItem("fb_token).
    //             then((fb_token))
    // let fb_token = AsyncStorage.getItem("fb_token");

    AsyncStorage.multiGet(["user_id", "fb_token"])
        .then((data) => {
            let obj = _.fromPairs(data);
            return obj;
        })
        .then((obj) => {
            let user_id = obj['user_id'];
            let fb_token = obj['fb_token'];
            fetch(LOGIN_ENDPOINT, {
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
            }).then(function(res) {
                console.log(res);
                return res.json();
            }).then(function(res) {
                let status = res.status;
                if (status == "OK") {
                    let session_token = res.session_token;
                    AsyncStorage.setItem("session_token", session_token);
                    AsyncStorage.getItem("session_token")
                        .then((session_token) => {
                            console.log("Logged in with session_token " + session_token);
                        });
                }
                else {
                    // TODO: Handle this
                }
            });
        });


}

export function do_fb_login(e) {
    // TODO: Check for valid response
    // console.log(e);

    let user_id = e.profile.id;
    let fb_token = e.token;
    AsyncStorage.setItem("user_id", user_id);
    AsyncStorage.setItem("fb_token", fb_token);
    do_server_login();

}


// fetch('https://graph.facebook.com/me?access_token=' + fb_token + '&fields=id,name')
//     .then(function(res) {
//         console.log(res.json());
//     })
//     .catch(function(err) {
//         console.log("error");
//         console.log(err.json());
//     });
