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
            NO_HISTORY: "Ju nuk keni dhuruar gjak.",
            NO_DATA: "Per momentin nuk ka nevoja urgjente per gjak."
        },
        Tabs: {
            HOME: "Dhuro",
            DASHBOARD: "Kalendari",
            PROFILE: "Profili",
            HISTORY: "Historiku",
            SETTINGS: "Preferenca",
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
            MODIFY: 'Modifiko',
            YOUR_ACCOUNT: 'Profili Juaj',
            LOGOUT: 'Logout',
            ERROR: 'Gabim',
            CANCEL: 'Hiq',
        }
    }
};

export default labels.sq;