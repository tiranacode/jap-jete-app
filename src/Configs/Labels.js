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
        LOGIN: "Identifikohu",
        NO_NETWORK: "Nuk u mundesua lidhja me internetin",
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
            YOUR_ACCOUNT: 'Profili Juaj'
        }
    }
});

labels.setLanguage('sq');
export default labels;