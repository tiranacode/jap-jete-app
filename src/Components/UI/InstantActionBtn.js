'use strict';
import React, {Component, StyleSheet} from "react-native";
import {MKButton, MKColor} from "react-native-material-kit";
import Icon from "../../../node_modules/react-native-vector-icons/FontAwesome";
import {AppStyle} from "../../Styles/CommonStyles";

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 20,
        right: 20
    },
    icon: {}
});

const ColoredFab = MKButton.coloredFab()
    .withBackgroundColor(AppStyle.Colors.FG)
    .withStyle(styles.button)
    .withTextStyle({
        color: "white",
        fontWeight: "bold"
    })
    .build();

export default class InstantActionBtn extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ColoredFab style={this.props.style} onPress={this.props.onPress}>
                <Icon name={this.props.icon} size={25} color="white" style={styles.icon}/>
            </ColoredFab>
        )
    }
}