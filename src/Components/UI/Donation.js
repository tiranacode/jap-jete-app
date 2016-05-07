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
            startDate: "",
            endDate: "",
            day: 1,
            hospital: ""
        };
        this._prepareData = this._prepareData.bind(this);
    }

    componentDidMount() {
        this._prepareData();
    }

    componentWillReceiveProps() {
        this._prepareData();
    }

    _prepareData() {
        this.setState({
            startDate: CommonUtils.getFormattedDateTime(new Date(this.props.data.start_date)),
            endDate: CommonUtils.getFormattedDateTime(new Date(this.props.data.end_date)),
            day: (new Date(this.props.data.start_date)).getDate(),
            name: this.props.data.name
        });
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
                    <Text style={[styles.calendarDate, {left: this.state.day > 9 ? 12 : 20}]}>{this.state.day}</Text>
                </View>
                <View style={styles.right}>
                    <Text style={styles.date}>{this.state.startDate}</Text>
                    <Text style={styles.hospital}>{this.state.name}</Text>
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
        fontSize: 18,
        color: AppStyle.Colors.FG,
        fontWeight: 'bold'
    }
});