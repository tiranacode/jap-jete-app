/**
 * This configuration provides labels for the application
 * By Default sq language is used
 */

'use strict';
import LocalizedStrings from 'react-native-localization';

let labels = new LocalizedStrings({
    en: {
        LOGIN: "Login",
        NO_NETWORK: "No Internet Connection"
    },
    sq: {
        APP_NAME: "Jap Jete",
        LOGIN: "Identifikohu",
        Messages: {
            NO_NETWORK: "Nuk u mundesua lidhja me internetin",
            FACEBOOK_LOGIN_ERROR: "Pati nje problem me identifikimin"
        },
        Tabs: {
            HOME: "Hyrje",
            DASHBOARD: "Kalendari",
            PROFILE: "Profili"
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
});

labels.setLanguage('sq');
export default labels;