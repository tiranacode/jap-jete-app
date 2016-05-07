'use strict';

import React, {Component, View, Text, StyleSheet, TouchableOpacity, Navigator, Dimensions} from "react-native";
import {AppStyle} from "../../Styles/CommonStyles";
import CommonUtils from "../../Util/Commons";

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
                        <Text style={styles.amount}>{this.props.data.amount} L </Text>
                    </View>
                    <View style={styles.datetime}>
                        <Text style={styles.date}>{CommonUtils.getFormattedDate(new Date(this.props.data.date))}</Text>
                        <Text style={styles.time}>{CommonUtils.getFormattedTime(new Date(this.props.data.date))}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        backgroundColor: 'white',
        flex: 1,
        padding: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        flexDirection: 'row'
    },
    title: {
        fontSize: 12,
        color: '#222'

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
        fontSize: 15,
        color: AppStyle.Colors.FG
    },
    amount: {
        fontSize: 15
    },
});