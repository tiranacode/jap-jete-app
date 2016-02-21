'use strict';
export var Profile = class {
    constructor(username, group, email, phoneNumber, location) {
        this.username = username;
        this.group = group;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.location = location;
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