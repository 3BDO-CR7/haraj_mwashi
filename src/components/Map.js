import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity , Linking,} from 'react-native';
import {Container, Content, Title, Header, Body, Button, Icon} from 'native-base'
import I18n from "ex-react-native-i18n";
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import MapView from 'react-native-maps'
import {connect} from "react-redux";
class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city                      : '',
            mapRegion                 : null,
            hasLocationPermissions    : false,
            initMap                   : true,
            location                  : '',
        };
    }
    async componentWillMount() {
        if (this.props.navigation.state.params.latitude !== undefined && this.props.navigation.state.params.longitude) {
            this.setState({ initMap   : false,
                mapRegion             : {
                    latitude          : this.props.navigation.state.params.latitude,
                    longitude         : this.props.navigation.state.params.longitude,
                }});
        }else{
            let { status } = await Permissions.askAsync(Permissions.LOCATION);
            if (status !== 'granted') {
                alert('صلاحيات تحديد موقعك الحالي ملغاه');
            }else {
                const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
                const userLocation = { latitude, longitude };
                this.setState({
                    initMap     : false,
                    mapRegion   : userLocation
                });
            }
            await Permissions.askAsync(Permissions.CAMERA);
            await Permissions.askAsync(Permissions.CAMERA_ROLL);
            const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
            const userLocation = { latitude, longitude };
            this.setState({  initMap: false, mapRegion: userLocation });
        }
    }

    _handleMapRegionChange  = async (mapRegion) =>  {
        this.setState({ mapRegion });
    };

    getLocation(){
        this.props.navigation.navigate('forme3lan', {
            latitude                : this.state.mapRegion.latitude,
            longitude               : this.state.mapRegion.longitude,
        });
    }

    openMap(lat,lng){
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${lat},${lng}`;
        const label = 'Custom Label';
        const url = Platform.select({
            ios   : `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });
        Linking.openURL(url);
    }

    render() {
        return (
            <Container>
                <Header style={styles.header}>
                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                        <Icon style={styles.icons} type="AntDesign" name={ (this.state.lang !== 'ar' || this.state.lang == null) ? 'right' : 'left' }/>
                    </Button>
                    <Body style={styles.bodyText}>
                    <Title style={styles.Title}>{I18n.translate('show_location')}</Title>
                    </Body>
                </Header>
                <Content contentContainerStyle={{ flexGrow: 1 }} style={styles.contentView}>
                    {
                        !this.state.initMap ? (
                            <TouchableOpacity onPress={()=> {this.openMap(this.state.region.latitude , this.state.region.longitude)}}>
                            <MapView
                                style={styles.map}
                                initialRegion={{
                                    latitude      :  this.state.mapRegion.latitude,
                                    longitude     :  this.state.mapRegion.longitude,
                                    latitudeDelta : 0.0922,
                                    longitudeDelta: 0.0421,
                                }}>
                                <MapView.Marker
                                    draggable
                                    coordinate={this.state.mapRegion}
                                    onDragEnd={(e) =>  this._handleMapRegionChange(e.nativeEvent.coordinate)}>
                                    <Image source={require('../../assets/marker.png')} resizeMode={'cover'} style={{ width: 35, height: 35 }}/>
                                </MapView.Marker>
                            </MapView>
                            </TouchableOpacity>
                        ) : (<View />)
                    }
                    {
                        this.props.navigation.state.params.latitude  !== undefined
                        ?null :
                            <TouchableOpacity style={styles.clickFunction} onPress={() => this.getLocation()}>
                                <Text style={styles.textFun}>{I18n.translate('send')}</Text>
                            </TouchableOpacity>
                    }
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    header:{
        backgroundColor     : "rgba(255, 255, 255, 0.6)",
        borderBottomColor   : "rgba(255, 255, 255, 0.6)",
        paddingTop          : 10,
        alignItems          : 'center',
        justifyContent      : 'center',
        alignSelf           : 'center',
        height : 90
    },
    bodyText : {
        alignItems          : 'center',
    },
    Title : {
        color               : "#58544f",
        fontFamily          : "CairoRegular",
        textAlign           : "center",
        fontSize            : 17,
    },
    icons : {
        color               : "#8C499C",
        fontSize            : 20
    },
    map : {
        width               : '100%',
        height              : '100%',
        alignItems          : 'center',
        justifyContent      : 'center',
        alignSelf           : 'center',
    },
    clickFunction : {
        backgroundColor     : "#8C499C",
        alignItems          : 'center',
        justifyContent      : 'center',
        alignSelf           : 'center',
        borderRadius        : 10,
        padding             : 5,
        width               : 120,
        position            : 'absolute',
        bottom              : 10
    },
    textFun : {
        color               : "#fff",
        fontFamily          : "CairoRegular",
        fontSize            : 16,
    }
});


const mapStateToProps = ({ lang, profile  }) => {
    return {
        lang: lang.lang,
        user: profile.user,
    };
};

export default connect(mapStateToProps, {})(Map);
