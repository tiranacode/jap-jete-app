/**
 * Donation View, Lists Donations Campaign list and open its details
 */

'use strict';
import React, {Component, StyleSheet, View, Text, ScrollView, Dimensions} from "react-native";
import {MKColor} from "react-native-material-kit";
import InstantActionBtn from "../Components/UI/InstantActionBtn";
import Labels from "../Configs/Labels";
import {AppStyle} from "../Styles/CommonStyles";
import EmptyContent from "../Components/UI/EmptyContent";
import DonationCampaignListItem from "../Components/UI/DonationCampaignListItem";
import PTRView from "react-native-pull-to-refresh";
import IO from "../Util/IO";
import Rest from "../Util/Rest";
import {Endpoints} from "../Configs/Url";
import Constants from "../Configs/Constants";
import MessageDialog from "../Components/UI/MessageDialog";
import ViewMetaBar from "../Components/UI/ViewMetaBar";

export default class HomeView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this._retrieveCampaign = this._retrieveCampaign.bind(this);
        this._renderDataContent = this._renderDataContent.bind(this);
    }

    componentDidMount() {
        this._retrieveCampaign();
    }

    /**
     * Retrieve campaign data from API
     */
    _retrieveCampaign() {
        IO.getSessionToken().then((sessionToken) => {
            IO.getUser().then((user) => {
                if (sessionToken && user) {
                    let userId = JSON.parse(user).facebookId;
                    let params = {};
                    params[Constants.StorageKeys.SESSION_TOKEN] = sessionToken;
                    params[Constants.StorageKeys.USER_ID] = userId;
                    Rest.read(Endpoints.DONATION_CAMPAIGN, params, (res) => {
                        res.json().then((res) => {
                            console.log(res);
                            for (var i = 0; i < 20; i++) {
                                res.campains.push(res.campains[0]);
                            }
                            //TODO - Remove when issue #22 is solved
                            res.campains.forEach((c) => {
                                c.start_date = (new Date()).getTime();
                                c.end_date = (new Date()).getTime();
                            });
                            this.setState({
                                data: res.campains
                            });
                        });
                    }, (res) => {
                        console.error(res);
                        MessageDialog.show(Labels.Ui.ERROR, Labels.Messages.NETWORK_ERROR);
                    });
                }
            });
        });
    }

    _renderEmptyView() {
        return (
            <View style={styles.empty}>
                <EmptyContent label={Labels.Messages.NO_HISTORY} icon={AppStyle.Icons.EMPTY_DATA}/>
            </View>
        )
    }

    _renderRowView() {
        var count = 0;
        return (
            <ScrollView>
                {
                    this.state.data.map((donation) => {
                        count++;
                        return (
                            <DonationCampaignListItem navigator={this.props.navigator} data={donation} key={count}/>
                        )
                    })
                }
            </ScrollView>
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
                <ViewMetaBar description={Labels.Footers.DONATION_CAMPAIGN}
                             icon={AppStyle.Icons.footer.DONATION_CAMPAIGN}/>
                <PTRView onRefresh={this._retrieveCampaign} progressBackgroundColor={AppStyle.Colors.BG}>
                    {this._renderDataContent()}
                </PTRView>
                <InstantActionBtn icon={AppStyle.Icons.HEART}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        height: Dimensions.get('window').height,
    },
    empty: {
        flex: 1,
        marginTop: 100
    }
});