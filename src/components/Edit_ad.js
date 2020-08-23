import React  from 'react';
import {
    StyleSheet,
    ScrollView,
    Platform,
    TouchableOpacity,
    ImageEditor,
    Image,
    ImageStore,
    Dimensions,
    ActivityIndicator,
    KeyboardAvoidingView, I18nManager as RNI18nManager
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
    Left,
    ListItem,
    Toast, Right, Header
}
    from 'native-base';
import axios       from "axios";
// import {Bubbles}   from "react-native-loader";
import {connect}   from "react-redux";
// import Spinner     from "react-native-loading-spinner-overlay";

import * as ImagePicker from 'expo-image-picker';
import MapView from 'react-native-maps'
import * as Permissions from 'expo-permissions'
import I18n from "ex-react-native-i18n";
import {ImageBrowser,CameraBrowser} from 'expo-multiple-imagepicker';

let    base64   = [];
const  height = Dimensions.get('window').height;
import marker from '../../assets/marker.png'
import {NavigationEvents} from "react-navigation";
import CONST from '../consts';
import styles from '../../assets/style'
const  isIphoneX = Platform.OS === 'ios' && height == 812 || height == 896;


let BUTTONS = [
    { text: I18n.translate('gallery_photo') ,i : 0 },
    { text: I18n.translate('camera_photo'),i : 1},
    { text: I18n.translate('gallery_video') ,i : 2},
    { text: I18n.translate('cancel'),   color: "#ff5b49" }
];
let DESTRUCTIVE_INDEX = 3;
let CANCEL_INDEX = 3;


class Edit_ad extends React.Component {


    constructor(props) {

        super(props);
        RNI18nManager.forceRTL(true);

        this.state = {
            lang             : 'ar',
            phone            : 'ar',
            video            : '',
            youtube          : '',
            title            : '',
            price            : '',
            description      : '',
            video_base64     : '',
            type             : '',
            formData         :  new FormData(),
            blog             : '',
            image            : null,
            city_id          : null,
            sub_section_id   : null,
             section_id      : null,
            key              : null,
            mobile           : null,
            user_id          : this.props.auth.data.id,
            is_chat          : false,
            is_phone         : false,
            is_location      : false,
            is_refresh       : false,
            country_id       : null,
            sub_category_id  : null,
            category_id      : null,
            imageBrowserOpen : false,
            isLoaded         : false,
            cameraBrowserOpen: false,
            photos           : [],
            countries        : [],
            categories       : [],
            sub_categories   : [],
            codes            : [],
            images           : [],
            base64           : [],
            Base64           : [],
            sections         : [],
            models           : [],
            cities           : [],
            region           : {
                latitudeDelta    : 0.0922,
                longitudeDelta   : 0.0421,
                latitude         : null,
                longitude        : null
            },
            model : null,
            years : [],
            year  : null,
        };
    }



    async componentWillMount() {

        this.setState({lang : this.props.lang});
        this.setState({spinner: true});
        this.setState({images: [],photos: []});
        axios.post(`${CONST.url}countries`, { lang: this.props.lang  })
            .then( (response)=> {
                this.setState({countries: response.data.data});
                axios.post(`${CONST.url}BlogDetails`, {  lang: this.props.lang , id : this.props.navigation.state.params.id, user_id : this.props.user.id })
                    .then( (response)=> {

                        axios.post(`${CONST.url}cities`, { lang:this.props.lang , country_id: response.data.data.country_id })
                            .then( (response)=> {
                                this.setState({cities: response.data.data});
                            }).catch( (error)=> {
                            this.setState({spinner: false});
                        });

                        this.setState({
                            blog: response.data.data,
                            key : response.data.data.key
                        });

                        this.setState({phone: response.data.data.phone});
                        this.setState({youtube: response.data.data.youtube});
                        this.setState({country_id: response.data.data.country_id});
                        this.setState({city_id: response.data.data.city_id});
                        this.setState({title: response.data.data.title});
                        this.setState({price: response.data.data.price});
                        this.setState({description: response.data.data.description});
                        this.setState({mobile: response.data.data.mobile});
                        this.setState({category_id: response.data.data.category_id});
                        this.setState({sub_section_id: response.data.data.sub_section_id});
                        this.setState({section_id: response.data.data.section_id});
                        this.setState({is_location: response.data.data.is_location});
                        this.setState({sub_category_id: response.data.data.sub_category_id});
                        this.setState({is_chat: response.data.data.is_chat});
                        this.setState({is_phone: response.data.data.is_phone});
                        this.setState({is_refresh: response.data.data.is_refreshed});
                        this.setState({images: response.data.data.images});
                        this.setState({year: response.data.data.model});
                        this.setState({
                            region: {
                                latitude:  response.data.data.latitude,
                                longitude: response.data.data.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }
                        });

                        for(let i = 2020; i > 1990 ; i--){
                            this.state.years.push(JSON.stringify(i));
                        }

                        // axios.post(`${CONST.url}sections`, {
                        //     lang: this.props.lang ,
                        //     sub_category_id : response.data.data.sub_category_id
                        // }).then((response)=> {
                        //     this.setState({sections: response.data.data});
                        //
                        //     axios.post(`${CONST.url}models`, {
                        //         lang       : this.props.lang ,
                        //         section_id : this.state.section_id
                        //     }).then((response)=> {
                        //         this.setState({
                        //             models : response.data.data,
                        //             spinner:false
                        //         });
                        //     }).catch(e => {
                        //         this.setState({spinner:false});
                        //     });
                        //
                        // });




                        axios.post(`${CONST.url}codes`, {lang: this.props.lang  })
                            .then((response) => {
                                this.setState({codes: response.data.data});
                                // this.setState({key: response.data.data[0]});
                            })
                            .catch((error) => {
                                this.setState({spinner: false});
                            }).then(() => {
                            this.setState({spinner: false});
                        });

                        axios.post(`${CONST.url}categories`, { lang: this.props.lang  })
                            .then( (response)=> {
                                this.setState({categories : response.data.data})

                                // axios.post(`${CONST.url}sub_categories`, { lang: this.props.lang  ,id : this.state.category_id })
                                //     .then( (response)=> {
                                //
                                //         this.setState({sub_categories : response.data.data})
                                //
                                //     }).catch( (error)=> {
                                //     this.setState({spinner: false});
                                // });


                            }).catch( (error)=> {
                            this.setState({spinner: false});
                        }).then(()=>{
                            this.setState({spinner: false});
                        });;


                    })
                    .catch( (error)=> {
                        this.setState({spinner: false});
                    })

            })
            .catch( (error)=> {
                this.setState({spinner: false});

            })

    }

    onFocus() {
        this.componentWillMount()
    }

    onValueYear     (value) {this.setState({year: value});}

    renderMap() {
        if(this.state.region.latitude !== null)
        {
            return (
                <View style={[ styles.Width_90, styles.height_250, styles.Radius_5, styles.flexCenter, styles.marginVertical_10 ]}>
                    <MapView
                        style={styles.map}
                        showsBuildings={true}
                        minZoomLevel={7}

                        initialRegion={this.state.region}
                        onRegionChangeComplete={this.onRegionChange}

                    />
                    <View style={styles.markerFixed}>
                        <Image style={styles.marker} source={marker} />
                    </View>

                </View>
            )
        }
    }

    onRegionChange = region => {
        this.setState({
            region
        })
    };

    onValueChange_key(key) {
        this.setState({key : key});
    }

    onValueChange(value) {

        this.setState({country_id: value});
        setTimeout(()=>{

            this.setState({spinner: true});
            axios.post(`${CONST.url}cities`, { lang:this.props.lang , country_id: this.state.country_id })
                .then( (response)=> {

                    this.setState({cities: response.data.data});
                    this.setState({city_id: response.data.data[0].id});

                    axios.post(`${CONST.url}codes`, {lang: this.props.lang  })
                        .then((response) => {
                            this.setState({codes: response.data.data});
                        })
                        .catch((error) => {
                            this.setState({spinner: false});
                        }).then(() => {
                        this.setState({spinner: false});
                    });
                })

                .catch( (error)=> {
                    this.setState({spinner: false});
                }).then(()=>{
                this.setState({spinner: false});
            });

        },1000);
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

    validate = () => {
        let isError = false;
        let msg = '';

        if (this.state.title === '') {
            isError = true;
            msg = I18n.t('titleValidation');
        }else if (this.state.price === '') {
            isError = true;
            msg = I18n.t('priceRequired');
        }else if (this.state.description === '') {
            isError = true;
            msg = I18n.t('descriptionRequired');
        }
        if (msg != ''){
            CONST.showToast( msg,  "danger")
          //  Toast.show({ text: msg, duration : 2000  ,type :"danger", textStyle: {  color: "white",fontFamily : 'CairoRegular' ,textAlign:'center' } });

        }
        return isError;
    };

    onLoginPressed() {
        const err = this.validate();
        if (!err){
            this.setState({ isLoaded: true });
            this.state.formData.append('id',this.props.navigation.state.params.id);
            axios.post(`${CONST.url}uploadVideo`, this.state.formData)
                .then((response) => {
                }).catch((error) => {
            });
            this.state.formData.append('id',this.props.navigation.state.params.id);
            axios.post(`${CONST.url}uploadVideo`, this.state.formData)
                .then((response) => {
                }).catch((error) => {
            });
            axios.post(`${CONST.url}editAd`,
                {
                    id              : this.props.navigation.state.params.id,
                    title           : this.state.title,
                    mobile          : this.state.mobile,
                    phone           : this.state.phone,
                    youtube         : this.state.youtube,
                    price           : this.state.price,
                    key             : this.state.key,
                    description     : this.state.description,
                    country_id      : this.state.country_id,
                    latitude        : this.state.region.latitude,
                    longitude       : this.state.region.longitude,
                    user_id         : this.state.user_id,
                    city_id         : this.state.city_id,
                    category_id     : this.state.category_id,
                    sub_category_id : this.state.sub_category_id,
                    is_refreshed    : this.state.is_refresh,
                    sub_section_id  : this.state.sub_section_id,
                    section_id      : this.state.section_id,
                    is_mobile       : this.state.is_phone,
                    is_chat         : this.state.is_chat,
                    is_location     : this.state.is_location,
                    model           : this.state.year,
                    images          : base64
                }
            )
                .then( (response)=> {
                    if(response.data.value === '1' )
                    {
                        CONST.showToast(response.data.msg,  "success")

                        // Toast.show({ text:response.data.msg, duration : 2000  ,type :"success", textStyle: {  color: "white",fontFamily : 'CairoRegular' ,textAlign:'center' } });
                        this.props.navigation.navigate('MyAds');
                    }else {
                        CONST.showToast(response.data.msg,  "danger")
                        //Toast.show({ text:response.data.msg, duration : 2000  ,type :"danger", textStyle: {  color: "white",fontFamily : 'CairoRegular' ,textAlign:'center' } });
                    }
                }).catch( (error)=> {
                    this.setState({isLoaded: false});
                }).then(()=>{
                this.setState({isLoaded: false});
            });
        }
    }

    renderSubmit() {
        if (this.state.isLoaded){
            return(
                <View  style={{ justifyContent:'center', alignItems:'center', marginVertical: 30}}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }
        return (
            <Button  onPress={() => this.onLoginPressed()} style={styles.bgLiner}>
                <Text style={styles.textBtn}>{I18n.translate('send')}</Text>
            </Button>
        );
    }

    onValueChangeCity(value) {
        this.setState({
            city_id     : value
        });
    }

    onValueChange_category(value) {
        this.setState({category_id : value});
        setTimeout(()=>{
            axios.post(`${CONST.url}sub_categories`, { lang: this.props.lang  ,id : this.state.category_id })
                .then( (response)=> {
                    this.setState({sub_categories : response.data.data})
                }).catch( (error)=> {
                this.setState({spinner: false});
            });
        },1000);
    }

    onValueChange_sub(value) {
        this.setState({sub_category_id : value});
    }

    images_video = async (i) => {

        if (i.i === 0) {

            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes : ImagePicker.MediaTypeOptions.All,
                aspect     : [4, 3],
                quality    : .5,
                base64     : true
            });
            if (!result.cancelled) {
                this.setState({
                    photos : this.state.photos.concat(result.uri)
                });
                base64.push(result.base64);
            }

        } else if (i.i === 1) {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes : ImagePicker.MediaTypeOptions.All,
                aspect     : [4, 3],
                quality    : .5,
                base64     : true
            });
            if (!result.cancelled) {
                this.setState({
                    photos: this.state.photos.concat(result.uri)
                });
                base64.push(result.base64);
            }

        } else if (i.i === 2) {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: 'Videos',
                quality: 0
            });
            if (!result.cancelled) {
                this.setState({video: result.uri ,video_base64:result.base64, image: result.uri});
            }

            let localUri = result.uri;
            let filename = localUri.split('/').pop();
            let match    = /\.(\w+)$/.exec(filename);
            let type     = match ? `video/${match[1]}` : video;
            this.state.formData.append('media', {
                uri: localUri, name: filename, type
            });
        }
    };


    imageBrowserCallback = ( callback  ) => {
        callback.then((photos) => {
                this.setState({
                    imageBrowserOpen   : false,
                    cameraBrowserOpen  : false,
                    photos             : this.state.photos.concat(photos)
                });
                const imgs = this.state.photos;
                for (let i =0; i < imgs.length; i++){
                    const imageURL = imgs[i].file;
                    Image.getSize(imageURL, (width, height) => {
                        let imageSize = {
                            size: {
                                width,
                                height
                            },
                            offset: {
                                x: 0,
                                y: 0,
                            },
                        };
                        ImageEditor.cropImage(imageURL, imageSize, (imageURI) => {
                            ImageStore.getBase64ForTag(imageURI, (base64Data) => {
                                base64.push(base64Data);
                            }, (reason) => console.log(reason) )
                        }, (reason) => console.log(reason) )
                    }, (reason) => console.log(reason))
                }
            }
        ).catch((e) => console.log(e))
    };
    delete_img(i) {
        this.state.photos.splice(i,1);
        base64.splice(i,1);
        this.setState({photos: this.state.photos})
    }
    delete_video(i) {
        this.setState({image: null , video : ''})
    }
    deleteـImage(id,i) {
        this.setState({spinner: true});
        axios.post(`${CONST.url}deleteImage`, { lang:this.props.lang , id:id })
            .then( (response)=> {

                if(response.data.value === '1' )
                {
                    this.state.images.splice(i,1);
                    // Toast.show({ text:response.data.msg, duration : 2000  ,type :"success", textStyle: {  color: "white",fontFamily : 'CairoRegular' ,textAlign:'center' } });
                    CONST.showToast(response.data.msg,  "success")

                }else {
                    CONST.showToast(response.data.msg,  "danger")

                    // Toast.show({ text:response.data.msg, duration : 2000  ,type :"danger", textStyle: {  color: "white",fontFamily : 'CairoRegular' ,textAlign:'center' } });
                }
            })

            .catch( (error)=> {
                this.setState({spinner: false});
            }).then(()=>{
            this.setState({spinner: false});
        });
    }
    renderImage(item, i) {
        return(
            <View key={i} style={{height: 70, width: 70, margin: 10, overflow : 'hidden', borderRadius : 5 }}>

                <Image
                    style={{width : '100%', height :  "100%"}}
                    source={{uri: item}}
                    key={i}
                />
                <TouchableOpacity onPress={()=> {this.delete_img(i)}} style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    width: '100%',
                    height : '100%',
                    alignItems  : 'center',
                    justifyContent : 'center'
                }}>

                    <Icon name="close" style={{ color : 'white' , textAlign:'center', fontSize:32}}/>

                </TouchableOpacity>
            </View>
        )
    }
    renderImages(item, i) {
        return(
            <View key={i} style={{height: 70, width: 70, margin: 10, overflow : 'hidden', borderRadius : 5 }}>

                <Image
                    style={{width : '100%', height : '100%'}}
                    source={{uri: item.url}}
                    key={i}
                />
                <TouchableOpacity onPress={()=> {this.deleteـImage(item.id,i)}} style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    width: '100%',
                    height : '100%',
                    alignItems  : 'center',
                    justifyContent : 'center'
                }}>

                    <Icon name="close" style={{ color : 'white' , textAlign:'center', fontSize:25}}/>

                </TouchableOpacity>
            </View>
        )
    }
    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }
    };

    onValueChangeSection(value){
        this.setState({spinner: true , section_id: value});
        axios.post(`${CONST.url}models`, {
            lang       : this.props.lang ,
            section_id : value
        }).then((response)=> {
            this.setState({
                models : response.data.data,
                spinner:false
            });
        }).catch(e => {
            this.setState({spinner:false});
        });
    }

    onValueChangeModel(value){
        this.setState({ sub_section_id: value});
    }

    render() {
        const { width } = Dimensions.get('window');
        if (this.state.imageBrowserOpen) {
            return(<ImageBrowser base64={true}  max={8}  callback={this.imageBrowserCallback}/>);
        }else if (this.state.cameraBrowserOpen) {

            return(<CameraBrowser base64={true}   max={8} callback={this.imageBrowserCallback}/>);
        }

        return (
            <Container>
                <NavigationEvents onWillFocus={() => this.onFocus()} />
                {/*<Spinner visible={this.state.spinner}/>*/}
                <Header style={styles.Header_Up}>
                    <Body style={[styles.body_header,styles.textHead]}>
                        <Title style={styles.headerTitle}>{I18n.translate('editProduct')}</Title>
                    </Body>
                    <Right style={[ styles.RightDir ]}>
                        <Button transparent onPress={()=> this.props.navigation.goBack()} >
                            <Icon style={styles.icons} type="AntDesign" name={ (this.state.lang !== 'ar' || this.state.lang == null) ? 'right' : 'left' }/>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <View style={styles.upload}>
                        <Text style={styles.textes}>{I18n.translate('add_photo')}</Text>
                        <View >
                            <TouchableOpacity onPress={()=> this.open()}>
                                <View style={styles.blockUpload}>
                                    <Icon style={styles.iconUpload} active type="AntDesign" name='pluscircleo' />
                                    <Text style={styles.textes}>
                                        {I18n.translate('image_video')}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView showsHorizontalScrollIndicator={false}    horizontal={true} style={{marginHorizontal: 20}}>
                        {this.state.photos.map((item,i) => this.renderImage(item,i))}
                        {this.state.images.map((item,i) => this.renderImages(item,i))}
                        {
                            (this.state.video !== '')

                                ?
                                <View style={{height: 70, width: 70, margin: 10, overflow : 'hidden', borderRadius : 5 }}>
                                    <Image source={{uri: this.state.image}} style={{width : '100%', height : '100%'}}/>
                                    <TouchableOpacity onPress={()=> {this.delete_video()}} style={{
                                        position: 'absolute',
                                        right: 0,
                                        top: 0,
                                        backgroundColor: 'rgba(0,0,0,0.5)',
                                        width: '100%',
                                        height : '100%',
                                        alignItems  : 'center',
                                        justifyContent : 'center'
                                    }}>
                                        <Icon name="close" style={{ color : 'white' , textAlign:'center', fontSize:22}}/>
                                    </TouchableOpacity>
                                </View>
                                : <View/>
                        }
                    </ScrollView>

                    <View style={[ styles.rowGroup, styles.paddingHorizontal_15, styles.marginVertical_10 ]}>
                        <View style={[ styles.flex_50, { paddingHorizontal : 2 } ]}>
                            <Item style={[ styles.itemPiker_second, { borderWidth : 0.5, borderColor : '#b5b5b5' } ]} regular>
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
                                <Icon style={styles.iconPicker} type="AntDesign" name='down' />
                            </Item>
                        </View>
                        <View style={[ styles.flex_50, { paddingHorizontal : 2,position : 'relative', right : -2 } ]}>
                            <Item style={[ styles.itemPiker_second, { borderWidth : 0.5, borderColor : '#b5b5b5' } ]} regular>
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
                                <Icon style={styles.iconPicker} type="AntDesign" name='down' />
                            </Item>
                        </View>
                    </View>

                    {
                        (this.state.year !== null) ?
                            <View style={[styles.Width_100, styles.paddingHorizontal_15]}>
                                <View style={[styles.flexCenter,{ marginBottom : 5, marginTop : 15 }, styles.bg_White, styles.Width_100 , { borderBottomWidth : 1, borderBottomColor : '#DDD' }]}>
                                    <Item style={[ styles.itemPiker_second, { borderWidth : 0.5, borderColor : '#b5b5b5' } ]} regular>
                                        <Picker
                                            mode                    = "dropdown"
                                            style                   = {styles.Picker}
                                            placeholderStyle        = {[styles.textRegular,{ color: "#444", writingDirection: 'rtl', width : '100%', fontSize : 14 }]}
                                            selectedValue           = {this.state.year}
                                            onValueChange           = {this.onValueYear.bind(this)}
                                            textStyle               = {[styles.textRegular,{ color: "#444", writingDirection: 'rtl',paddingLeft : 5, paddingRight: 5 }]}
                                            placeholder             = {I18n.translate('choose_model')}
                                            itemTextStyle           = {[styles.textRegular,{ color: "#444", writingDirection: 'rtl' }]}
                                        >
                                            <Picker.Item style={[styles.itemPicker]} label={I18n.translate('choose_model')} value={null} />

                                            {
                                                this.state.years.map((year, i) => (
                                                    <Picker.Item style={[styles.itemPicker]} key={i} label={year} value={year} />
                                                ))
                                            }

                                        </Picker>
                                    </Item>
                                    <Icon style={styles.iconPicker} type="AntDesign" name='down' />
                                </View>
                            </View>
                            :
                            <View/>
                    }

                    <KeyboardAvoidingView behavior="padding" style={{  flex: 1}} >
                        <View style={[ styles.block_section , { margin : 0 , marginHorizontal : 10, padding : 0 ,paddingHorizontal : 5 } ]}>

                            {/*<Item style={styles.item}>*/}
                            {/*    <Input  value = {this.state.title} onChangeText={(title)=>{ this.setState({title})}} style={[styles.input, { paddingRight : 10,paddingLeft : 10}]} placeholder={I18n.translate('title')} />*/}
                            {/*</Item>*/}

                            {/*<Item style={styles.item}>*/}
                            {/*    <Input value={this.state.price} keyboardType={'number-pad'} style={[styles.input, { paddingRight : 10,paddingLeft : 10}]}   onChangeText={(price)=>{ this.setState({price})}} placeholder={I18n.translate('price')} />*/}
                            {/*</Item>*/}

                            <View style={[ styles.item, { borderColor : '#DDD' ,borderWidth : .5 } ]} >
                                <Input
                                    // style={[styles.input,{width : '100%'}]}
                                    placeholder={ I18n.translate('title')}
                                    onChangeText={(title) => this.setState({title})}
                                    style={[styles.input, styles.height_50, { paddingRight : 10, paddingLeft : 10, color : "#121212" }]}
                                    value = {this.state.title}
                                />
                            </View>

                            <View style={[ styles.item, { borderColor : '#DDD' ,borderWidth : .5 } ]} >
                                <Input
                                    // style={[styles.input,{width : '100%'}]}
                                    placeholder={ I18n.translate('price')}
                                    onChangeText={(price) => this.setState({price})}
                                    style={[styles.input, styles.height_50, { paddingRight : 10, paddingLeft : 10, color : "#121212" }]}
                                    value={this.state.price}
                                />
                            </View>

                            <View style={[styles.overHidden, styles.Width_100]}>
                                <Textarea value={this.state.description} style={{
                                    borderBottomColor       : '#DDD',
                                    borderBottomWidth       : 1,
                                    height                  : 100,
                                    textAlign               : 'right',
                                    color                   : '#444',
                                    fontFamily              : 'CairoRegular',
                                    fontSize                : 14,
                                    borderColor             : '#DDD',
                                    width                   : '100%',
                                    padding                 : 0
                                }}  onChangeText={(description)=>{ this.setState({description})}}  rowSpan={5} bordered placeholder={I18n.translate('description')} />
                            </View>

                            {/*<View style={{flex:1, flexDirection: 'row'}}>*/}

                            {/*    <View style={{flex:2}}>*/}
                            {/*        <Item  style={styles.item} >*/}
                            {/*            <Icon style={[styles.icon_input , {top : 20}]} active type="FontAwesome" name='whatsapp' />*/}
                            {/*            <Input style={styles.input}  keyboardType={'number-pad'} onChangeText={(phone) => this.setState({phone})}  value={ this.state.phone } placeholder={ I18n.translate('whatsapp')}   />*/}
                            {/*        </Item>*/}
                            {/*    </View>*/}

                            {/*    <View style={{flex:1, top : 18}}>*/}

                            {/*        <Item style={[ styles.itemPiker_second ]} regular>*/}
                            {/*            <Picker*/}
                            {/*                iosHeader={I18n.translate('choose_code')}*/}
                            {/*                headerBackButtonText={I18n.translate('goBack')}*/}
                            {/*                mode="dropdown"*/}
                            {/*                style={styles.Picker}*/}
                            {/*                selectedValue={this.state.key}*/}
                            {/*                onValueChange={this.onValueChange_key.bind(this)}*/}
                            {/*                placeholderStyle={{ color: "#bbb", writingDirection: 'rtl', width : '100%',fontFamily : 'CairoRegular', fontSize : 16 }}*/}
                            {/*                textStyle={{ color: "#bbb",fontFamily : 'CairoRegular', writingDirection: 'rtl',paddingLeft : 0,paddingRight : 0 }}*/}
                            {/*                placeholder={I18n.translate('choose_code')}*/}
                            {/*                itemTextStyle={{ color: '#bbb',fontFamily : 'CairoRegular', writingDirection: 'rtl' }}>*/}

                            {/*                <Picker.Item style={styles.itemPicker} label={I18n.translate('choose_code')} value={null} />*/}

                            {/*                {*/}
                            {/*                    this.state.codes.map((country, i) => (*/}
                            {/*                        <Picker.Item style={styles.itemPicker} key={i} label={country} value={country} />*/}
                            {/*                    ))*/}
                            {/*                }*/}

                            {/*            </Picker>*/}
                            {/*            <Icon style={styles.iconPicker} type="AntDesign" name='down' />*/}
                            {/*        </Item>*/}

                            {/*    </View>*/}

                            {/*</View>*/}


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
                                            onChangeText={(phone) => this.setState({phone})}
                                            value={ this.state.phone }
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
                                            selectedValue={this.state.key}
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

                        <View style={[styles.textsetting, styles.bgLiner, styles.height_40, styles.width_200, styles.Radius_5]}>
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

                        {/*<ListItem  onPress={() => this.setState({ is_phone: !this.state.is_phone })}>*/}
                        {/*    <CheckBox*/}
                        {/*        checked={this.state.is_phone}*/}
                        {/*        value={this.state.is_phone}*/}
                        {/*        style = {[styles.checkBox]}*/}
                        {/*    />*/}
                        {/*    <Body>*/}
                        {/*        <Text style={styles.textIner}>{I18n.translate('with_phone')}</Text>*/}
                        {/*    </Body>*/}
                        {/*</ListItem>*/}

                        {/*<ListItem  onPress={() => this.setState({ is_refresh: !this.state.is_refresh })}>*/}
                        {/*    <CheckBox*/}
                        {/*        checked={this.state.is_refresh}*/}
                        {/*        style = {[styles.checkBox]}*/}
                        {/*    />*/}
                        {/*    <Body>*/}
                        {/*        <Text style={styles.textIner}>{I18n.translate('renew')}</Text>*/}
                        {/*    </Body>*/}
                        {/*</ListItem>*/}

                        {/*<ListItem   onPress={() => this.setState({ is_chat: !this.state.is_chat })}>*/}
                        {/*    <CheckBox*/}
                        {/*        checked={this.state.is_chat}*/}
                        {/*        value={this.state.is_chat}*/}
                        {/*        style = {[styles.checkBox]}*/}
                        {/*    />*/}
                        {/*    <Body>*/}
                        {/*        <Text style={styles.textIner}>{I18n.translate('private')}</Text>*/}
                        {/*    </Body>*/}
                        {/*</ListItem>*/}

                        { this.renderMap() }

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
export default connect(mapStateToProps,{})(Edit_ad);
