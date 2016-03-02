/**
 * This configuration provides URLS and Endpoints
 */

//var API_URL = "http://52.59.251.182/api/v1/";
var API_URL = "http://192.168.1.95:5000/api/v1/";

export const Endpoints = {
    LOGIN: API_URL + "login/",
    LOGIN: API_URL + "user/",
    PROFILE: API_URL + "/profile"
};

export const HttpHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};