import React, {
    Component,
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Image from 'react-native-image-progress';
import Progress from 'react-native-progress';
import {AppStyle, ComponentsStyle} from '../../Styles/CommonStyles.js';

export default class ProfileBox extends Component {
    render() {
        return (
            <View>
                {/* Profile Image */}
                <Image
                    source={{ uri: 'http://kclr96fm.com/media/2015/03/Captain-Jack-captain-jack-sparrow-14117613-1242-900.jpg' }}
                    indicator={Progress.Pie}
                    resizeMode="cover"
                    indicatorProps={ComponentsStyle.ProgressIndicator}
                    style={styles.photo}/>
                {/* Toolbar */}
                <View style={styles.toolbar}>
                    <TouchableOpacity>
                        <Icon
                            name="pencil"
                            size={30}
                            color="#fff"
                            style={styles.toolbarBtn}/>
                    </TouchableOpacity>
                </View>
                {/* Icon - TODO - Change Icon */}
                <Image
                    source={{uri: "http://www.myiconfinder.com/uploads/iconsets/067f33d33e085fde8c366c8ae7162d95-heart.png"}}
                    style={styles.toolbarImage}>
                </Image>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    photo: {
        width: Dimensions.get('window').width,
        height: 200,
        left: 0,
        right: 0
    },
    toolbar: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: Dimensions.get('window').width,
        top: -50,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    toolbarBtn: {
        borderLeftColor: 'white',
        borderLeftWidth: 2,
        borderStyle: 'solid',
        right: 10,
        width: 50,
        top: 5,
        textAlign: 'center'
    },
    toolbarImage: {
        width: 60,
        height: 60,
        left: 10,
        top: -120
    }
});