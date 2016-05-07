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
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import {AppStyle, ComponentsStyle} from "../../Styles/CommonStyles";
import {ProfileUISchema} from "../../Domain/Profile";
import ProfileEdit from "../../Views/ProfileEdit";
import Constants from "../../Configs/Constants";
import IO from "../../Util/IO";
import {Endpoints} from "../../Configs/Url";
import Rest from "../../Util/Rest";
import Spinner from "./Spinner";
import PTRView from "react-native-pull-to-refresh";
import ParallaxView from "react-native-parallax-view";
import InstantActionBtn from "../../Components/UI/InstantActionBtn";

let logo = require('../../../assets/imgs/logo.png');

export default class ProfileBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            loading: true
        };
        this.retrieveExternalUserDetails = this.retrieveExternalUserDetails.bind(this);
        this.profileRefresh = this.profileRefresh.bind(this);
    }

    retrieveExternalUserDetails(resolve) {
        IO.getSessionToken().then((sessionToken) => {
            //Read User Data
            if (sessionToken) {
                let params = {};
                params[Constants.StorageKeys.SESSION_TOKEN] = sessionToken;
                params[Constants.StorageKeys.USER_ID] = this.state.user.facebookId;
                Rest.read(Endpoints.USER, params,
                    (res) => {
                        res.json().then((res) => {
                            let updatedUser = this.state.user;
                            updatedUser.email = res[Constants.RestParams.EMAIL];
                            updatedUser.phoneNumber = res[Constants.RestParams.PHONE_NUMBER];
                            updatedUser.location = res[Constants.RestParams.ADDRESS];
                            updatedUser.group = res[Constants.RestParams.BLOOD_TYPE];
                            this.setState({
                                user: updatedUser
                            });
                            if (resolve) resolve();
                        });
                    }, (res) => {
                        console.error(res);
                        //TODO - Handle Error
                    });
            }
        });
    }

    retrieveUserDetails() {
        ///Get Data From Local Storage
        AsyncStorage.getItem(Constants.StorageKeys.USER).then((data) => {
            if (data) {
                this.setState({
                    user: JSON.parse(data),
                    loading: false
                });
                this.retrieveExternalUserDetails();
            }
        });
    }

    profileRefresh() {
        return new Promise((resolve) => {
            this.retrieveExternalUserDetails(resolve);
        });
    }

    componentDidMount() {
        this.retrieveUserDetails();
    }

    navigateToProfileEdit(navigator) {
        navigator.push({
            id: 'ProfileEdit',
            user: this.state.user
        });
    }

    render() {
        if (!this.state.loading) {
            return (
                <ParallaxView
                    ref={component => this._scrollView = component}
                    backgroundSource={{ uri: this.state.user.photo }}
                    windowHeight={Dimensions.get('window').height / 2 }
                    header={(
                        <View style={styles.header}>
                            <InstantActionBtn icon={AppStyle.Icons.EDIT} onPress={() => { this.navigateToProfileEdit(this.props.navigator, this.state.user) }}/>
                        </View>
                    )}>
                    <PTRView onRefresh={this.profileRefresh} progressBackgroundSWColor={AppStyle.Colors.FG}>
                        <ScrollView style={styles.container}>
                            {/* Image Header */}
                            {/* Content */}
                            <DetailsBox schema={ProfileUISchema} entity={this.state.user}/>
                        </ScrollView>
                    </PTRView>
                </ParallaxView>
            );
        }
        return (
            <Spinner/>
        )
    }
}

class DetailsBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            entity: props.entity
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            entity: nextProps.entity
        });
    }

    render() {
        var details = [];
        for (field in this.state.entity) {
            if (this.props.schema[field]) {
                details.push(
                    <View style={styles.detail} key={field}>
                        <Icon
                            name={this.props.schema[field].icon}
                            size={20}
                            color={AppStyle.Colors.FG}
                            style={styles.detailIcon}/>
                        <Text style={styles.detailValue}>{this.state.entity[field] || "-"}</Text>
                    </View>
                )
            }
        }
        return (
            <View style={styles.profileDetails}>
                <View>{details}</View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        right: 0,
        alignItems: 'flex-end',
        width: Dimensions.get('window').width,
    },
    photo: {
        width: Dimensions.get('window').width,
        left: 0,
        height: 200,
        right: 0,
        justifyContent: 'flex-end'
    },
    toolbar: {
        flex: 0.4,
        backgroundColor: 'white',
        width: Dimensions.get('window').width,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    profileDetails: {
        flex: 0.5,
        width: Dimensions.get('window').width - 40,
        padding: 20,
        margin: 20
    },
    name: {
        fontSize: 20,
        marginBottom: 20
    },
    detail: {
        marginTop: 5,
        flexDirection: 'row',
        marginBottom: 10
    },
    detailIcon: {
        marginRight: 20
    },
    detailValue: {
        fontSize: 15
    }
});
