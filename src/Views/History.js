/**
 * Main View of the application which provides navigation
 */

'use strict';
import React, {
    Component,
    StyleSheet,
    View,
    Text,
    ListView,
    TouchableHighlight
} from 'react-native';

import GiftedListView from 'react-native-gifted-listview';
import Labels from '../Configs/Labels';
import {AppStyle} from '../Styles/CommonStyles';
import CommonUtils from "../Util/Commons";

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
                <Text style={styles.title}>{data.hospital}</Text>
                <Text style={styles.date}>{CommonUtils.getFormattedDate(data.date)}</Text>
                <Text style={styles.amount}>{data.amount}</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <GiftedListView
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
        justifyContent: 'center'
    },
    row: {
        padding: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    title: {
        fontSize: 16,
        color: '#222'
    },
    date: {

    },
    amount: {

    }
});