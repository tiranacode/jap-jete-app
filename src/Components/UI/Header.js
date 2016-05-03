'use strict';

import React, {Component, View, Text, StyleSheet, TouchableOpacity, Navigator, Dimensions} from "react-native";
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

    _goBack(navigator) {
        navigator.pop();
    }

    render() {
        return (
            <View style={[styles.topBar,{ backgroundColor: this.props.color || AppStyle.Colors.FG}]}>
                <TouchableOpacity style={styles.titleWrapper}
                                  onPress={() => {if (this.props.nestedView)
                                  {this._goBack(this.props.navigator)}}}>
                    {
                        (this.props.nestedView) ?
                            <Icon name="android-arrow-back" size={25} color="#fff" style={styles.backIcon}/>
                            : null
                    }
                    <Text style={styles.title}>{this.props.title}</Text>
                </TouchableOpacity>
                {
                    this.props.hideActionButtons ?
                        null
                        : <TouchableOpacity onPress={() => {this._goToSettings(this.props.navigator)}}
                                            style={styles.settingsBtn}>
                        <Icon name="gear-a" size={25} color="#fff" style={styles.settingsIcon}/>
                    </TouchableOpacity>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        color: 'white',
        fontSize: 20,
        marginLeft: 10,
        marginTop: 10
    },
    settingsBtn: {
        position: 'absolute',
        right: 10,
        top: 10
    },
    titleWrapper: {
        flexDirection: 'row',
        width: Dimensions.get('window').width - 100
    },
    settingsIcon: {},
    backIcon: {
        marginLeft: 15,
        marginTop: 12
    },
    topBar: {
        height: 50
    }
});