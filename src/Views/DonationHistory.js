/**
 * History of donations for the user
 */

'use strict';
import React, {
    Component,
    StyleSheet,
    View,
    Text,
    ListView,
    TouchableHighlight,
    TouchableOpacity,
    ScrollView
} from "react-native";
import Labels from "../Configs/Labels";
import {AppStyle} from "../Styles/CommonStyles";
import EmptyContent from "../Components/UI/EmptyContent";
import DonationListItem from "../Components/UI/DonationListItem";
import IO from "../Util/IO";
import Rest from "../Util/Rest";
import {Endpoints} from "../Configs/Url";
import Constants from "../Configs/Constants";
import MessageDialog from "../Components/UI/MessageDialog";
import PTRView from "react-native-pull-to-refresh";
import ViewMetaBar from "../Components/UI/ViewMetaBar";

export default class HistoryView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this._retrieveDonationHistory = this._retrieveDonationHistory.bind(this);
        this._renderDataContent = this._renderDataContent.bind(this);
    }

    componentDidMount() {
        this._retrieveDonationHistory();
    }

    /**
     * Retrieve Donation History from API
     * @param page
     * @param callback
     * @param options
     * @private
     */
    _retrieveDonationHistory() {
        IO.getSessionToken().then((sessionToken) => {
            IO.getUser().then((user) => {
                if (sessionToken && user) {
                    let userId = JSON.parse(user).facebookId;
                    let params = {};
                    params[Constants.StorageKeys.SESSION_TOKEN] = sessionToken;
                    let url = Endpoints.DONATION_HISTORY + userId;
                    Rest.read(url, params, (res) => {
                        //TODO - Remove
                        res.json().then((res) => {
                            res = {
                                "history": {
                                    "user": 1235,
                                    "history": [{
                                        "date": (new Date()).getTime(),
                                        "amount": 20,
                                        "hospital": "QSUT"
                                    }, {"date": (new Date()).getTime(), "amount": 50, "hospital": "QSUT"}]
                                }
                            };
                            if (res.history) {
                                this.setState({
                                    data: res.history.history
                                });
                            }
                        });
                    }, (res) => {
                        console.error(res);
                        MessageDialog.show(Labels.Ui.ERROR, Labels.Messages.NETWORK_ERROR);
                    });
                }
            });
        });
    }

    /**
     * Render a row
     * @param {object} rowData Row data
     */
    _renderRowView() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {
                        this.state.data.map((donHistory) => {
                            return (
                                <DonationListItem data={donHistory} key={donHistory.amount.toString()}/>
                            )
                        })
                    }
                </ScrollView>
            </View>
        )
    }

    _renderEmptyView() {
        return (
            <View style={styles.empty}>
                <EmptyContent label={Labels.Messages.NO_HISTORY} icon={AppStyle.Icons.EMPTY_DATA}/>
            </View>
        )
    }

    _renderDataContent() {
        if (!this.state.data.length) {
            return this._renderEmptyView();
        } else {
            return this._renderRowView();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ViewMetaBar description={Labels.Footers.DONATION_HISTORY}
                             icon={AppStyle.Icons.footer.DONATION_HISTORY}/>
                <PTRView onRefresh={this._retrieveDonationHistory} progressBackgroundColor={AppStyle.Colors.BG}>
                    {this._renderDataContent()}
                </PTRView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    empty: {
        flex: 1,
        marginTop: 100
    }
});