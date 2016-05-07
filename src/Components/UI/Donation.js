'use strict';

import React, {Component, View, Text, StyleSheet, TouchableOpacity, Navigator, Dimensions} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {AppStyle} from "../../Styles/CommonStyles";

export default class Donation extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <TouchableOpacity style={styles.container}>
                <View style={styles.left}>
                    <Icon
                        name="ios-calendar-outline"
                        size={60}
                        color="#555"
                        style={styles.toolbarBtn}/>
                    <Text style={styles.calendarDate}>18</Text>
                </View>
                <View style={styles.right}>
                    <Text style={styles.date}>8 Shkurt 2016, 14:30</Text>
                    <Text style={styles.hospital}>Spitali Nene tereza</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
        width: Dimensions.get('window').width,
        backgroundColor: 'white',
        height: 80,
        paddingTop: 20
    },
    left: {
        flex: 0.5,
        position: 'absolute',
        left: 20,
        top: 10
    },
    right: {
        flex: 0.5,
        position: 'absolute',
        top: 20,
        left: 80
    },
    date: {},
    hospital: {
        fontWeight: 'bold'
    },
    calendarDate: {
        position: 'absolute',
        top: 22,
        left: 12,
        fontSize: 18,
        color: AppStyle.Colors.FG,
        fontWeight: 'bold'
    }
});