import React  from 'react';
import {
    TouchableOpacity,
    ImageEditor,
    Image,
    ImageStore,
    ActivityIndicator,
    KeyboardAvoidingView
} from 'react-native';
import {Container, Icon, Content, ActionSheet, Button, Title, Text, View, Toast, Body, Right, Header, Input, Item} from 'native-base';
import FormData from 'form-data';
import axios       from "axios";
import {connect}   from "react-redux";
// import Spinner     from "react-native-loading-spinner-overlay";
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker';
import I18n from "ex-react-native-i18n";
import {ImageBrowser,CameraBrowser} from 'expo-multiple-imagepicker';
let    base64         = [];
let    Base64_        = [];
import CONST from '../consts';
import styles from '../../assets/style'
import {NavigationEvents} from "react-navigation";

let BUTTONS           = [
    { text: I18n.translate('gallery_photo') ,   i    : 0 },
    { text: I18n.translate('camera_photo')  ,   i    : 1},
    { text: I18n.translate('cancel')        ,   color: "#F00" }
];

let DESTRUCTIVE_INDEX = 3;
let CANCEL_INDEX      = 3;

class AddPhotoAds extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lang                : this.props.lang,
            type                : 2,
            user_id             : this.props.auth.data.id,
            country_id          : null,
            city_id             : null,
            imageBrowserOpen    : false,
            isLoaded            : false,
            cameraBrowserOpen   : false,
            photos              : [],
            countries           : [],
            base64              : [],
            cities              : [],
            region              : {
                latitudeDelta    : 0.0922,
                longitudeDelta   : 0.0421,
                latitude         : 31.037933,
                longitude        : 31.381523
            },
            url                 : '',
            base_64             : [],
            images              : [],
            Base64              : [],
        };

        this.setState({lang : this.props.lang});

        axios.post(`${CONST.url}countries`, { lang: this.state.lang  })
            .then( (response)=> {
                this.setState({countries: response.data.data ,country_id: response.data.data[0].id});
                axios.post(`${CONST.url}cities`, { lang:this.state.lang , country_id: this.state.countries[0].id })
                    .then( (response)=> {
                        this.setState({cities: response.data.data});
                        axios.post(`${CONST.url}codes`, { lang: this.state.lang  })
                            .then( (response)=> {
                                this.setState({codes: response.data.data,key: response.data.data[0]});
                            })
                            .catch( (error)=> {
                                this.setState({spinner: false});
                            }).then(()=>{
                            this.setState({spinner: false});
                        });
                    }).catch( (error)=> {
                        this.setState({spinner: false});
                    }).then(()=>{
                    this.setState({spinner: false});
                });
            })

    }

    async componentWillMount() {

        this.setState({images: [],photos: []});

        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {

            // Toast.show({
            //     text        : 'Permission to access location was denied',
            //     duration    : 4000,
            //     type        : 'danger',
            //     textStyle   : {
            //         color       : "white" ,
            //         textAlign   : 'center',
            //         fontFamily  : "CairoRegular"
            //     }
            // });

            CONST.showToast('Permission to access location was denied','danger')

        }else {
            return await Location.getCurrentPositionAsync({
                enableHighAccuracy: false,
                maximumAge: 15000
            }).then((position) => {
                this.setState({
                    region: {
                        latitude:  position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }
                });

            }).catch(err => {
                this.setState({
                    region: {
                        latitude:24.774265,
                        longitude: 46.738586,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }
                });
            });
        }
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

    images_video = async (i) => {

        if (i.i === 0) {

            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                aspect: [4, 3],
                base64 : true
            });
            if (!result.cancelled) {
                this.setState({
                    photos: this.state.Base64.concat(result.uri)
                });
                Base64_.push(result.base64);

                const file = {
                    uri   : result.uri,
                    name  : 'image123.png',
                    type  : 'image/png'
                };

                const body = new FormData();
                body.append('files', file);
                console.log(body.get('files'));

                for(let [name, value] of body) {
                    console.log(`${name} = ${value}`); // key1=value1, then key2=value2
                }
                console.log(body.get('files'));
                body.set('files', '444444');
                for(let [name, value] of body) {
                    console.log(`${name} = ${value}`); // key1=value1, then key2=value2
                }


            //);
                // fetch('https://dawarat.aait-sa.com/api/upload_video', {
                //     method : 'POST',
                //     body
                // }).then((res)=>{
                //     alert(1)
                // });
            }

        } else if (i.i === 1) {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                aspect: [4, 3],
                base64 : true
            });
            if (!result.cancelled) {
                this.setState({
                    photos: this.state.Base64.concat(result.uri)
                });
                Base64_.push(result.base64);
            }

        } else if (i.i === 2) {
            let result = await ImagePicker.launchImageLibraryAsync({
                aspect: [4, 3],
                mediaTypes: 'Videos',
                maxDuration : 10 ,
                maxFileSize: 10,
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
            this.setState({have_video : true})

        } else   {
            this.props.navigation.navigate('RedirectTo',{
                type : 'add'
            })
        }
    };

    validate = () => {
        let isError = false;
        let msg = '';

        if (this.state.photos.length === 0) {
            isError = true;
            msg = I18n.t('imageValidation');
        }

        if (msg !== ''){
            // Toast.show({
            //     text: msg,
            //     duration : 2000 ,
            //     type :"danger",
            //     textStyle: {
            //         color: "white",
            //         fontFamily : 'CairoRegular' ,
            //         textAlign:'center'
            //     }
            // });
            CONST.showToast(msg,'danger')
        }
        return isError;
    };

    componentWillUnmount(){
        Base64_ = [];
    }

    onLoginPressed() {
        const err = this.validate();
        if (!err){
            this.setState({ isLoaded: true });
            axios.post(`${CONST.url}uploadPhotoAd`,
                {
                    latitude        : this.state.region.latitude,
                    longitude       : this.state.region.longitude,
                    user_id         : this.state.user_id,
                    url             : this.state.url,
                    images          : Base64_[0]
                }
            ).then( (response)=> {
                    if(response.data.value === '1' ) {

                        // Toast.show({
                        //     text:response.data.msg,
                        //     duration : 2000 ,
                        //     type :"success",
                        //     textStyle: {
                        //         color: "white",
                        //         fontFamily : 'CairoRegular' ,
                        //         textAlign:'center'
                        //     }
                        // });
                        CONST.showToast(response.data.msg,'success')

                        this.props.navigation.navigate('home');

                    }else if(response.data.value === '2'){
                        // Toast.show({
                        //     text:response.data.msg,
                        //     duration : 2000  ,
                        //     type :"warning",
                        //     textStyle: {
                        //         color: "white",
                        //         fontFamily : 'CairoRegular' ,
                        //         textAlign:'center'
                        //     }
                        // });

                        CONST.showToast(response.data.msg,'warning')
                        this.props.navigation.navigate('home');
                    }else {
                        // Toast.show({
                        //     text:response.data.msg,
                        //     duration : 2000 ,
                        //     type :"danger",
                        //     textStyle: {
                        //         color: "white",
                        //         fontFamily : 'CairoRegular' ,
                        //         textAlign:'center'
                        //     }
                        // });
                        CONST.showToast(response.data.msg,'danger')

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
                <View style={{ justifyContent:'center', alignItems:'center', marginVertical: 30}}>
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

    imageBrowserCallback = (callback) => {

        callback.then((photos) => {
                this.setState({
                    imageBrowserOpen: false,
                    cameraBrowserOpen: false,
                    photos: this.state.photos.concat(photos)
                });

                const imgs         = this.state.photos;
                for (let i = 0; i < imgs.length; i++) {
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
                            }, (reason) => console.log(reason))
                        }, (reason) => console.log(reason))
                    }, (reason) => console.log(reason))
                }

            }
        ).catch((e) => console.log(e))
    };

    delete_img(i) {
        this.state.photos.splice(i, 1);
        base64           .splice(i, 1);
        Base64_          .splice(i, 1);
        this             .setState({photos: this.state.photos})
    }

    renderImage(item, i) {
        return(
            <View key={i} style={[ styles.viewImg ]}>
                <Image
                    style={[ styles.Width_100, styles.heightFull ]}
                    source={{uri: item}}
                    key={i}
                />
                <TouchableOpacity
                    onPress={()=> {this.delete_img(i)}}
                    style={[ styles.fixIcon ]}
                >
                    <Icon name="close" style={[ styles.text_White, styles.textSize_32 ]}/>
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

    onFocus(){
        this.componentWillMount()
    }

    render() {

        if (this.state.imageBrowserOpen) {
            return(<ImageBrowser base64={true} max={1} callback={this.imageBrowserCallback}/>);
        }else if (this.state.cameraBrowserOpen) {

            return(<CameraBrowser base64={true} max={1} callback={this.imageBrowserCallback}/>);
        }

        return (

            <Container>

                <NavigationEvents onWillFocus={() => this.onFocus()}/>
                {/*<Spinner visible={this.state.spinner}/>*/}

                <Header style={styles.Header_Up}>
                    <Body style={[styles.body_header, styles.textHead]}>
                        <Title style={[ styles.headerTitle ]}>{I18n.translate('add_ads')}</Title>
                    </Body>
                    <Right style={[ styles.RightDir ]}>
                        <Button transparent onPress={()=> this.props.navigation.goBack()} >
                            <Icon style={styles.icons} type="AntDesign" name={ (this.state.lang !== 'ar' || this.state.lang == null) ? 'right' : 'left' }/>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <View style={styles.upload}>
                        <View style={[ styles.position_R, styles.paddingHorizontal_20, styles.marginVertical_25 ]}>

                            <TouchableOpacity onPress={()=> this.open()}>
                                <View style={styles.blockUpload}>
                                    <Icon style={[ styles.iconUpload, styles.text_darkGreen ]} active type="AntDesign" name='pluscircleo' />
                                </View>
                            </TouchableOpacity>

                            <Text style={[ styles.text , styles.text_darkGreen ]}>
                                {I18n.translate('image_vid')}
                            </Text>

                            {this.state.photos.map((item,i) => this.renderImage(item,i))}

                        </View>
                    </View>
                    <KeyboardAvoidingView behavior="padding" style={{  flex: 1}} >
                        <Item style={styles.item_url}>
                            <Input
                                value           = { this.state.url }
                                onChangeText    = { (url)=>{ this.setState({url} )}}
                                style           = {styles.input}
                                placeholder     = {I18n.translate('ad_url')}
                            />
                        </Item>

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
export default connect(mapStateToProps,{})(AddPhotoAds);


