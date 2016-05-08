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
import ViewMetaBar from "../Components/UI/ViewMetaBar";
import Header from "../Components/UI/Header";
import RNGMap from "react-native-gmaps";
import MessageDialog from "../Components/UI/MessageDialog";
import CommonUtils from "../Util/Commons";
import Icon from "../../node_modules/react-native-vector-icons/FontAwesome";

export default class DonationDetailsView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }

    componentDidMount() {

    }

    _subscribeToCampaign() {
        MessageDialog.show("Subscribing", "Subscribing")
    }

    _renderEmptyView() {
        return (
            <View style={styles.empty}>
                <EmptyContent label={Labels.Messages.NO_HISTORY} icon={AppStyle.Icons.EMPTY_DATA}/>
            </View>
        )
    }

    _refresh() {

    }

    _renderDataContent() {
        return (
            <View style={styles.container}>
                <RNGMap
                    ref={'gmap'}
                    style={
                {
                    height: 300, width: Dimensions.get('window').width
                }
            }
                    markers={[{coordinates: {lng: 0.1, lat: 51.0}}]}
                    zoomLevel={15}
                    onMapChange={(e) => console.log(e)}
                    onMapError={(e) => console.log('Map error --> ', e)}
                    center={{ lng: 0.1, lat: 51.0 }}
                    clickMarker={0}/>
                <ScrollView style={styles.detailsScrollView}>
                    <View style={[styles.hospitalBar]}>
                        <Icon
                            name="hospital-o"
                            size={32}
                            color={AppStyle.Colors.FG}
                            style={styles.locationIcon}>
                        </Icon>
                        <Text style={styles.hospitalBarText}>{this.props.data.hospital}</Text>
                    </View>

                    <View style={styles.dates}>
                        <Icon
                            name="clock-o"
                            size={32}
                            color={AppStyle.Colors.FG}
                            style={styles.locationIcon}>
                        </Icon>
                        <Text
                            style={styles.startDate}>{CommonUtils.getFormattedDateTime(new Date(this.props.data.start_date))}
                        </Text>
                        <Text
                            style={styles.endDate}>{CommonUtils.getFormattedDateTime(new Date(this.props.data.end_date))}</Text>
                    </View>
                    <Text style={styles.name}>{this.props.data.name}</Text>

                    <Text style={styles.message}>{this.props.data.message}</Text>
                    <Text style={styles.message}>{this.props.data.message}</Text>
                    <Text style={styles.message}>{this.props.data.message}</Text>
                    <Text style={styles.message}>{this.props.data.message}</Text><Text
                    style={styles.message}>{this.props.data.message}</Text>
                    <Text style={styles.message}>{this.props.data.message}</Text>
                    <Text style={styles.message}>{this.props.data.message}</Text>
                    <Text style={styles.message}>{this.props.data.message}</Text>
                    <Text style={styles.message}>{this.props.data.message}</Text>
                    <Text style={styles.message}>{this.props.data.message}</Text>
                    <Text style={styles.message}>{this.props.data.message}</Text>
                </ScrollView>
            </View>

        )
    }

    render() {
        return (
            <View>
                <Header navigator={this.props.navigator}
                        title={Labels.Ui.YOUR_ACCOUNT}
                        hideActionButtons={true}
                        color={AppStyle.Colors.FG}
                        nestedView={true}/>
                <View style={styles.container}>
                    <ViewMetaBar description={Labels.Footers.DONATION_CAMPAIGN}
                                 icon={AppStyle.Icons.footer.DONATION_CAMPAIGN}/>
                    {this._renderDataContent()}
                </View>
                <InstantActionBtn style={styles.subscribeBtn} icon={AppStyle.Icons.HEART}
                                  onPress={this._subscribeToCampaign}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    empty: {
        flex: 1,
        marginTop: 100
    },
    details: {
        marginTop: 20,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingLeft: 20
    },
    name: {
        fontSize: 20
    },
    hospital: {},
    message: {
        fontSize: 12,
        marginTop: 5
    },
    dates: {
        marginBottom: 20,
        width: Dimensions.get('window').width - 40,
        alignContent: 'center',
        justifyContent: 'center',
    },
    startDate: {
        marginTop: 10
    },
    title: {},
    hospitalBar: {
        height: 40,
        marginBottom: 20,
        paddingBottom: 20,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        width: Dimensions.get('window').width - 40,
        alignItems: 'flex-start',
        flexDirection: 'row'
    },
    locationIcon: {
        alignItems: 'flex-start'
    },
    hospitalBarText: {
        color: '#555',
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 10,
        alignItems: 'flex-start'
    },
    detailsScrollView: {
        flex: 1,
        marginLeft: 20,
        marginBotom: 0,
        marginTop: 0,
        paddingTop: 20,
        height: (Dimensions.get('window').height / 2) - 60
    },
});