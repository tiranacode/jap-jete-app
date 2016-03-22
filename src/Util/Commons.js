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
     * @param date
     * @returns {string}
     */
    static getFormattedDate(date) {
        return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    }

    /**
     * Get hh:mm format of date
     * @param date
     * @returns {string}
     */
    static getFormattedTime(date) {
        return date.getHours() + ":" + date.getMinutes();
    }
}