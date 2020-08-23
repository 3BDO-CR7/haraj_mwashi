import React  from 'react';
import {
    StyleSheet,
    ScrollView,
    I18nManager,
    Platform,
    TouchableOpacity,
    ImageEditor,
    Image,
    ImageStore,
    Dimensions,
    KeyboardAvoidingView, ActivityIndicator
} from 'react-native';
import {
    Container,
    Icon,
    Content,
    ActionSheet,
    Button,
    Title,
    Text,
    View,
    Item,

    Picker,
    Toast, Body, Right, Header
}
    from 'native-base';
import axios       from "axios";
// import {Bubbles}   from "react-native-loader";
import {connect}   from "react-redux";
// import Spinner     from "react-native-loading-spinner-overlay";

import MapView from 'react-native-maps'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import I18n from "ex-react-native-i18n";
import {ImageBrowser,CameraBrowser} from 'expo-multiple-imagepicker';

let    base64   = [];
let    Base64_   = [];

const  height = Dimensions.get('window').height;
import marker from '../../assets/marker.png'
import {NavigationEvents} from "react-navigation";
// const  base_url  = 'http://plus.4hoste.com/api/';
const  isIphoneX = Platform.OS === 'ios' && height == 812 || height == 896;

import styles from '../../assets/style'

import CONST from '../consts';

let BUTTONS = [
    { text: I18n.translate('gallery_photo') ,i : 0 },
    // { text: I18n.translate('camera_photo'),i : 1},
    { text: I18n.translate('cancel'),   color: "#ff5b49" }
];
let DESTRUCTIVE_INDEX = 3;
let CANCEL_INDEX = 3;


class EditPhotoAd extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            lang             : 'ar',
            blog             : '',
            city_id          : null,
            user_id          : this.props.auth.data.id,

            country_id       : null,
            sub_category_id       : null,
            category_id       : null,
            imageBrowserOpen : false,
            isLoaded         : false,
            cameraBrowserOpen: false,
            photos           : [],
            countries        : [],
            categories        : [],
            sub_categories        : [],
            codes            : [],
            images           : [],
            base64           : [],
            cities           : [],
            region           : {
                latitudeDelta    : 0.0922,
                longitudeDelta   : 0.0421,
                latitude         : null,
                longitude        : null
            }
        };

    }

    async componentWillMount() {

        this.setState({lang : this.props.lang});
        this.setState({spinner: true});

        this.setState({images: [],photos: []});

        axios.post(`${CONST.url}countries`, { lang: this.props.lang  })
            .then( (response)=> {
                this.setState({countries: response.data.data});
                axios.post(`${CONST.url}cities`, { lang:this.props.lang , country_id: this.state.countries[0].id })
                    .then( (response)=> {
                        this.setState({cities: response.data.data});
                        axios.post(`${CONST.url}codes`, { lang: this.props.lang  })
                            .then( (response)=> {

                                this.setState({codes: response.data.data});
                                this.setState({key: response.data.data[0]});

                                axios.post(`${CONST.url}BlogDetails`, {
                                    lang    : this.props.lang ,
                                    id      : this.props.navigation.state.params.id
                                })
                                    .then( (response)=> {

                                        this.setState({
                                            blog            : response.data.data,
                                            country_id      : response.data.data.country_id,
                                            city_id         : response.data.data.city_id,
                                            title           : response.data.data.title,
                                            price           : response.data.data.price,
                                            description     : response.data.data.description,
                                            mobile          : response.data.data.mobile,
                                            category_id     : response.data.data.category_id,
                                            sub_category_id : response.data.data.sub_category_id,
                                            is_chat         : response.data.data.is_chat,
                                            is_phone        : response.data.data.is_phone,
                                            is_refresh      : response.data.data.is_refresh,
                                            region          : {
                                                latitude        : response.data.data.latitude,
                                                longitude       : response.data.data.longitude,
                                                latitudeDelta   : 0.0922,
                                                longitudeDelta  : 0.0421,
                                            }
                                        });

                                        axios.post(`${CONST.url}categories`, { lang: this.props.lang  })
                                            .then( (response)=> {
                                                this.setState({categories : response.data.data});

                                                axios.post(`${CONST.url}sub_categories`, { lang: this.props.lang  ,id : this.state.category_id })
                                                    .then( (response)=> {

                                                        this.setState({sub_categories : response.data.data})

                                                    }).catch( (error)=> {
                                                    this.setState({spinner: false});
                                                });


                                            }).catch( (error)=> {
                                            this.setState({spinner: false});
                                        }).then(()=>{
                                            this.setState({spinner: false});
                                        });

                                    })
                                    .catch( (error)=> {
                                        this.setState({spinner: false});
                                    })
                            })
                            .catch( (error)=> {
                                this.setState({spinner: false});
                            })
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

    renderMap() {
        if(this.state.region.latitude !== null)
        {
            return (
                <View style={styles.map}>
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

    onValueChange(value) {

        this.setState({country_id: value});

        setTimeout(()=>{

            this.setState({spinner: true});
            axios.post(`${CONST.url}cities`, { lang:this.props.lang , country_id: this.state.country_id })
                .then( (response)=> {

                    this.setState({cities: response.data.data});
                    this.setState({city_id: response.data.data[0].id});
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

    async images_video(i) {

        if(i.i === 0) {
            this.setState({imageBrowserOpen: true});
        }else if(i.i === 1)
        {
            this.setState({cameraBrowserOpen: true});

        }else if(i.i === 2)
        {

            let result = await ImagePicker.launchImageLibraryAsync({
                aspect: [4, 3],
                base64: true,
                mediaTypes:'Videos',

            });
            if (!result.cancelled) {
                this.setState({
                    video: result.uri,
                    image: result.uri,
                    type: result.type,
                });
            }
        }
    }

    validate = () => {
        let isError = false;
        let msg = '';


        if (msg != ''){
            CONST.showToast(msg,  "danger")

            // Toast.show({ text: msg, duration : 2000  ,type :"danger", textStyle: {  color: "white",fontFamily : 'CairoRegular' ,textAlign:'center' } });

        }
        return isError;
    };

    onLoginPressed() {

        const err = this.validate();
        if (!err){

            this.setState({ isLoaded: true });

            axios.post(`${CONST.url}editPhotoAd`,

                {
                    // id              : this.props.navigation.state.params.id,
                    // country_id      : this.state.country_id,
                    // latitude        : this.state.region.latitude,
                    // longitude       : this.state.region.longitude,
                    // user_id         : this.state.user_id,
                    // city_id         : this.state.city_id,
                    // category_id     : this.state.category_id,
                    // sub_category_id : this.state.sub_category_id,
                    // files           : base64[0]
                    latitude        : this.state.region.latitude,
                    longitude       : this.state.region.longitude,
                    user_id         : this.state.user_id,
                    url             : this.state.url,
                    images          : Base64_[0]

                }

            )
                .then( (response)=> {
                    if(response.data.value === '1' )
                    {
                        // Toast.show({ text:response.data.msg, duration : 2000  ,type :"success", textStyle: {  color: "white",fontFamily : 'CairoRegular' ,textAlign:'center' } });
                        CONST.showToast(response.data.msg,  "success")

                        this.props.navigation.navigate('MyAds');
                    }else {
                        CONST.showToast(response.data.msg,  "danger")
                        // Toast.show({ text:response.data.msg, duration : 2000  ,type :"danger", textStyle: {  color: "white",fontFamily : 'CairoRegular' ,textAlign:'center' } });
                    }
                })

                .catch( (error)=> {
                    console.log(error);
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
            city_id: value
        });
    }

    // onValueChange(value) {
    //     this.setState({key : value});
    // }

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

    imageBrowserCallback = ( callback  ) => {

        callback.then((photos) => {

                this.setState({
                    cameraBrowserOpen: false,
                    imageBrowserOpen: false,
                    photos: this.state.photos.concat(photos)
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
        Base64_.splice(i,1);
        this.setState({photos: this.state.photos})
    }

    renderImage(item, i) {
        return(
            <View key={i}>

                <Image
                    style={{height: 70, width: 70 , marginHorizontal: 10}}
                    source={{uri: item.file}}
                    key={i}
                />
                <TouchableOpacity onPress={()=> {this.delete_img(i)}} style={{position:'absolute' , right: 15 , top :0 , backgroundColor:'#444'   , width: 25 }}>

                    <Icon name="close" style={{ color : 'white' , textAlign:'center', fontSize:32}}/>

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

    render() {

        const { width } = Dimensions.get('window');

        if (this.state.imageBrowserOpen) {
            return(<ImageBrowser base64={true}  max={1}  callback={this.imageBrowserCallback}/>);
        }else if (this.state.cameraBrowserOpen) {

            return(<CameraBrowser base64={true}   max={1} callback={this.imageBrowserCallback}/>);
        }


        return (
            <Container>
                <NavigationEvents onWillFocus={() => this.onFocus()} />

                {/*<Spinner visible={this.state.spinner}/>*/}

                <Header style={styles.Header_Up}>
                    <Body style={[ styles.body_header , styles.textHead ]}>
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
                         <View >
                            <TouchableOpacity onPress={()=> this.open()}>
                                <View style={styles.blockUpload}>
                                    <Icon style={[ styles.iconUpload , styles.text_darkGreen ]} active type="AntDesign" name='pluscircleo' />
                                    <Text style={[ styles.textes , styles.text_darkGreen ]}>
                                        {I18n.translate('image_video')}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <ScrollView showsHorizontalScrollIndicator={false}    horizontal={true} style={{marginHorizontal: 20}}>
                        {this.state.photos.map((item,i) => this.renderImage(item,i))}
                        {/*{this.state.images.map((item,i) => this.renderImages(item,i))}*/}
                    </ScrollView>

                    <KeyboardAvoidingView behavior="padding" style={{  flex: 1}} >

                        <View style={styles.block_section}>

                            <Item style={[ styles.itemPiker_second ]} regular>

                                <Picker
                                    iosHeader={I18n.translate('categories')}
                                    headerBackButtonText={I18n.translate('goBack')}
                                    mode="dropdown"
                                    placeholderStyle={{ color: "#c5c5c5", writingDirection: 'rtl' }}
                                    placeholderIconColor="#444"
                                    style={{width: '100%',left :3,backgroundColor:'transparent'}}
                                    selectedValue={this.state.category_id}
                                    itemTextStyle={{ color: '#c5c5c5' }}
                                    onValueChange={this.onValueChange_category.bind(this)}>
                                    {this.state.categories.map((city, i) => {
                                        return <Picker.Item   style={{color: "#444",marginHorizontal: 20}}  key={i} value={city.id} label={city.name} />
                                    })}

                                </Picker>
                                <Icon style={{color: "#acabae", right: '90%',fontSize:18}} name='down' type="AntDesign"/>

                            </Item>


                            {
                                (this.state.category_id !== 17)

                                    ?
                                    <Item style={[ styles.itemPiker_second ]} regular>

                                        <Picker
                                            iosHeader={I18n.translate('sub_categories')}
                                            headerBackButtonText={I18n.translate('goBack')}
                                            mode="dropdown"
                                            placeholderStyle={{ color: "#c5c5c5", writingDirection: 'rtl' }}
                                            placeholderIconColor="#444"
                                            style={{width: '100%',left :3,backgroundColor:'transparent'}}
                                            selectedValue={this.state.sub_category_id}
                                            itemTextStyle={{ color: '#c5c5c5' }}
                                            onValueChange={this.onValueChange_sub.bind(this)}>
                                            {this.state.sub_categories.map((city, i) => {
                                                return <Picker.Item   style={{color: "#444",marginHorizontal: 20}}  key={i} value={city.id} label={city.name} />
                                            })}

                                        </Picker>
                                        <Icon style={{color: "#acabae", right: '90%',fontSize:18}} name='down' type="AntDesign"/>

                                    </Item>

                                    :
                                    <View/>
                            }

                            <Item style={[ styles.itemPiker_second ]} regular>

                                <Picker
                                    iosHeader={I18n.translate('choose_country')}
                                    headerBackButtonText={I18n.translate('goBack')}
                                    mode="dropdown"
                                    placeholderStyle={{ color: "#c5c5c5", writingDirection: 'rtl' }}
                                    placeholderIconColor="#444"
                                    style={{width: '100%',left :3,backgroundColor:'transparent'}}
                                    selectedValue={this.state.country_id}
                                    itemTextStyle={{ color: '#c5c5c5' }}
                                    onValueChange={this.onValueChange.bind(this)}>
                                    {this.state.countries.map((city, i) => {
                                        return <Picker.Item   style={{color: "#444",marginHorizontal: 20}}  key={i} value={city.id} label={city.name} />
                                    })}

                                </Picker>
                                <Icon style={{color: "#acabae", right: '90%',fontSize:18}} name='down' type="AntDesign"/>

                            </Item>

                            <Item style={[ styles.itemPiker_second ]} regular>
                                <Picker
                                    mode="dropdown"
                                    iosHeader={I18n.translate('myCity')}
                                    headerBackButtonText={I18n.translate('goBack')}
                                    style={{width: '100%',left :3,backgroundColor:'transparent'}}
                                    placeholderStyle={{ color: "#c5c5c5", writingDirection: 'rtl' }}
                                    selectedValue={this.state.city_id}
                                    onValueChange={this.onValueChangeCity.bind(this)}
                                    textStyle={{ color: "#acabae" }}
                                    // placeholder={I18n.translate('choose_city')}
                                    itemTextStyle={{ color: '#c5c5c5' }}>
                                    {this.state.cities.map((city, i) => {
                                        return <Picker.Item   style={{color: "#444" ,marginHorizontal: 20}}  key={i} value={city.id} label={city.name} />
                                    })}
                                </Picker>
                                <Icon style={{color: "#acabae", right: '90%',fontSize:18}} name='down' type="AntDesign"/>

                            </Item>
                        </View>

                        <Text style={[styles.text , styles.textsetting]}>{I18n.translate('configurations')}</Text>

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
export default connect(mapStateToProps,{})(EditPhotoAd);




