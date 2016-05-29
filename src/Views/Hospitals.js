/**
 * Application Dashboard View
 */

'use strict';
import React, {Component, StyleSheet, View, Text, Dimensions} from "react-native";
import Labels from "../Configs/Labels";
import {AppStyle} from "../Styles/CommonStyles";
import EmptyContent from "../Components/UI/EmptyContent";
import ViewMetaBar from "../Components/UI/ViewMetaBar";
import IO from "../Util/IO";
import Rest from "../Util/Rest";
import {Endpoints} from "../Configs/Url";
import MessageDialog from "../Components/UI/MessageDialog";
import Constants from "../Configs/Constants";
import RNGMap from "react-native-gmaps";
import InstantActionBtn from "../Components/UI/InstantActionBtn";

var mapCenter;

export default class DashboardView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            markers: [],
            cLat: 0,
            cLng: 0,
            zoom: 8
        };
        this._renderDataContent = this._renderDataContent.bind(this);
        this._retrieveHospitals = this._retrieveHospitals.bind(this);
        this._treatHospitalData = this._treatHospitalData.bind(this);
        this._centerMap = this._centerMap.bind(this);
    }

    componentDidMount() {
        this._retrieveHospitals();
    }

    _centerMap() {
        this.setState({
            cLat: this.state.cLat + 0.01,
            cLng: this.state.cLng + 0.01
        });
    }

    _showHospitalDetails(hospital) {
    }

    /**
     * Calculate map center from array of latitude longitudes
     * @param centerLatArray
     * @param centerLngArray
     * @returns {{centerLat: number, centerLng: number}}
     * @private
     */
    _calculateMapCenter(centerLatArray, centerLngArray, length) {
        var reducingFn = function (a, b) {
            return a + b;
        };
        var centerLatSum = centerLatArray.reduce(reducingFn);
        var centerLngSum = centerLngArray.reduce(reducingFn);
        return {
            centerLat: centerLatSum / length,
            centerLng: centerLngSum / length
        }
    }

    _treatHospitalData(res) {
        var markers = [];
        //TODO - Remove in production
        for (var i = 0; i < 10; i++) {
            res.push(res[0]);
        }
        var centerLatArray = [];
        var centerLngArray = [];
        res.forEach((data) => {
            var lat = data.latitude + (Math.random() % 2);
            var lng = data.longitude + (Math.random() % 2);
            centerLatArray.push(lat);
            centerLngArray.push(lng);
            markers.push({
                coordinates: {
                    lat: lat,
                    lng: lng
                },
                name: res.name,
                snippet: res.address,
                icon: require('image!marker')
            })
        });
        mapCenter = this._calculateMapCenter(centerLatArray, centerLngArray, res.length);
        this.setState({
            data: res,
            markers: markers,
            cLat: mapCenter.centerLat,
            cLng: mapCenter.centerLng,
        });
    }

    _retrieveHospitals(cb) {
        IO.getSessionToken().then((sessionToken) => {
            IO.getUser().then((user) => {
                if (sessionToken && user) {
                    let userId = JSON.parse(user).facebookId;
                    let params = {};
                    params[Constants.StorageKeys.SESSION_TOKEN] = sessionToken;
                    params[Constants.StorageKeys.USER_ID] = userId;
                    Rest.read(Endpoints.HOSPITALS, params, (res) => {
                        if (res) {
                            res.json().then((res) => {
                                this._treatHospitalData(res.hospitals);
                            })
                        }
                    }, (err) => {
                        console.error(res);
                        MessageDialog.show(Labels.Ui.ERROR, Labels.Messages.NETWORK_ERROR);
                    });
                }
            })
        });
    }

    _renderEmptyView() {
        return (
            <View style={styles.empty}>
                <EmptyContent label={Labels.Messages.NO_HOSPITALS} icon={AppStyle.Icons.EMPTY_DATA}/>
            </View>
        )
    }

    _renderRowView() {
        return (
            <View style={styles.container}>
                <RNGMap
                    ref='gmap'
                    style={styles.map}
                    markers={this.state.markers}
                    zoomLevel={this.state.zoom}
                    onMapChange={(e) => {
                                console.log(e)
                                }}
                    onMapError={(e) => {
                                    MessageDialog.show(Labels.Ui.ERROR, Labels.Messages.MAP_ERROR)
                                }}
                    center={{ lng: this.state.cLng, lat: this.state.cLat}} //TODO - Calculate Center
                    clickMarker={0}/>
            </View>
        )
    }

    _renderDataContent() {
        if (!this.state.data) {
            return this._renderEmptyView();
        } else {
            return this._renderRowView();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ViewMetaBar description={Labels.Footers.HOSPITALS}
                             icon={AppStyle.Icons.footer.HOSPITALS}/>
                {this._renderDataContent()}
                <InstantActionBtn onPress={this._centerMap} icon={AppStyle.Icons.REFRESH}/>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        height: Dimensions.get('window').height / 2,
    },
    map: {
        height: Dimensions.get('window').height - 50,
        width: Dimensions.get('window').width
    },
    empty: {
        alignItems: 'flex-start',
        flex: 1,
        marginTop: 100
    }
});