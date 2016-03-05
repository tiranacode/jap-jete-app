import React, {
    Component,
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    AsyncStorage,
    InteractionManager
} from 'react-native';
import { MKSpinner } from 'react-native-material-kit';
import {AppStyle, ComponentsStyle} from '../../Styles/CommonStyles.js';

const LoadingSpinner = MKSpinner.singleColorSpinner()
    .build();

export default class Spinner extends Component {
    render() {
        return (
            <View style={styles.spinnerContainer}>
                <LoadingSpinner strokeWidth={5} strokeColor={this.props.inverted ? AppStyle.Colors.BG : AppStyle.Colors.FG} style={{width: 50, height: 50}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    spinnerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});