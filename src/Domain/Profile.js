'use strict';
export var Profile = class {
    constructor(username, email, facebookId) {
        this.username = username,
        this.email = email;
        this.facebookId = facebookId;
        this.phoneNumber = "";
        this.location = "";
        this.group = "";
        this.photo = 'https://graph.facebook.com/' + this.facebookId + '/picture?width=9999';
    }
};

export let ProfileUISchema = {
    username: {
        icon: "user"
    },
    group: {
        icon: "tint"
    },
    email: {
        icon: "envelope"
    },
    phoneNumber: {
        icon: "phone-square"
    },
    location: {
        icon: "map"
    }
};