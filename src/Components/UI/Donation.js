'use strict';

import React, {Component, View, Text, StyleSheet, TouchableOpacity, Navigator, Dimensions} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {AppStyle} from "../../Styles/CommonStyles";
import CommonUtils from "../../Util/Commons";
import MessageDialog from "../UI/MessageDialog";

export default class Donation extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        MessageDialog.show("Test", this.props.data.start_date);
        return (
            <TouchableOpacity style={styles.container}>
                <View style={styles.left}>
                    <Icon
                        name="ios-calendar-outline"
                        size={60}
                        color="#555"
                        style={styles.toolbarBtn}/>
                    <Text style={styles.calendarDate}>{this.props.data.start_date}</Text>
                </View>
                <View style={styles.right}>
                    <Text style={styles.date}>{CommonUtils.getFormattedDateTime(new Date(this.props.data.start_date))} </Text>
                    <Text style={styles.date}>{CommonUtils.getFormattedDateTime(new Date(this.props.data.end_date))} </Text>
                    <Text style={styles.hospital}>{this.props.data.name}</Text>
                    <Text>{this.props.data.rand}</Text>
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
    endDate: {},
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