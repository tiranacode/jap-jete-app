'use strict';

import LocalizedStrings from 'react-native-localization';

let labels = new LocalizedStrings({
    en: {
        LOGIN: "Login"
    },
    sq: {
        LOGIN: "Identifikohu"
    }
});

/**
 * Albanian as Default Language
 */
labels.setLanguage('sq');
export default labels;