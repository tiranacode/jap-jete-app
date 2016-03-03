'use strict';

import React, {
    Component,
    ToastAndroid,
    View,
    NetInfo,
} from 'react-native';
import Labels from '../../Configs/Labels';
import MessageDialog from '../UI/MessageDialog';

export default React.createClass({
    getInitialState() {
        return {
            connectionAlive: null
        }
    },
    componentDidMount: function () {
        NetInfo.isConnected.addEventListener('change', this.handleNetworkChange);
        NetInfo.isConnected.fetch().done((connectionAlive) => this.setState({connectionAlive}));
    },
    componentWillUnmount: function () {
        NetInfo.isConnected.removeEventListener('change', this.handleNetworkChange);
    },
    handleNetworkChange: function (connectionAlive) {
        if (!connectionAlive) {
            //ToastAndroid.show(Labels.NO_NETWORK, ToastAndroid.SHORT)
            MessageDialog.show(Labels.Ui.ERROR, Labels.NO_NETWORK);
        }
        this.setState({
            connectionAlive
        })
    },
    render() {
        return (
            <View></View>
        )
    }
});