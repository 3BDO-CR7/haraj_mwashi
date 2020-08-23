import React, { Component } from 'react';
import {StyleSheet, Text, View, I18nManager, Image, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import {
    Container,
    Content,
    Form,
    Item,
    Input,
    Label,
    Icon,
    Title,
    Button,
    Left,
    Body,
    Right,
    Header,
    Toast
} from 'native-base'


import { LinearGradient } from 'expo';
import {connect} from "react-redux";
import I18n from "ex-react-native-i18n";
import {profile} from "../actions";
import {NavigationEvents} from "react-navigation";
import styles from '../../assets/style'
import Modal from "react-native-modal";
import axios from "axios";
import CONST from "../consts";

import StarRating from "react-native-star-rating";

class Profile extends Component {


    constructor(props) {
        super(props);

        this.state = {
            avatar : '',
            phone  :'',
            country  :'',
            city  :'',
            name  :'',
            email : '',
            modalEmail : false,
            textErr : '',
            emailUser : '',
            segment: 0,
            rate: 0,
            active : true,
            arrBlogs : []
        };
    }

    clickActive(status){

        this.setState({segment: status,spinner: true});

        if (status === 0){
            axios.post(`${CONST.url}myFreeBlogs`, {
                lang:this.props.lang ,
                user_id :  this.props.auth.data.id,
            }).then( (response)=> {
                this.setState({
                    arrBlogs      : response.data.allAds,
                    spinner         : false
                });
            }).catch( (error)=> {
                this.setState({spinner: false});
            });
        } else if (status === 1) {
            axios.post(`${CONST.url}favourites`, { lang:this.props.lang , user_id : this.props.auth.data.id })
                .then( (response)=> {
                    this.setState({arrBlogs: response.data.data});
                })
                .catch( (error)=> {
                    this.setState({spinner: false});
                }).then(()=>{
                this.setState({spinner: false});
            });
        }else if (status === 2){
            axios.post(`${CONST.url}last-seen`, { lang: this.props.lang , user_id : this.props.auth.data.id})
                .then( (response)=> {
                    this.setState({arrBlogs: response.data.data});
                })
                .catch( (error)=> {
                    this.setState({spinner: false});
                }).then(()=>{
                this.setState({spinner: false});
            });
        }

    }

    onFocus(){
        this.componentWillMount()
    }

    async componentWillMount() {

        this.setState({spinner: true,segment: 0});

        axios.post(`${CONST.url}myFreeBlogs`, {
            lang:this.props.lang ,
            user_id :  this.props.auth.data.id,
        }).then( (response)=> {
            this.setState({
                arrBlogs      : response.data.allAds,
                spinner         : false
            });
        }).catch( (error)=> {
            this.setState({spinner: false});
        });

        if(this.props.auth)
        {
            this.props.profile({  user_id: this.props.auth.data.id ,lang :this.props.lang });

            this.setState({
                avatar:this.props.user.avatar,
                phone:this.props.user.phone,
                city:this.props.user.city,
                country: this.props.user.country,
                name: this.props.user.name,
                email: this.props.user.email,
                emailUser: this.props.user.email,
                rate: this.props.user.rate,
            });

        }else{
            this.props.navigation.navigate('login');
        }

    }

    modalEmail(){
        this.setState({ modalEmail : true })
    }

    validate = () => {
        let isError = false;
        let msg = '';

        if (this.state.emailUser.length <= 0 || this.state.emailUser.indexOf("@") === -1 || this.state.emailUser.indexOf(".") === -1){
            isError = true;
            msg = I18n.t('emailNotCorrect');
        }

        if (msg !== ''){
            this.setState({ textErr : msg })
        }

        return isError;
    };

    sendData() {

        const err = this.validate();
        if (!err){

            this.setState({isLoaded: true,spinner: true});

            axios.post(`${CONST.url}updateEmail`, {
                email      :  this.state.emailUser,
                user_id    : this.props.user.id,
            }).then( (response)=> {

                if(response.data.value === '2' )
                {
                    CONST.showToast( response.data.msg,   (response.data.value === '1' || response.data.value === '2') ? "success" : "danger")

                    // Toast.show({
                    //     text: response.data.msg,
                    //     duration : 2000,
                    //     type : (response.data.value === '1' || response.data.value === '2') ? "success" : "danger",
                    //     textStyle: {
                    //         color: "white",
                    //         fontFamily : 'CairoRegular' ,
                    //         textAlign:'center'
                    //     }
                    // });

                    this.props.navigation.navigate('Confirmation_Page',{
                        user_id : this.props.user.id,
                        type : 'email'
                    });
                }

                this.setState({ modalEmail : false })

            }).catch( (error)=> {
                this.setState({spinner: false});
            }).then(()=> {
                this.setState({spinner: false});
            });
        }

    }

    componentWillReceiveProps(newProps) {
        if( JSON.stringify(this.props.user) !== JSON.stringify(newProps.user))      {
            if(this.props.user !== null && this.props.user !== undefined)
            {
                if(newProps.user !== null && newProps.user !== undefined && newProps.user !== this.props.user)
                {
                    this.setState({
                        avatar:newProps.user.avatar,
                        phone:newProps.user.phone,
                        city:newProps.user.city,
                        country: newProps.user.country,
                        name: newProps.user.name,
                        email: newProps.user.email
                    });
                }
            }
        }
    }

    delete(id , i,type) {
        Alert.alert(
            `${I18n.currentLocale() === 'en' ? '' : ''}`,
            `${I18n.currentLocale() === 'en' ? 'Confirm delete ?' : 'هل تريد حذف الاعلان ؟'}`,
            [
                {
                    text: `${I18n.currentLocale() === 'en' ? 'Delete' : 'حذف'}`,
                    onPress: () => {this.delete_blog(id , i,type)}
                },
                {
                    text: `${I18n.currentLocale() === 'en' ? 'Cancel' : 'إلغاء'}`,
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                }
            ],
            {cancelable: false},
        );
    }

    delete_blog(id,i) {
        this.setState({spinner: true});
        axios.post(`${CONST.url}deleteBlog`, { lang:this.props.lang ,id : id, user_id : this.props.auth.data.id })
            .then( (response)=> {
                if(response.data.value === '1') {
                    // this.state.arrBlogs.splice(i,1);
                    this.clickActive(0);
                    Toast.show({ text: response.data.msg, duration : 2000  ,type :"success", textStyle: {  color: "white",fontFamily : 'CairoRegular' ,textAlign:'center' } });
                }else{
                    Toast.show({ text: response.data.msg, duration : 2000  ,type :"danger", textStyle: {  color: "white",fontFamily : 'CairoRegular' ,textAlign:'center' } });
                }
            })
            .catch( (error)=> {
                this.setState({spinner: false});
            }).then(()=>{
            this.setState({spinner: false});
        });
    }

    delete_photo(id , i,type) {
        Alert.alert(
            `${I18n.currentLocale() === 'en' ? '' : ''}`,
            `${I18n.currentLocale() === 'en' ? 'Confirm delete ?' : 'هل تريد حذف الاعلان ؟'}`,
            [
                {
                    text: `${I18n.currentLocale() === 'en' ? 'Delete' : 'حذف'}`,
                    onPress: () => {this.delete_blog_photo(id , i,type)}
                },
                {
                    text: `${I18n.currentLocale() === 'en' ? 'Cancel' : 'إلغاء'}`,
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                }
            ],
            {cancelable: false},
        );
    }

    delete_blog_photo(id,i) {
        this.setState({spinner: true});
        axios.post(`${CONST.url}delete_photo`, {
            lang:this.props.lang ,
            id : id,
            user_id : this.props.auth.data.id
        })
            .then( (response)=> {
                if(response.data.value === '1') {
                    this.state.arrBlogs.splice(i,1);
                    this.clickActive(0);
                    Toast.show({ text: response.data.msg, duration : 2000  ,type :"success", textStyle: {  color: "white",fontFamily : 'CairoRegular' ,textAlign:'center' } });
                }else{
                    Toast.show({ text: response.data.msg, duration : 2000  ,type :"danger", textStyle: {  color: "white",fontFamily : 'CairoRegular' ,textAlign:'center' } });
                }
            })
            .catch( (error)=> {
                this.setState({spinner: false});
            }).then(()=>{
            this.setState({spinner: false});
        });
    }

    _renderItem = ({item,i}) => (
        <View style={{flexBasis:'50%', overflow : 'hidden' }}>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate({routeName: 'details', params: {blog_id: item.id,}, key: 'APage' + i})}}>
                <View style={[styles.block_section_mero ]}>
                    <View style={{ position : 'relative', overflow : 'hidden' }}>
                        {
                            (item.key) ?
                                <TouchableOpacity
                                    onPress={() => {
                                        (item.title !== null) ? this.delete(item.id, i, 'photo') : this.delete_photo(item.id, i, 'image')
                                    }}
                                    style={[styles.width_30, styles.height_30, styles.flexCenter, styles.position_A, styles.bg_red, {
                                        top: 0,
                                        right: 0
                                    }]}
                                >
                                    <Icon style={[styles.textSize_14, styles.text_White]} type="Ionicons" name='close'/>
                                </TouchableOpacity>
                                :
                                <View/>
                        }
                        {
                            (item.title !== null && item.key) ?
                                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Edit_ad',{id : item.id});}} style={[ styles.width_30, styles.height_30, styles.flexCenter, styles.position_A, styles.bg_green ,{top: 0 , left: 0}]}>
                                    <Icon style={[ styles.textSize_14, styles.text_White  ]} type="AntDesign" name='edit'  />
                                </TouchableOpacity>
                                :
                                <View/>
                        }
                        <Image style={{ width : '100%', height: (item.title !== null) ? 140 : 200 }} source={{uri:item.img}}/>
                        <Text style={[styles.textDate,{textAlign:'right',fontSize : 10 , fontFamily :'CairoBold'}]}>{item.date}</Text>
                    </View>
                    {
                        (item.title !== null) ?
                            <View style={[ styles.overHidden, styles.paddingVertical_5, styles.paddingHorizontal_5  ]}>
                                <View style={{ flexDirection:'row', width: '100%' }}>
                                    <Text style={{  fontSize : 13,color : '#757575', fontFamily : 'CairoBold', marginBottom : 5}}
                                          numberOfLines={1} ellipsizeMode='tail'>
                                        {item.title}
                                    </Text>
                                </View>
                                <View style={{ flexDirection:'row', width: '100%', alignItems : 'center', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection:'row', flexBasis : '50%', overflow : 'hidden', paddingHorizontal : 2, alignItems : 'center'}}>
                                        <Icon style={[styles.text_darkGreen, styles.textSize_9, { marginHorizontal : 3 } ]} type="FontAwesome5" name='user-alt'/>
                                        <Text style={[ styles.textRegular, styles.text_gray , styles.textSize_11 ]} numberOfLines={1} ellipsizeMode='tail'>
                                            { item.user}
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection:'row', flexBasis : '50%', overflow : 'hidden', paddingHorizontal : 2, justifyContent : 'flex-end', alignItems : 'center'}}>
                                        <Icon style={[styles.text_darkGreen ,styles.textSize_9, { marginHorizontal : 3 }]} type="Fontisto" name='map-marker-alt'/>
                                        <Text style={[ styles.textRegular, styles.text_gray , styles.textSize_11 ]} numberOfLines={1} ellipsizeMode='tail'>
                                            { item.country}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            :
                            <View/>
                    }
                </View>
            </TouchableOpacity>
        </View>
    );

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
        return (
            <Container>

                <Header style={styles.Header_Up}>
                    <Body style={[styles.body_header,styles.textHead]}>
                        <Title style={styles.headerTitle}>{I18n.translate('profile')}</Title>
                    </Body>
                    <Right style={[ styles.RightDir ]}>
                        <Button transparent onPress={()=> this.props.navigation.navigate('mune')} >
                            <Icon style={styles.icons} type="Ionicons" name='ios-arrow-back' />
                        </Button>
                    </Right>
                </Header>

                <Content>
                    <NavigationEvents onWillFocus={() => this.onFocus()} />

                    <View style={{padding : 10, overflow: 'hidden', width : '100%',}}>
                        <View style={[ styles.overHidden, styles.paddingHorizontal_10, styles.flexCenter ]}>
                            <Image
                                source={{uri:this.state.avatar}}
                                style={{width:90,height:90, borderRadius: 50,borderWidth : 1, borderColor : '#DDD',marginVertical : 5}}
                                resizeMode='cover'
                            />
                            <Text style={{fontFamily  : 'CairoRegular', fontSize : 14, color : '#333', marginBottom : 5}}>
                                {this.state.name}
                            </Text>
                            <Text style={{fontFamily  : 'CairoRegular', fontSize : 14, color : '#333', marginBottom : 5}}>
                                {this.state.phone}
                            </Text>
                            <View style={[styles.flexCenter]}>
                                <StarRating
                                    emptyStar       = {'ios-star-outline'}
                                    fullStar        = {'ios-star'}
                                    halfStar        = {'ios-star-half'}
                                    iconSet         = {'Ionicons'}
                                    maxStars        = {5}
                                    starSize        = {15}
                                    rating          = {this.state.rate}
                                    fullStarColor   = {'#DAA520'}
                                    starStyle       = {styles.starStyle}
                                    disabled        = {'disabled'}
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
                    </View>

                    <View style={[ styles.rowGroup, styles.paddingHorizontal_20 ]}>
                        <TouchableOpacity  onPress={() =>this.props.navigation.navigate('editprofile')} style={[ styles.bg_bom, styles.width_150, styles.flexCenter, styles.height_50, styles.marginVertical_10 ]}>
                            <Text style={[ styles.textBtn, styles.text_darkGreen ]}>{I18n.translate('editAcc')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.modalEmail()} style={[ styles.bg_green, styles.width_150, styles.flexCenter, styles.height_50, styles.marginVertical_10 ]}>
                            <Text style={[ styles.textBtn, styles.text_White ]}>{I18n.translate('editemail')}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.rowCenter , styles.Border, styles.Width_100, styles.paddingHorizontal_5, styles.marginVertical_10]}>
                        <TouchableOpacity style={ this.state.segment === 0 ? [styles.flex, styles.flexCenter, styles.paddingHorizontal_5, styles.paddingVertical_10 ,{ borderBottomWidth : 1, borderBottomColor : '#f8cf5d' }] : [styles.flex, styles.paddingHorizontal_5, styles.paddingVertical_10, styles.flexCenter,{ borderBottomWidth : 1, borderBottomColor : '#fff' }]} onPress={() => this.clickActive(0)}>
                            <Image resizeMode='contain' style={{ width : 25, height : 25 }} source={(this.state.segment === 0 ? require('../../assets/marketing_yellow.png') : require('../../assets/marketing_gray.png'))}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={ this.state.segment === 1 ? [styles.flex, styles.flexCenter, styles.paddingHorizontal_5, styles.paddingVertical_10 ,{ borderBottomWidth : 1, borderBottomColor : '#f8cf5d' }] : [styles.flex, styles.paddingHorizontal_5, styles.paddingVertical_10, styles.flexCenter,{ borderBottomWidth : 1, borderBottomColor : '#fff' }]} onPress={() => this.clickActive(1)}>
                            <Image resizeMode='contain' style={{ width : 25, height : 25 }} source={(this.state.segment === 1 ? require('../../assets/heart_yellow.png') : require('../../assets/heart_gray.png'))}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={ this.state.segment === 2 ? [styles.flex, styles.flexCenter, styles.paddingHorizontal_5, styles.paddingVertical_10 ,{ borderBottomWidth : 1, borderBottomColor : '#f8cf5d' }] : [styles.flex, styles.paddingHorizontal_5, styles.paddingVertical_10, styles.flexCenter,{ borderBottomWidth : 1, borderBottomColor : '#fff' }]} onPress={() => this.clickActive(2)}>
                            <Image resizeMode='contain' style={{ width : 25, height : 25 }} source={(this.state.segment === 2 ? require('../../assets/last_seen_yellow.png') : require('../../assets/last_seen.png'))}/>
                        </TouchableOpacity>
                    </View>

                    <View>
                        { (this.state.arrBlogs.length === 0 && this.state.spinner === false) ? this.noResults() : null}

                        <View style={[ styles.rowGroup ]}>
                            <FlatList
                                data={this.state.arrBlogs}
                                style={styles.flatList}
                                keyExtractor={this._keyExtractor}
                                onEndReachedThreshold={0.5}
                                renderItem={this._renderItem}
                                numColumns={2}
                            />
                        </View>
                    </View>

                    <Modal onBackdropPress={() => this.setState({ modalEmail: false })} isVisible={this.state.modalEmail}>
                        <View style={styles.model}>
                            <View style={[styles.commenter , styles.Width_100]}>

                                <Text style={[styles.TiTle, { textAlign: 'center', alignSelf : 'center', marginTop : 20 }]}>{I18n.translate('editemail')}</Text>

                                <View style={[styles.marginHorizontal_10,styles.height_50, styles.Border, styles.borderGray, styles.marginVertical_25]}>
                                    {/*<Icon style={[styles.icon_input , { top : 17 }]} active type="Entypo" name='mail' />*/}
                                    <Input
                                        style={[styles.input, { paddingRight : 10, paddingLeft : 10 } ]}
                                        onChangeText={(emailUser) => this.setState({emailUser})}
                                        value={ this.state.emailUser }
                                        placeholder={ I18n.translate('email')}
                                    />
                                </View>


                                <Text style={[ styles.textSize_14, styles.textRegular, styles.textCenter, styles.text_red ]}>
                                    {this.state.textErr}
                                </Text>

                                <Button onPress={() => this.sendData()} style={styles.bgLiner}>
                                    <Text style={[ styles.textBtn ]}>{I18n.translate('edit')}</Text>
                                </Button>
                            </View>
                        </View>
                    </Modal>

                </Content>
            </Container>
        );
    }
}

const mapStateToProps = ({ auth, lang ,profile }) => {

    return {
        auth      : auth.user,
        lang      : lang.lang,
        user      : profile.user,
        Updated   : profile.updated,
    };
};
export default connect(mapStateToProps, {profile})(Profile);
