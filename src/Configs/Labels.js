/**
 * This configuration provides labels for the application
 * By Default sq language is used
 */

'use strict';
let labels = {
    sq: {
        APP_NAME: "Jap Jete",
        LOGIN: "Identifikohu",
        Messages: {
            NO_NETWORK: "Nuk u mundesua lidhja me internetin",
            FACEBOOK_LOGIN_ERROR: "Pati nje problem me identifikimin, Ju lutem provoni me vone",
            GPS_ERROR: "Pati nje problem me marrjen e pozicionit gjeografik, Ju lutem ndizni Location",
            PROFILE_UPDATE_ERROR: "Pati nje problem me perditesimin e profilit.",
            PROFILE_UPDATE_SUCCESS: "Profili u modifikua me sukses",
            NO_HISTORY: "Ju nuk keni dhuruar gjak.",
            NO_DATA: "Per momentin nuk ka nevoja urgjente per gjak.",
            HELP: "Nuk ka asnje permbajtje ndihme."
        },
        Tabs: {
            HOME: "Dhuro",
            HOSPITALS: "Spitalet",
            PROFILE: "Profili",
            HISTORY: "Historiku",
            SETTINGS: "Preferenca",
            HELP: "Ndihma",
        },
        Domain: {
            User: {
                USERNAME: 'Emri',
                PHONE_NUMBER: 'Nr Telefoni',
                LOCATION: 'Vendodhja',
                EMAIL: 'Email',
                GROUP: 'Grupi i Gjakut'
            }
        },
        Ui: {
            MODIFY: 'Modifiko Profilin',
            YOUR_ACCOUNT: 'Profili',
            LOGOUT: 'Logout',
            ERROR: 'Gabim',
            CANCEL: 'Hiq',
            SETTINGS: "Preferencat",
            CHOOSE_BLOOD: "Zgjidh grupin e gjakut",
            OK: "OK"
        }
    }
};

export default labels.sq;