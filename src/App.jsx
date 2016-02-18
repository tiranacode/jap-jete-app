/**
 * Application Entry Point
 */

'use strict';
import React, {Component, StyleSheet, Text, View, Navigator, TouchableHighlight} from 'react-native';
import {Router, Route, Schema, Animations, TabBar} from 'react-native-router-flux';
import {Actions} from 'react-native-router-flux'

import TestComponent from './Components/TestComponent';
import HomeView from './Views/Home'
import LoginView from './Views/Login'

import { API_ENDPOINT } from './Configs/Url';

/**
 * Main Component
 */
export default class JapJete extends Component {
    render() {
        return (
            <Router hideNavBar={true} hideTabBar={true}>
                <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
                <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
                <Route name="login" hideTabBar={true} hideNavBar={true} component={LoginView} initial={true} wrapRouter={true} title="Login"/>
                <Route name="home" component={HomeView} title="Home"/>
            </Router>
        );
    }
}

/**
 * Main Application Style
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    }
});