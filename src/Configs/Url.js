/**
 * This configuration provides URLS and Endpoints
 */

var API_URL = "http://52.59.251.182/api/v1/";
//var API_URL = "http://192.168.1.17:8080/";

export const Endpoints = {
    LOGIN: API_URL + "login/",
    USER: API_URL + "user/",
    DONATION_CAMPAIGN: API_URL + "campaigns/",
    DONATION_HISTORY: API_URL + "donations/",
    HOSPITALS: API_URL + "hospitals/",
    PROFILE: API_URL + "/profile",
    SHARE: "https://play.google.com/store/apps/details?id=com.tiranacode.japjete"
};

export const HttpHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};