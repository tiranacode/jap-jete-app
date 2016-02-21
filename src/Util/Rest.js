'use strict';
import {HttpHeaders} from '../Configs/Url.js'

export default class Rest {

    /**
     * READ (GET Request)
     * @param url
     * @param queryParam
     * @param success
     * @param error
     * @constructor
     */
    static READ(url, queryParam, success, error) {
        //TODO - Create Query Params
        return fetch(url, {
            method: 'GET',
            headers: HttpHeaders
        }).then((res) => success(res)).catch((res) => error(res))
    }

    /**
     * CREATE (Post Request)
     * @param url
     * @param body
     * @param success
     * @param error
     * @constructor
     */
    static CREATE(url, body, success, error) {
        fetch(url, {
            method: 'PUT',
            headers: HttpHeaders,
            body: JSON.stringify(body)
        }).then((res) => success(res)).catch((res) => error(res))
    }

    /**
     * UPDATE (POST Request)
     * @param url
     * @param body
     * @param success
     * @param error
     * @constructor
     */
    static UPDATE(url, body, success, error) {
        fetch(url, {
            method: 'POST',
            headers: HttpHeaders,
            body: JSON.stringify(body)
        }).then((res) => success(res)).catch((res) => error(res))
    }

    /**
     * Delete (DELETE Request)
     * @param url
     * @param queryParam
     * @param success
     * @param error
     * @constructor
     */
    static DELETE(url, queryParam, success, error) {
        //TODO - Create Query Params
        fetch(url, {
            method: 'DELETE',
            headers: HttpHeaders,
            body: JSON.stringify(body)
        }).then((res) => success(res)).catch((res) => error(res))
    }

}