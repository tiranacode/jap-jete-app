/**
 * This configuration provides URLS and Endpoints
 */

var API_URL = "http://52.59.251.182/api/v1/";
//var API_URL = "http://192.168.1.17:8080/";

export const Endpoints = {
    LOGIN: API_URL + "login/",
    USER: API_URL + "user/",
    PROFILE: API_URL + "/profile"
};

export const HttpHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};