'use strict';

import React, {Component, View, Text, StyleSheet, TouchableOpacity, Navigator} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {AppStyle} from "../../Styles/CommonStyles";

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    _goToSettings(navigator) {
        navigator.push({id: 'Settings'})
    }

    render() {
        return (
            <View style={styles.topBar}>
                <Text style={styles.title}>{this.props.title}</Text>
                <TouchableOpacity onPress={() => {this._goToSettings(this.props.navigator)}} style={styles.settingsBtn}>
                    <Icon name="gear-a" size={25} color="#fff" style={styles.settingsIcon}/>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        color: 'white',
        fontSize: 20,
        marginLeft: 10,
    },
    settingsBtn: {
        position: 'absolute',
        right: 10,
        top: 10
    },
    settingsIcon: {},
    topBar: {
        height: 50,
        backgroundColor: AppStyle.Colors.FG
    }
});