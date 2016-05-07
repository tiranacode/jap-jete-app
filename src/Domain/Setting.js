var settingKeys = {
    NOTIFICATIONS: "notifications",
    DARK_HEADER: "darkHeader"
};

var self = null;

'use strict';
export default class {

    constructor(settings) {
        if (settings) {
            if (typeof settings == "string") {
                this.settings = JSON.parse(settings);
            } else if (typeof settings == "object") {
                this.settings = settings;
            }
        } else {
            this.settings = {};
            this.settings[settingKeys.NOTIFICATIONS] = false;
            this.settings[settingKeys.DARK_HEADER] = false;
        }
        self = this;
    }

    getSetting(key) {
        return self.settings[key] || null;
    }

    getAllSettings() {
        return this.settings;
    }

    setSetting(key, value) {
        this.settings[key] = value;
    }

    toString() {
        return JSON.stringify(this.settings);
    }

    /**
     * If any new setting is added add its key here and
     * add default value in constructor
     */
    static KEYS = settingKeys;
};