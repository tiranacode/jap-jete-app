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
        }
    }
});

labels.setLanguage('sq');
export default labels;