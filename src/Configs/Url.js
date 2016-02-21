/**
 * This configuration provides URLS and Endpoints
 */

var HOST = "http://localhost:8080";

export const API_ENDPOINT = {
    Profile: HOST + "/profile",
    Test: "http://jsonip.com/"
};

export const HttpHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'test'
};