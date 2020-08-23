import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    Dimensions,
    Linking,
    ScrollView,
    Share, FlatList,
    TouchableOpacity, BackHandler,I18nManager
} from 'react-native';
import {
    Container,
    Content,
    Button,
    Icon,
    Title,
    Header,
    Left,
    Body,
    Right,
    Input,
    Item,
    Toast
} from 'native-base';

import ImageViewer from 'react-native-image-zoom-viewer';

import {LinearGradient} from 'expo';
import Swiper from 'react-native-swiper';

import MapView from 'react-native-maps'
import {Video} from 'expo-av'
import Modal from "react-native-modal";
import axios from "axios";
// import Spinner from "react-native-loading-spinner-overlay";
import {NavigationEvents} from "react-navigation";
import I18n from "ex-react-native-i18n";
import CONST from '../consts';
import StarRating from 'react-native-star-rating';


import {connect} from "react-redux";
import {profile, userLogin} from "../actions";
import styles from '../../assets/style'


class UserDetailes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id: null,
            rate: 0.0,
            name: '',
            avatar: '',
            id: '',
            title: '',
            img: null,
            description: '',
            ads_data: [],
            columnCount: 2,
            rated_id: '',
            AllData: [],
            photo_ads: [],
            rating : 0,
            city : '',
            country : '',
            phone : '',
            segment: 0,
            active : true,

        };
    }

    componentWillMount() {

        if (this.props.auth !== null) {
            this.setState({user_id: this.props.auth.data.id})
        }

        this.setState({spinner: true});
        axios.post(`${CONST.url}user_details`, {
            user_id: JSON.stringify(this.props.navigation.getParam('user_id'))
        })
            .then((response) => {
                this.setState({AllData      : response.data.data.ads_data});
                this.setState({photo_ads    : response.data.data.photo_ads});
                this.setState({rate         : response.data.data.user.rate});
                this.setState({rated_id     : response.data.data.user.id});
                this.setState({city         : response.data.data.user.city});
                this.setState({country      : response.data.data.user.country});
                this.setState({phone        : response.data.data.user.phone});
                this.setState({name         : response.data.data.user.name});
                this.setState({avatar       : response.data.data.user.avatar});
            })
            .catch((error) => {
                console.warn(error);
                this.setState({spinner: false});
            }).then(() => {
            this.setState({spinner: false});
        })
    }

    clickActive(status){

        this.setState({segment: status});

    }

    onStarRatingPress(rating){

        this.setState({ rating : rating });

        if(this.props.auth !== null){

            this.setState({spinner: true});

            axios.post(`${CONST.url}rate`, {
                rated_id        : this.state.rated_id,
                user_id         : this.props.auth.data.id,
                lang            : this.props.lang,
                rate            : rating
            }).then((response) => {

                if(response.data.key === 'success'){
                    // Toast.show({
                    //     text            : (this.props.lang === 'en') ? 'rate successfully' : 'تم التقييم بنجاح',
                    //     duration        : 2000  ,
                    //     type            : "success",
                    //     textStyle           : {
                    //         color               : "white",
                    //         fontFamily          : 'CairoRegular' ,
                    //         textAlign           : 'center'
                    //     }
                    // });
                    CONST.showToast( (this.props.lang === 'en') ? 'rate successfully' : 'تم التقييم بنجاح',   "success")

                }

                this.setState({spinner: false});

            }).catch((error) => {
                console.warn(error);
                this.setState({spinner: false});
            })

        }else {
            this.props.navigation.navigate('login');
            // Toast.show({
            //     text        : I18n.t('signonly'),
            //     duration    : 2000,
            //     type        : "danger",
            //     textStyle   : {
            //         color       : "white",
            //         fontFamily  : 'CairoRegular',
            //         textAlign   : 'center'
            //     }
            // });
            CONST.showToast(  I18n.t('signonly'),   "danger")

        }
    }

    onFocus(){
        this.componentWillMount()
    }

    noResults() {
        return (
            <View>
                <View style={[ styles.no_data, {flexGrow : 1 } ]}>
                    <Image style={{ width  : 150, height : 150 }} source={require('../../assets/no_data.png')} resizeMode={"contain"}/>
                </View>
            </View>
        );
    }

    render() {

        const { width } = Dimensions.get('window');

        return (
            <Container>

                <NavigationEvents onWillFocus={() => this.onFocus()}/>
                {/*<Spinner visible={this.state.spinner}/>*/}

                <Header style={styles.Header_Up}>
                    <Body style={[ styles.body_header, styles.textHead ]}>
                        <Title style={[styles.headerTitle]}>{ this.state.name }</Title>
                    </Body>
                    <Right style={[ styles.RightDir ]}>
                        <Button transparent onPress={()=> this.props.navigation.goBack()} >
                            <Icon style={styles.icons} type="Ionicons" name='ios-arrow-back' />
                        </Button>
                    </Right>
                </Header>

                <Content>

                    <View style={{padding : 10, overflow: 'hidden', width : '100%',}}>
                        <View style={[ styles.overHidden, styles.paddingHorizontal_10, styles.flexCenter ]}>
                            <Image
                                source={{uri:this.state.avatar}}
                                style={{width:90,height:90, borderRadius: 50,borderWidth : 1, borderColor : '#DDD',marginVertical : 5}}
                                resizeMode='cover'
                            />
                            <Text style={{fontFamily  : 'CairoRegular', fontSize : 14, color : '#333', marginBottom : 5, textAlign : 'left'}}>
                                {this.state.name}
                            </Text>
                            <View style={[styles.flexCenter]}>
                                <StarRating
                                    emptyStar       = {'ios-star-outline'}
                                    fullStar        = {'ios-star'}
                                    halfStar        = {'ios-star-half'}
                                    iconSet         = {'Ionicons'}
                                    maxStars        = {5}
                                    starSize        = {15}
                                    rating          = {this.state.rating}
                                    selectedStar    = {(rating) => this.onStarRatingPress(rating)}
                                    fullStarColor   = {'#DAA520'}
                                    starStyle       = {styles.starStyle}
                                />
                            </View>
                            <View style={{ display : 'flex' , flexDirection : 'row', alignItems  : 'center', marginVertical : 5 }}>
                                <View style={{flexDirection:'row' , alignItems:'center',}}>
                                    <Icon style={{ color : '#bbb', fontSize : 11}} type="Feather" name='flag' />
                                    <Text style={{fontFamily  : 'CairoRegular', fontSize : 14, color : '#333', marginHorizontal: 5 }}>{this.state.country}</Text>
                                </View>
                                <View style={{flexDirection:'row' , alignItems:'center', marginHorizontal : 15}}>
                                    <Icon style={{ color : '#bbb', fontSize : 11}} type="FontAwesome5" name='map-marker-alt' />
                                    <Text style={{fontFamily  : 'CairoRegular', fontSize : 14, color : '#333', marginHorizontal: 5 }}>{this.state.city}</Text>
                                </View>
                            </View>
                            {/*<View style={{flexDirection:'row' , alignItems:'center'}}>*/}
                            {/*    <Icon style={{ color : '#bbb', fontSize : 11}} type="AntDesign" name='mobile1' />*/}
                            {/*    <Text style={{fontFamily  : 'CairoRegular', fontSize : 14, color : '#333', marginHorizontal: 5 }}>{this.state.phone}</Text>*/}
                            {/*</View>*/}
                        </View>
                        <View style={[styles.block_Content , { borderBottomWidth : 0, paddingTop : 0, marginVertical : 5 }]}>
                            <TouchableOpacity onPress={()=> { Linking.openURL(`tel://${this.state.phone}`)}}>
                                <View style={[ styles.block_Call, styles.box_call, styles.marginHorizontal_10, {marginVertical : 0}]}>
                                    <View style={styles.marginHorizontal_5}>
                                        <Icon style={[ styles.icon_blcok, { color : '#FFF' }]} type="AntDesign" name='mobile1' />
                                    </View>
                                    <Text style={styles.block_Call_text}>{I18n.translate('call')}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=> {    Linking.openURL(
                                'http://api.whatsapp.com/send?phone=' + this.state.phone);}}>
                                <View style={[ styles.block_Call, styles.box_whats, styles.marginHorizontal_10, {marginVertical : 0} ]}>
                                    <View style={styles.marginHorizontal_5}>
                                        <Icon style={[ styles.icon_blcok, { color : '#FFF' }]} type="FontAwesome" name='whatsapp' />
                                    </View>
                                    <Text style={styles.block_Call_text}>{I18n.translate('whats')}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={[styles.rowCenter , styles.Border, styles.Width_100, styles.paddingHorizontal_5, styles.marginVertical_10]}>
                        <TouchableOpacity style={ this.state.segment === 0 ? [styles.flex_50, styles.flexCenter, styles.paddingHorizontal_5, styles.paddingVertical_10 ,{ borderBottomWidth : 1, borderBottomColor : '#f8cf5d' }] : [styles.flex_50, styles.paddingHorizontal_5, styles.paddingVertical_10, styles.flexCenter,{ borderBottomWidth : 1, borderBottomColor : '#fff' }]} onPress={() => this.clickActive(0)}>
                            <Image resizeMode='contain' style={{ width : 25, height : 25 }} source={(this.state.segment === 0 ? require('../../assets/marketing_yellow.png') : require('../../assets/marketing_gray.png'))}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={ this.state.segment === 1 ? [styles.flex_50, styles.flexCenter, styles.paddingHorizontal_5, styles.paddingVertical_10 ,{ borderBottomWidth : 1, borderBottomColor : '#f8cf5d' }] : [styles.flex_50, styles.paddingHorizontal_5, styles.paddingVertical_10, styles.flexCenter,{ borderBottomWidth : 1, borderBottomColor : '#fff' }]} onPress={() => this.clickActive(1)}>
                            <Image resizeMode='contain' style={{ width : 25, height : 25 }} source={(this.state.segment === 1 ? require('../../assets/Advertising_two.png') : require('../../assets/Advertising.png'))}/>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.overHidden]}>
                        {
                            (this.state.segment === 0)
                                ?
                                <View>
                                    <View style={[styles.rowGroup, styles.Width_100]}>
                                        {
                                            this.state.AllData.map((item, i) => {
                                                return (
                                                    <View style={[styles.block_section_up , { flexBasis : '47%' }]} key={i}>
                                                        <View>
                                                            <View>
                                                                <Image style={styles.image_MAZAD} source={{uri: item.img}}/>
                                                                <Text style={[styles.textDate,{textAlign:'right',fontSize : 10 , fontFamily :'CairoBold'}]}>
                                                                    {I18n.translate('price')} : {item.price}
                                                                </Text>
                                                            </View>
                                                            <View style={[ styles.overHidden, styles.paddingVertical_5, styles.paddingHorizontal_5  ]}>
                                                                <View style={[ styles.Width_100 ]}>
                                                                    <Text style={[ styles.textSize_14, styles.textBold, styles.text_black ,{ marginBottom : 5,writingDirection : I18nManager.isRTL ? 'rtl' : 'ltr'} ]}
                                                                          numberOfLines={1} ellipsizeMode='tail'>
                                                                        {item.title}
                                                                    </Text>
                                                                </View>
                                                                <View style={[ styles.Width_100, styles.rowFlex ]}>
                                                                    <Icon style={[styles.text_darkGreen, styles.textSize_9, { marginHorizontal : 3 } ]} type="FontAwesome5" name='user-alt'/>
                                                                    <Text style={[ styles.textRegular, styles.text_gray , styles.textSize_11 ]} numberOfLines={1} ellipsizeMode='tail'>
                                                                        { item.user}
                                                                    </Text>
                                                                </View>
                                                                <View style={[ styles.Width_100, styles.rowGroups ]}>
                                                                    <View style={[ styles.flex_50, styles.rowFlex ]}>
                                                                        <Icon style={[styles.text_darkGreen ,styles.textSize_9, { marginHorizontal : 3 }]} type="Fontisto" name='map-marker-alt'/>
                                                                        <Text style={[ styles.textRegular, styles.text_gray , styles.textSize_11 ]} numberOfLines={1} ellipsizeMode='tail'>
                                                                            { item.country}
                                                                        </Text>
                                                                    </View>
                                                                    <View style={[ styles.flex_50, styles.rowFlex, {justifyContent : 'flex-end'} ]}>
                                                                        <Text style={[ styles.textRegular, styles.text_gray , styles.textSize_11 ]} numberOfLines={1} ellipsizeMode='tail'>
                                                                            { item.date}
                                                                        </Text>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                    { (this.state.AllData.length === 0 && this.state.spinner === false) ? this.noResults() : null}
                                </View>
                                :
                                <View>
                                    <View style={[styles.rowGroup, styles.Width_100]}>
                                        {
                                            this.state.photo_ads.map((item, i) => {
                                                return (
                                                    <View style={[styles.block_section_up , styles.flex_45,{height : 130 , width : 80}]} key={item.index} >
                                                        <Image style={styles.image} source={{uri: item.img}}/>
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                    { (this.state.photo_ads.length === 0 && this.state.spinner === false) ? this.noResults() : null}
                                </View>

                        }
                    </View>

                    {/*<View style={[ styles.rowGroup ]}>*/}
                    {/*    <FlatList*/}
                    {/*        horizontal={false}*/}
                    {/*        keyExtractor={item => item.id}*/}
                    {/*        data={this.state.AllData}*/}
                    {/*        numColumns={this.state.columnCount}*/}
                    {/*        key={this.state.columnCount}*/}
                    {/*        renderItem={({item}) => {*/}
                    {/*            return (*/}
                    {/*                <View style={[{*/}
                    {/*                    borderWidth: 1,*/}
                    {/*                    margin: 5,*/}
                    {/*                    borderRadius: 4,*/}
                    {/*                    borderColor: '#ccc',*/}
                    {/*                    flexBasis  : '47.5%'*/}
                    {/*                }, ]}>*/}
                    {/*                    <View style={[ styles.position_R ]}>*/}
                    {/*                        <Image resizeMode={'cover'} style={[{height: 100, width: '100%'}]} source={{uri: item.img}}/>*/}
                    {/*                        <Text style={[styles.textDate,{textAlign:'right',fontSize : 10 , fontFamily :'CairoBold'}]}>*/}
                    {/*                            {I18n.translate('price')} : {item.price}*/}
                    {/*                        </Text>*/}
                    {/*                    </View>*/}
                    {/*                    <View style={{ padding : 5 }}>*/}
                    {/*                        <Text style={[styles.info, {width: 100, color: CONST.color, fontSize: 13, fontFamily: 'CairoRegular', marginBottom: 10}]} numberOfLines={1} ellipsizeMode='tail'>*/}
                    {/*                            {item.title}*/}
                    {/*                        </Text>*/}
                    {/*                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems : 'center'}}>*/}
                    {/*                            <View style={{flexDirection: 'row', alignItems : 'center'}}>*/}
                    {/*                                <Icon style={{fontSize : 12, marginHorizontal : 1}} active type="Feather" name='map-pin'/>*/}
                    {/*                                <Text style={{fontSize: 10, fontFamily: 'CairoRegular',}} numberOfLines={1} ellipsizeMode='tail'>{item.country}</Text>*/}
                    {/*                            </View>*/}
                    {/*                            <View style={{flexDirection: 'row', alignItems : 'center'}}>*/}
                    {/*                                <Icon style={{fontSize : 12, marginHorizontal : 1}} active type="Feather" name='clock'/>*/}
                    {/*                                <Text style={{fontSize: 10, fontFamily: 'CairoRegular'}} numberOfLines={1} ellipsizeMode='tail'>{item.date}</Text>*/}
                    {/*                            </View>*/}
                    {/*                        </View>*/}
                    {/*                    </View>*/}
                    {/*                </View>*/}
                    {/*            );*/}
                    {/*        }}*/}
                    {/*    >*/}

                    {/*    </FlatList>*/}
                    {/*</View>*/}


                </Content>
            </Container>


        );
    }


}

const mapStateToProps = ({auth, lang}) => {

    return {
        auth: auth.user,
        lang: lang.lang,
        result: auth.success,
        userId: auth.user_id,
    };
};
export default connect(mapStateToProps, {userLogin, profile})(UserDetailes);
