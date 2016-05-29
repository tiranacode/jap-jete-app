'use strict';

export default class CommonUtils {
    /**
     * Get query String from object
     * @param obj
     * @returns {string}
     */
    static getQueryStringFromObject(obj) {
        if (!obj) {
            return "";
        } else {
            var result = "?";
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    result += (key + "=" + obj[key] + "&");
                }
            }
            return result.substr(0, result.length - 1);
        }
    }

    /**
     * Get dd/mm/yyyy format of date
     * @param ts
     * @returns {string}
     */
    static getFormattedDate(ts) {
        var date = new Date(ts * 1000);
        return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    }

    /**
     * Get hh:mm format of date
     * @param ts
     * @returns {string}
     */
    static getFormattedTime(ts) {
        var date = new Date(ts * 1000);
        return date.getHours() + ":" + date.getMinutes();
    }

    /**
     * Get dd/mm/yyyy hh:mm format of date
     * @param ts
     * @returns {string}
     */
    static getFormattedDateTime(ts) {
        return CommonUtils.getFormattedDate(ts) + " " + CommonUtils.getFormattedTime(ts);
    }
}