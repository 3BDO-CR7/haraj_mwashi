import React  from 'react';
import {
    ScrollView,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView, ActivityIndicator
} from 'react-native';
import {
    Container,
    Icon,
    Content,
    ActionSheet,
    Body,
    Button,
    Title,
    Text,
    View,
    Item,
    Input,
    Textarea,
    CheckBox,
    Picker,
    ListItem,
    Toast, Right, Header
}
    from 'native-base';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import MapView from 'react-native-maps'
import axios        from "axios";
import {connect}   from "react-redux";
// import Spinner     from "react-native-loading-spinner-overlay";
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import I18n from "ex-react-native-i18n";
import {CameraBrowser} from 'expo-multiple-imagepicker';
import { ImageBrowser } from 'expo-multiple-media-imagepicker';
let    base_64   = [];
import CONST from '../consts';
import styles from '../../assets/style'
import {NavigationEvents} from "react-navigation";
import Modal from "react-native-modal";
let BUTTONS = [
    { text: I18n.translate('gallery_photo') ,i : 0 },
    { text: I18n.translate('camera_photo'),i : 1},
    { text: I18n.translate('gallery_video') ,i : 2},
    { text: I18n.translate('cancel'),   color: "#ff5b49" }
];
let    DESTRUCTIVE_INDEX = 3;
let    CANCEL_INDEX = 3;
let    Base64_   = [];
let    data = new FormData();

class AddE3lan extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            lang: 'ar',
            video: '',
            formData :  new FormData(),
            title: '',
            price: '',
            youtube: '',
            video_base64: '',
            description: '',
            type: '',
            new_ad: '',
            image: null,
            expanded        : false,
            pressed         : [],
            city_id: null,
            selected_id: null,
            model_id: null,
            section_id: null,
            key: null,
            mobile: '',
            user_id: this.props.auth.data.id,
            is_chat: true,
            is_phone: true,
            is_location: true,
            is_refresh: true,
            country_id: null,
            imageBrowserOpen: false,
            isLoaded: false,
            cameraBrowserOpen: false,
            mapModal : false,
            photos: [],
            countries: [],
            codes: [],
            models: [],
            sections: [],
            Base64: [],
            images: [],
            base_64: [],
            parents         : [

            ],
            cities: [],
            region: {
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                latitude: 31.037933,
                longitude: 31.381523
            },
            model : null,
            years : [],
            year  : null,
            city                      : '',
            mapRegion: {
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                latitude: 31.037933,
                longitude: 31.381523
            },
            hasLocationPermissions    : false,
            initMap                   : true,
            location                  : '',
            titleStatus         : 0,
            priceStatus      : 0,
            descriptionStatus         : 0,
            mobileStatus      : 0,
        };

        this.setState({lang: this.props.lang});
        axios.post(`${CONST.url}sections`, {
            lang            :  this.props.lang ,
            sub_category_id :  this.props.navigation.state.params.sub_category_id
        }).then((response)=> {
            this.setState({sections: response.data.data});
        });

        axios.post(`${CONST.url}categoriesList`, {
            lang: this.props.lang ,
            parent_id : this.props.navigation.state.params.category_id
        }).then( (response)=> {
            this.setState({parents: response.data.data,spinner: false});
        });

        axios.post(`${CONST.url}countries`, {lang: this.props.lang})
            .then((response) => {
                this.setState({countries: response.data.data});
                this.setState({country_id: response.data.data[0].id});
                axios.post(`${CONST.url}cities`, {lang: this.props.lang, country_id: this.state.countries[0].id})
                    .then((response) => {
                        this.setState({cities: response.data.data});
                        axios.post(`${CONST.url}codes`, {lang: this.props.lang})
                            .then((response) => {
                                this.setState({codes: response.data.data});
                                this.setState({key: response.data.data[0]});
                            })
                            .catch((error) => {
                                this.setState({spinner: false});
                            }).then(() => {
                            this.setState({spinner: false});
                        });
                    }).catch((error) => {
                    this.setState({spinner: false});
                }).then(() => {
                    this.setState({spinner: false});
                });
            })
            .catch((error) => {
                this.setState({spinner: false});
            })
    }

    activeInput(type) {

        if (type === 'title' || this.state.title !== '') {
            this.setState({titleStatus: 1})
        }

        if (type === 'price' || this.state.price !== '') {
            this.setState({priceStatus: 1})
        }

        if (type === 'description' || this.state.description !== '') {
            this.setState({descriptionStatus: 1})
        }

        if (type === 'mobile' || this.state.mobile !== '') {
            this.setState({mobileStatus: 1})
        }

    }

    unActiveInput(type) {

        if (type === 'title' && this.state.title === '') {
            this.setState({titleStatus: 0})
        }

        if (type === 'price' && this.state.price === '') {
            this.setState({priceStatus: 0})
        }

        if (type === 'description' && this.state.description === '') {
            this.setState({descriptionStatus: 0})
        }

        if (type === 'mobile' && this.state.mobile === '') {
            this.setState({mobileStatus: 0})
        }

    }


    async componentWillMount() {
        for(let i = 2020; i > 1990 ; i--){
            this.state.years.push(JSON.stringify(i));
        }

        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            // Toast.show({
            //     text: 'Permission to access location was denied',
            //     duration: 4000,
            //     type: 'danger',
            //     textStyle: {color: "white", textAlign: 'center'}
            // });
            CONST.showToast('Permission to access location was denied',  "danger")

        } else {

            return await Location.getCurrentPositionAsync({
                enableHighAccuracy: false,
                maximumAge: 15000
            }).then((position) => {


                this.setState({
                    mapRegion: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }
                });

            }).catch(err => {
                this.setState({
                    mapRegion: {
                        latitude: 24.774265,
                        longitude: 46.738586,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }
                });
            });
        }


        this.setState({images: [], photos: [], Base64: [], base_64: []});
        Base64_ = [];
        base_64 = [];


    }

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        await Camera.requestPermissionsAsync();
        await Permissions.askAsync(Permissions.CAMERA);
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }

    };


    onValueChange_key(key) {
        this.setState({key});
    }

    onValueChange(value) {
        this.setState({country_id: value});
        this.setState({spinner: true});
        axios.post(`${CONST.url}cities`, {lang: this.props.lang, country_id:  value})
            .then((response) => {
                this.setState({cities: response.data.data});
            })

            .catch((error) => {
                this.setState({spinner: false});
            }).then(() => {
            this.setState({spinner: false});
        });
    }

    open() {
        ActionSheet.show(
            {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                title: I18n.translate('image_video')
            },
            buttonIndex => {
                this.images_video(BUTTONS[buttonIndex])
            }
        )
    }

    onFocus() {
        base_64 = [];
        Base64_ = [];
        this.componentWillMount();
    }

    componentWillUnmount(){
        base_64 = [];
        Base64_ = [];
    }

    images_video = async (i) => {

        if (i.i === 0) {
            this.setState({imageBrowserOpen: true});

        } else if (i.i === 1) {

            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                aspect: [4, 3],
                quality : .5,

            });
            if (!result.cancelled) {
                this.setState({
                    Base64: this.state.Base64.concat(result.uri)
                });
                Base64_.push(result.base64);
                data.append("images[]",{
                    uri : result.uri,
                    type : 'image/jpeg',
                    name : result.filename || `temp_image_${result.height}.jpg`
                });

            }

        } else if (i.i === 2) {

            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
                mediaTypes: 'Videos',
                quality : .5,
            });

            if (!result.cancelled) {
                this.setState({video: result.uri ,video_base64:result.base64, image: result.uri});
            }

            let localUri = result.uri;
            let filename = localUri.split('/').pop();

            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `video/${match[1]}` : video;
            this.state.formData.append('media', {
                uri: localUri, name: filename, type
            });
        }
    };

    validate = () => {

        let isError = false;
        let msg = '';

        if (base_64.concat(Base64_).length === 0) {
            isError = true;
            msg = I18n.t('image_vid');
        } else if (this.state.country_id === null || this.state.country_id === '') {
            isError = true;
            msg = I18n.t('chocountry');
        } else if (this.state.city_id === null || this.state.city_id === '') {
            isError = true;
            msg = I18n.t('chooCity');
        } else if (this.state.year === null && this.props.navigation.state.params.nameCar === 'car') {
            isError = true;
            msg = I18n.t('choose_model');
        } else if (this.state.title === '') {
            isError = true;
            msg = I18n.t('titleValidation');
        }   else if (this.state.description === '') {
            isError = true;
            msg = I18n.t('descriptionRequired');
        }


        if (msg !== '') {
            // Toast.show({
            //     text: msg,
            //     duration: 2000,
            //     type: "danger",
            //     textStyle: {color: "white", fontFamily: 'CairoRegular', textAlign: 'center'}
            // });
            CONST.showToast(msg,  "danger")


        }
        return isError;
    };

    delete_img_s(i) {
        this.state.Base64.splice(i, 1);
        Base64_.splice(i, 1);
        base_64.splice(i, 1);
        this.setState({photos: this.state.Base64})
    }

    delete_img(i) {
        this.state.photos.splice(i, 1);
        base_64.splice(i, 1);
        Base64_.splice(i, 1);
        this.setState({photos: this.state.photos})
    }

    async onLoginPressed() {
        const err = this.validate();
        if (!err) {
            this.setState({isLoaded: true});
            axios.post(`${CONST.url}uploadAd`,
                {
                    title          : this.state.title,
                    youtube        : this.state.youtube,
                    mobile         : this.state.mobile,
                    key            : this.state.key,
                    price          : this.state.price,
                    description    : this.state.description,
                    country_id     : this.state.country_id,
                    latitude       : this.state.mapRegion.latitude,
                    longitude      : this.state.mapRegion.longitude,
                    user_id        : this.state.user_id,
                    city_id        : this.state.city_id,
                    category_id    : this.props.navigation.state.params.category_id,
                    type           : '1',
                    is_refreshed   : this.state.is_refresh,
                    is_mobile      : this.state.is_phone,
                    model_id       : this.state.model_id,
                    section_id     : this.state.section_id,
                    is_chat        : this.state.is_chat,
                    model          : this.state.year,
                    // images         : base_64.concat(Base64_)
                }
            )
                .then((response) => {
                    if (response.data.value === '1') {
                        console.log(response.data.data)
                        this.setState({new_ad : 1})
                        data.append('id',response.data.id);
                        this.upload();
                        this.state.formData.append('id',response.data.id);
                        axios.post(`${CONST.url}uploadVideo`, this.state.formData).then((rs) => {});

                    } else if (response.data.value === '2') {
                        this.setState({new_ad : 1})
                        data.append('id',response.data.id);
                        this.upload();
                        this.state.formData.append('id',response.data.id);
                        axios.post(`${CONST.url}uploadVideo`, this.state.formData).then((response) => {});

                    } else {
                        CONST.showToast(response.data.msg,  "danger")
                        //
                        // Toast.show({
                        //     text: response.data.msg,
                        //     duration: 2000,
                        //     type: "danger",
                        //     textStyle: {color: "white", fontFamily: 'CairoRegular', textAlign: 'center'}
                        // });
                    }
                })

                .catch((error) => {}).then(() => {
            });
        }
    }

    onValueYear(value) {this.setState({year: value});}

    renderSubmit() {
        if (this.state.isLoaded) {
            return (
                <View style={{justifyContent: 'center', alignItems: 'center', marginVertical: 30}}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }
        return (
            <Button onPress={() => this.onLoginPressed()} style={styles.bgLiner}>
                <Text style={styles.textBtn}>{I18n.translate('send')}</Text>
            </Button>
        );
    }
    onValueChangeCity(value) {
        this.setState({
            city_id: value
        });
    }
    upload(){
        console.log(JSON.stringify(data))
        fetch(`${CONST.url}upload_images`,{
            method : 'post',
            body:data
        }).then((res) => console.log(res.json()))
            .then( (res) => {
                data = new FormData()
                this.setState({isLoaded: false });
                this.props.navigation.navigate('home',{
                    new_ad   : this.state.new_ad
                })
            }).catch((err) => console.log('err ' + err))
    }
    imageBrowserCallback = (callback) => {

        callback.then((photos) => {
                photos.map((item,index) => {
                    data.append("images[]",{
                        uri : item.localUri,
                        type : 'image/jpeg',
                        name : item.filename || `temp_image_${index}.jpg`
                    });
                });

                this.setState({
                    imageBrowserOpen: false,
                    cameraBrowserOpen: false,
                    photos: this.state.photos.concat(photos)
                });
                const imgs = this.state.photos;
                for (let i = 0; i < imgs.length; i++) {
                    const imageURL = imgs[i].localUri;
                    FileSystem.readAsStringAsync(imageURL, { encoding: 'base64' }).then(imgBase64 => Base64_.push(imgBase64))
                }
            }
        ).catch((e) => console.log(e))
    };

    delete_video(i) {
        this.setState({image: null, video: ''})
    }

    renderImage(item, i) {
        return (
            <View key={i} style={{height: 70, width: 70, margin: 10, overflow : 'hidden', borderRadius : 5 }}>
                <Image
                    style={{height: '100%', width: '100%' }}
                    source={{uri: item.localUri}}
                    key={i}
                />
                <TouchableOpacity onPress={() => {
                    this.delete_img(i)
                }} style={{
                    position       : 'absolute',
                    right          :  0,
                    top            :  0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    width          : '100%',
                    height         : '100%',
                    alignItems     : 'center',
                    justifyContent : 'center'
                }}>
                    <Icon name="close" style={{color: 'white', textAlign: 'center', fontSize: 22}}></Icon>
                </TouchableOpacity>
            </View>
        )
    }

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }
    };


    async toggleModalMap (){

        this.setState({ mapModal: !this.state.mapModal});

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

    };

    _handleMapRegionChange  = async (mapRegion) =>  {
        this.setState({ mapRegion });
    };

    getLocation(){
        this.setState({ mapModal: !this.state.mapModal});
    }

    render() {

        if (this.state.imageBrowserOpen) {
            return(<ImageBrowser base64={true} max={7} callback={this.imageBrowserCallback}/>);
        }else if (this.state.cameraBrowserOpen) {
            return(<CameraBrowser base64={true} max={7} callback={this.imageBrowserCallback}/>);
        }
        return (
            <Container>
                <NavigationEvents onWillFocus={() => this.onFocus()} />
                {/*<Spinner visible={this.state.spinner}/>*/}
                <Header style={styles.Header_Up}>
                    <Body style={[styles.body_header,{ flex : 1.4 , alignItems : 'center' }]}>
                    <Title style={styles.headerTitle}>{I18n.translate('add_ads')}</Title>
                    </Body>
                    <Right style={[ styles.RightDir]}>
                        <Button transparent onPress={()=> this.props.navigation.goBack()} >
                            <Icon style={styles.icons} type="AntDesign" name={ (this.state.lang !== 'ar' || this.state.lang == null) ? 'right' : 'left' }/>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <View style={styles.upload}>
                        {/*<Text style={styles.textes}>{I18n.translate('add_photo')}</Text>*/}
                        <View >
                            <TouchableOpacity onPress={()=> this.open()}>
                                <View style={styles.blockUpload}>
                                    <Icon style={styles.iconUpload, styles.text_darkGreen} active type="AntDesign" name='pluscircleo' />
                                    <Text style={[styles.textes, styles.text_darkGreen]}>
                                        {I18n.translate('image_video')}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{marginHorizontal: 20}}>
                        {
                            this.state.Base64.map((item,i) => {
                                return(
                                    <View key={i} style={{height: 70, width: 70, margin: 10, overflow : 'hidden', borderRadius : 5 }}>

                                        <Image
                                            style={{height: '100%', width: '100%' }}
                                            source={{uri: item}}
                                            key={i}
                                        />
                                        <TouchableOpacity onPress={() => {
                                            this.delete_img_s(i)
                                        }} style={{
                                            position        : 'absolute',
                                            right           : 0,
                                            top             : 0,
                                            backgroundColor : 'rgba(0,0,0,0.5)',
                                            width           : '100%',
                                            height          : '100%',
                                            alignItems      : 'center',
                                            justifyContent  : 'center'
                                        }}>

                                            <Icon name="close" style={{color: 'white', textAlign: 'center', fontSize: 22}}/>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>

                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{marginHorizontal: 20}}>
                        {this.state.photos.map((item,i) => this.renderImage(item,i))}
                        {
                            (this.state.video !== '')
                                ?
                                <View style={{height: 70, width: 70, margin: 10, overflow : 'hidden', borderRadius : 5 }}>
                                    <Image source={{uri: this.state.image}} style={{height: '100%', width: '100%' }}/>
                                    <TouchableOpacity onPress={()=> {this.delete_video()}} style={{
                                        position            : 'absolute',
                                        right               : 0,
                                        top                 : 0,
                                        backgroundColor     : 'rgba(0,0,0,0.5)',
                                        width               : '100%',
                                        height              : '100%',
                                        alignItems          : 'center',
                                        justifyContent      : 'center'
                                    }}>

                                        <Icon name="close" style={{ color : 'white' , textAlign:'center', fontSize:22}}/>

                                    </TouchableOpacity>
                                </View>
                                :
                                <View/>
                        }
                    </ScrollView>

                    <View style={[ styles.rowGroup, styles.paddingHorizontal_5, styles.marginVertical_10 ]}>
                        <View style={[ styles.flex_50, styles.paddingHorizontal_10 ]}>
                            <View style={[ styles.itemPiker_second, { borderWidth : 0.5, borderColor : '#b5b5b5' } ]} regular>
                                <Picker
                                    iosHeader={I18n.translate('choose_country')}
                                    headerBackButtonText={I18n.translate('goBack')}
                                    mode="dropdown"
                                    style={styles.Picker}
                                    selectedValue={this.state.country_id}
                                    onValueChange={this.onValueChange.bind(this)}
                                    placeholderStyle={{ color: "#444", writingDirection: 'rtl', width : '100%',fontFamily : 'CairoRegular', fontSize : 14 }}
                                    textStyle={{ color: "#444",fontFamily : 'CairoRegular', writingDirection: 'rtl',paddingLeft : 5, paddingRight: 5 }}
                                    placeholder={I18n.translate('choose_country')}
                                    itemTextStyle={{ color: '#444',fontFamily : 'CairoRegular', writingDirection: 'rtl' }}>

                                    <Picker.Item style={styles.itemPicker} label={I18n.translate('choose_country')} value={null} />

                                    {
                                        this.state.countries.map((country, i) => (
                                            <Picker.Item style={styles.itemPicker} label={country.name} value={country.id} />
                                        ))
                                    }

                                </Picker>
                                <Icon style={[ styles.iconPicker ,{ top : 15 } ]} type="AntDesign" name='down' />
                            </View>
                        </View>
                        <View style={[ styles.flex_50, styles.paddingHorizontal_5, { position : 'relative', right : 4 } ]}>
                            <View style={[ styles.itemPiker_second, { borderWidth : 0.5, borderColor : '#b5b5b5' } ]} regular>
                                <Picker
                                    iosHeader={I18n.translate('myCity')}
                                    headerBackButtonText={I18n.translate('goBack')}
                                    mode="dropdown"
                                    style={styles.Picker}
                                    selectedValue={this.state.city_id}
                                    onValueChange={this.onValueChangeCity.bind(this)}
                                    placeholderStyle={{ color: "#444", writingDirection: 'rtl', width : '100%',fontFamily : 'CairoRegular', fontSize : 14 }}
                                    textStyle={{ color: "#444",fontFamily : 'CairoRegular', writingDirection: 'rtl',paddingLeft : 5, paddingRight: 5 }}
                                    placeholder={I18n.translate('myCity')}
                                    itemTextStyle={{ color: '#444',fontFamily : 'CairoRegular', writingDirection: 'rtl' }}>

                                    <Picker.Item style={styles.itemPicker} label={I18n.translate('all_cities')} value={null} />

                                    {
                                        this.state.cities.map((city, i) => (
                                            <Picker.Item style={styles.itemPicker} key={i} label={city.name} value={city.id} />
                                        ))
                                    }

                                </Picker>
                                <Icon style={[ styles.iconPicker ,{ top : 15 } ]} type="AntDesign" name='down' />
                            </View>
                        </View>
                    </View>

                    {
                        (this.props.navigation.state.params.nameCar === 'car') ?
                            <View style={[ styles.rowGroup, styles.paddingHorizontal_5, { marginTop : 20, marginBottom : 10 } ]}>
                                <View style={[ styles.flex_100, styles.paddingHorizontal_10 ]}>
                                    <View style={styles.itemPiker_second} regular>
                                        <Picker
                                            mode                    = "dropdown"
                                            style                   = {styles.Picker}
                                            selectedValue           = {this.state.year}
                                            onValueChange           = {this.onValueYear.bind(this)}
                                            placeholderStyle={{ color: "#444", writingDirection: 'rtl', width : '100%',fontFamily : 'CairoRegular', fontSize : 14 }}
                                            textStyle={{ color: "#444",fontFamily : 'CairoRegular', writingDirection: 'rtl',paddingLeft : 5, paddingRight: 5 }}
                                            placeholder={I18n.translate('myCity')}
                                            itemTextStyle={{ color: '#444',fontFamily : 'CairoRegular', writingDirection: 'rtl' }}
                                        >
                                            <Picker.Item style={[styles.itemPicker]} label={I18n.translate('choose_model')} value={null} />

                                            {
                                                this.state.years.map((year, i) => (
                                                    <Picker.Item style={[styles.itemPicker]} key={i} label={year} value={year} />
                                                ))
                                            }

                                        </Picker>
                                        <Icon style={[ styles.iconPicker ,{ top : 15 } ]} type="AntDesign" name='down' />
                                    </View>
                                </View>
                            </View>
                            :
                            <View/>
                    }

                    <KeyboardAvoidingView behavior="padding" style={{  flex: 1, width : '100%'}} >

                        <View style={[ styles.block_section , { margin : 0 , marginHorizontal : 10, padding : 0 ,paddingHorizontal : 5 } ]}>

                            <View style={[ styles.item, { borderColor : (this.state.titleStatus === 1 ? '#ced09b' : '#DDD') ,borderWidth : .5 } ]} >
                                <Input
                                    // style={[styles.input,{width : '100%'}]}
                                    placeholder={ I18n.translate('title')}
                                    onChangeText={(title) => this.setState({title})}
                                    style={[styles.input, styles.height_50, { paddingRight : 10, paddingLeft : 10, color : "#121212" }]}
                                    onBlur={() => this.unActiveInput('title')}
                                    onFocus={() => this.activeInput('title')}
                                />
                            </View>

                            <View style={[ styles.item, { borderColor : (this.state.priceStatus === 1 ? '#ced09b' : '#DDD') ,borderWidth : .5 } ]} >
                                <Input
                                    // style={[styles.input,{width : '100%'}]}
                                    placeholder={ I18n.translate('price')}
                                    onChangeText={(price) => this.setState({price})}
                                    style={[styles.input, styles.height_50, { paddingRight : 10, paddingLeft : 10, color : "#121212" }]}
                                    onBlur={() => this.unActiveInput('price')}
                                    onFocus={() => this.activeInput('price')}
                                />
                            </View>

                            <View style={[ styles.item, { borderWidth : 0 } ]} >
                                <Textarea
                                    style={[ styles.textarea, { borderColor : (this.state.descriptionStatus === 1 ? '#ced09b' : '#DDD'), borderWidth : .5} ]}
                                    onChangeText={(description)=>{ this.setState({description})}}
                                    rowSpan={5}
                                    placeholder={I18n.translate('description')}
                                    onBlur={() => this.unActiveInput('description')}
                                    onFocus={() => this.activeInput('description')}
                                />
                            </View>

                            <View style={{flexDirection: 'row', width : '100%'}}>
                                <View style={[ styles.flex_80 ]}>
                                    <View style={{
                                        padding                 : 0,
                                        width                   : '100%',
                                        marginVertical          : 10,
                                        marginLeft              : 0,
                                    }} >
                                        {/*<Icon style={styles.icon_input} active type="SimpleLineIcons" name='phone' />*/}
                                        {/*<Label style={styles.label}>{ I18n.translate('enterchoose')}</Label>*/}
                                        <Input
                                            placeholder={I18n.translate('whatsapp')}
                                            style={[styles.input, { paddingRight : 10, paddingLeft : 10, color : "#121212", borderWidth : 0.5, borderColor : '#b5b5b5' }]}
                                            onChangeText={(mobile) => this.setState({mobile})}  value={ this.state.mobile }
                                            onBlur={() => this.unActiveInput('mobile')}
                                            onFocus={() => this.activeInput('mobile')}
                                            keyboardType={'number-pad'}
                                        />
                                    </View>
                                </View>
                                <View style={[ styles.flex_20 ]}>
                                    <View style={[ styles.rowGroup , styles.position_R , { alignItems : 'center', paddingHorizontal : 0, borderWidth : 0.5, borderColor : '#b5b5b5' , borderLeftWidth : 0,top : 10, height : 50}]} regular>
                                        <Picker
                                            mode               ="dropdown"
                                            style              ={{ color: '#9a9a9a',backgroundColor:'transparent' }}
                                            iosHeader = {I18n.translate('keyCountry')}
                                            headerBackButtonText={I18n.translate('goBack')}
                                            selectedValue       ={this.state.key}
                                            onValueChange={this.onValueChange_key.bind(this)}
                                            textStyle          ={{ color: "#363636", paddingLeft  : 5, paddingRight : 5, fontSize : 12, paddingTop : 8}}
                                            itemTextStyle      ={{ color: '#363636' }}>
                                            {
                                                this.state.codes.map((code, i) => {
                                                    return <Picker.Item style={{color: "#363636"}}  key={i} value={code} label={code} />
                                                })
                                            }
                                        </Picker>
                                        <Icon style={[ styles.position_A, {color: "#363636", fontSize:13, right : 5, top: 19} ]} name='down' type="AntDesign"/>
                                    </View>
                                </View>
                            </View>

                        </View>

                        <View style={[styles.textsetting, styles.bg_darkGreen , styles.height_40, styles.width_200, styles.Radius_5]}>
                            <Icon style={styles.icoSetting} type="Octicons" name='settings' />
                            <Text style={[styles.textBtn]}>{I18n.translate('configurations')}</Text>
                        </View>

                        <View style={[ styles.overHidden, styles.marginVertical_10 ]}>

                            <View style={[ styles.overHidden, styles.paddingHorizontal_10 ]}>
                                <ListItem style={{ paddingRight : 0, marginLeft : 0 }}  onPress={() => this.setState({ is_phone: !this.state.is_phone })}>
                                    <CheckBox
                                        checked={this.state.is_phone}
                                        value={this.state.is_phone}
                                        style = {[styles.checkBox, { backgroundColor : '#ced09b', borderColor : '#ced09b', borderWidth : 1 }]}
                                        onPress={() => this.setState({ is_phone: !this.state.is_phone })}
                                    />
                                    <View style={[ styles.flexCenter, styles.Radius_40, { width : 30, height : 30, marginHorizontal : 5,backgroundColor : '#f4f4f4' } ]}>
                                        <Icon name={'chat'} type={'MaterialCommunityIcons'} style={{color : '#9c9c9c' , fontSize : 14}}/>
                                    </View>
                                    <Body>
                                    <Text style={styles.textIner}>{I18n.translate('with_phone')}</Text>
                                    </Body>
                                </ListItem>
                            </View>

                            <View style={[ styles.overHidden, styles.paddingHorizontal_10 ]}>
                                <ListItem style={{ paddingRight : 0, marginLeft : 0 }}  onPress={() => this.setState({ is_refresh: !this.state.is_refresh })}>
                                    <CheckBox
                                        checked={this.state.is_refresh}
                                        style = {[styles.checkBox, { backgroundColor : '#ced09b', borderColor : '#ced09b', borderWidth : 1 }]}
                                        onPress={() => this.setState({ is_refresh: !this.state.is_refresh })}
                                    />
                                    <View style={[ styles.flexCenter, styles.Radius_40, { width : 30, height : 30, marginHorizontal : 5,backgroundColor : '#f4f4f4' } ]}>
                                        <Icon name={'cellphone-off'} type={'MaterialCommunityIcons'} style={{color : '#9c9c9c' , fontSize : 14}}/>
                                    </View>
                                    <Body>
                                    <Text style={styles.textIner}>{I18n.translate('renew')}</Text>
                                    </Body>
                                </ListItem>
                            </View>

                            <View style={[ styles.overHidden, styles.paddingHorizontal_10 ]}>
                                <ListItem style={{ paddingRight : 0, marginLeft : 0 }} onPress={() => this.setState({ is_chat: !this.state.is_chat })}>
                                    <CheckBox
                                        checked={this.state.is_chat}
                                        value={this.state.is_chat}
                                        style = {[styles.checkBox, { backgroundColor : '#ced09b', borderColor : '#ced09b', borderWidth : 1 }]}
                                        onPress={() => this.setState({ is_chat: !this.state.is_chat })}
                                    />
                                    <View style={[ styles.flexCenter, styles.Radius_40, { width : 30, height : 30, marginHorizontal : 5,backgroundColor : '#f4f4f4' } ]}>
                                        <Icon name={'refresh'} type={'SimpleLineIcons'} style={{color : '#9c9c9c' , fontSize : 14}}/>
                                    </View>
                                    <Body>
                                    <Text style={styles.textIner}>{I18n.translate('private')}</Text>
                                    </Body>
                                </ListItem>
                            </View>

                        </View>

                        {/*<TouchableOpacity onPress={()=>{this.props.navigation.navigate('Map',{*/}
                        {/*    latitude   : this.state.latitude,*/}
                        {/*    longitude  : this.state.longitude,*/}
                        {/*})}} style={{justifyContent:"center"  , alignItems : 'center' , flexDirection : 'row' , marginVertical : 12}}>*/}
                        {/*    <Text style={[styles.text, {*/}
                        {/*        color: CONST.color,*/}
                        {/*        fontFamily : 'CairoBold',*/}
                        {/*        textDecorationLine: 'underline',*/}
                        {/*    }]}>{I18n.translate('show_location')}</Text>*/}
                        {/*    <Icon name={'location-pin'} type={'Entypo'} style={{color: CONST.color ,fontSize : 18 ,textDecorationLine: 'underline'}}/>*/}
                        {/*</TouchableOpacity>*/}


                        <TouchableOpacity
                            onPress={() => this.toggleModalMap()}
                            style={{justifyContent:"center"  , alignItems : 'center' , flexDirection : 'row' , marginVertical : 12}}
                        >
                            <Icon name={'location-pin'} type={'Entypo'} style={{color: CONST.color ,fontSize : 18 }}/>
                            <Text style={[styles.text, {color: CONST.color, fontFamily : 'CairoBold', textDecorationLine: 'underline',}]}>{I18n.translate('show_location')}</Text>
                        </TouchableOpacity>

                        <Modal isVisible={this.state.mapModal} onBackdropPress={() => this.toggleModalMap()}>
                            <View style={styles.model}>
                                <View style={[styles.commenter , {width:'100%'}]}>

                                    <Text style={styles.TiTle}>{I18n.translate('show_location')}</Text>

                                    {
                                        !this.state.initMap ? (
                                            <TouchableOpacity>
                                                <MapView
                                                    style={[ styles.Width_90, styles.height_250, styles.Radius_5, styles.flexCenter, styles.marginVertical_10 ]}
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

                                    <TouchableOpacity onPress={() => this.getLocation()} style={styles.bgLiner}>
                                        <Text style={styles.textBtn}>{I18n.translate('send')}</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </Modal>


                        { this.renderSubmit() }
                    </KeyboardAvoidingView>
                </Content>

            </Container>
        );
    }
}
const mapStateToProps = ({ auth, lang ,profile}) => {

    return {

        auth   : auth.user,
        lang   : lang.lang,
        user   : profile.user,
    };
};
export default connect(mapStateToProps,{})(AddE3lan);
