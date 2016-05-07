'use strict';

import React, {Component, View, Text, StyleSheet, TouchableOpacity, Navigator, Dimensions} from "react-native";
import {AppStyle} from "../../Styles/CommonStyles";
import CommonUtils from "../../Util/Commons";
import Icon from "react-native-vector-icons/Ionicons";

export default class Donation extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this._prepareData = this._prepareData.bind(this);
    }

    componentDidMount() {
        this._prepareData();
    }

    componentWillReceiveProps() {
        this._prepareData();
    }

    _prepareData() {
    }

    render() {
        return (
            <TouchableOpacity>
                <View style={styles.row}>
                    <View style={styles.otherDetail}>
                        <Text style={styles.title}>{this.props.data.hospital}</Text>
                        <Text style={styles.date}>{CommonUtils.getFormattedDate(new Date(this.props.data.date))}</Text>
                        <Text style={styles.time}>{CommonUtils.getFormattedTime(new Date(this.props.data.date))}</Text>
                    </View>
                    <View style={styles.datetime}>
                        <Icon
                            name="waterdrop"
                            size={45}
                            color={AppStyle.Colors.FG}
                            style={styles.toolbarBtn}/>
                        <Text style={styles.amount}>{this.props.data.amount} L </Text>
                    </View>
                </View>
                <View style={styles.separator}></View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        padding: 20,
        flexDirection: 'row'
    },
    separator: {
        marginLeft: 50,
        marginRight: 50,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        height: 2,
    },
    title: {
        fontSize: 15,
        color: '#222',
        fontWeight: 'bold',
        marginBottom: 5

    },
    otherDetail: {
        justifyContent: 'flex-start'

    },
    datetime: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    date: {
        textAlign: 'right',
        fontSize: 12
    },
    time: {
        textAlign: 'center',
        fontSize: 12,
    },
    amount: {
        fontSize: 14,
        fontWeight: 'bold'
    },
});