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
import PTRView from "react-native-pull-to-refresh";
import ViewMetaBar from "../Components/UI/ViewMetaBar";
import Header from "../Components/UI/Header";
import RNGMap from "react-native-gmaps";

export default class DonationDetailsView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }

    componentDidMount() {

    }

    _renderEmptyView() {
        return (
            <View style={styles.empty}>
                <EmptyContent label={Labels.Messages.NO_HISTORY} icon={AppStyle.Icons.EMPTY_DATA}/>
            </View>
        )
    }


    _renderDataContent() {
        return (
            <RNGMap
            ref={'gmap'}
            style={
                { 
                    height: 300, width: Dimensions.get('window').width 
                }
            }
            markers={[{coordinates: {lng: 0.1, lat: 51.0}}]}
            zoomLevel={10}
            onMapChange={(e) => console.log(e)}
            onMapError={(e) => console.log('Map error --> ', e)}
            center={{ lng: 0.1, lat: 51.0 }}
            clickMarker={0}/>       
        )
    }

    render() {
        return (
            <View>
                <Header navigator={this.props.navigator} title={Labels.Ui.YOUR_ACCOUNT} hideActionButtons={true}
                        color={AppStyle.Colors.FG} nestedView={true}/>
                <View style={styles.container}>
                    <ViewMetaBar description={Labels.Footers.DONATION_CAMPAIGN}
                                 icon={AppStyle.Icons.footer.DONATION_CAMPAIGN}/>
                    <PTRView onRefresh={this._retrieveCampaign} progressBackgroundColor={AppStyle.Colors.BG}>
                        {this._renderDataContent()}
                    </PTRView>
                    <InstantActionBtn icon={AppStyle.Icons.HEART}/>
                </View>
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