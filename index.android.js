/**
 * JapJete React Native App
 */

'use strict';
import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View
} from 'react-native';

import TestComponent from './src/Components/TestComponent';
import HomeView from './src/Views/Home'
import LoginView from './src/Views/Login'

/**
 * Url Configs
 */
import {
    API_ENDPOINT
} from './src/Configs/Url';

/**
 * Main Component
 */
class JapJete extends Component {
    render() {
        return (
            <View>
                <HomeView/>
                <LoginView/>
            </View>
        );
    }
}

/**
 * Main Application Style
 */
const styles = StyleSheet.create({});

AppRegistry.registerComponent('JapJete', () => JapJete);
