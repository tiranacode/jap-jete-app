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
            PROFILE_UPDATE_ERROR: "Pati nje problem me perditesimin e profilit."
        },
        Tabs: {
            HOME: "Hyrje",
            DASHBOARD: "Kalendari",
            PROFILE: "Profili",
            HISTORY: "Historiku"
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
            CANCEL: 'Hiq'
        }
    }
};

export default labels.sq;