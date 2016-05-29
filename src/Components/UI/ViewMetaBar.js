'use strict';

import React, {Component, View, Text, StyleSheet, Dimensions} from "react-native";
import Icon from "../../../node_modules/react-native-vector-icons/FontAwesome";
import {AppStyle} from "../../Styles/CommonStyles";

export default class Footer extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.left}>
                    <Icon name={this.props.icon} size={24} color={AppStyle.Colors.FG} style={styles.icon}/>
                </View>
                <View style={styles.right}>
                    <Text style={styles.description}>{this.props.description}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: 60,
        backgroundColor: 'white',
        bottom: 0,
        flexDirection: 'row',
        borderBottomColor: '#efefef',
        borderBottomWidth: 1,
    },
    icon: {},
    left: {
        marginLeft: 20,
        marginTop: 18,
    },
    right: {
        marginTop: 22,
        marginLeft: 10
    },
    description: {
        fontSize: 10,
        color: "#888"
    }
});