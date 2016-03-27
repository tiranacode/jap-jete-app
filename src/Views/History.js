/**
 * History of donations for the user
 */

'use strict';
import React, {Component, StyleSheet, View, Text, ListView, TouchableHighlight} from "react-native";
import GiftedListView from "react-native-gifted-listview";
import Labels from "../Configs/Labels";
import {AppStyle} from "../Styles/CommonStyles";
import CommonUtils from "../Util/Commons";
import EmptyContent from "../Components/UI/EmptyContent";

//TODO - Test Data, Remove
let history = [
    {
        hospital: "Spitali Nene Tereza",
        date: new Date(),
        amount: 20
    },
    {
        hospital: "Spitali Amerikan",
        date: new Date(),
        amount: 14
    }
];

export default class HistoryView extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    /**
     * Testing Fetch
     * @param page
     * @param callback
     * @param options
     * @private
     */
    _onFetch(page = 1, callback) {
        setTimeout(() => {
            var rows = history;
            if (page === 3) {
                callback(rows, {
                    allLoaded: true
                });
            } else {
                callback(rows);
            }
        }, 1000); // simulating network fetching
    }

    /**
     * Render a row
     * @param {object} rowData Row data
     */
    _renderRowView(data) {
        return (
            <View style={styles.row}>
                <View style={styles.otherDetail}>
                    <Text style={styles.title}>{data.hospital}</Text>
                    <Text style={styles.amount}>{data.amount} L </Text>
                </View>
                <View style={styles.datetime}>
                    <Text style={styles.date}>{CommonUtils.getFormattedDate(data.date)}</Text>
                    <Text style={styles.time}>{CommonUtils.getFormattedTime(data.date)}</Text>
                </View>
            </View>
        );
    }

    _renderEmptyView() {
        return (
            <View style={styles.empty}>
                <EmptyContent label={Labels.Messages.NO_HISTORY} icon={AppStyle.Icons.EMPTY_DATA}/>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <GiftedListView
                    emptyView={this._renderEmptyView}
                    rowView={this._renderRowView}
                    onFetch={this._onFetch}
                    firstLoader={true}
                    pagination={false}
                    refreshable={true}
                    withSections={false}
                    customStyles={{
                        paginationView: {}
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    row: {
        flex: 1,
        padding: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        flexDirection: 'row'
    },
    title: {
        fontSize: 12,
        color: '#222',

    },
    otherDetail: {
        justifyContent: 'flex-start'

    },
    datetime: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
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
    empty: {
        flex: 1,
        marginTop: 100,
    }
});