import React, { Component } from 'react';
import {StyleSheet, Text, Image, View, TouchableOpacity, Alert, I18nManager} from 'react-native';
import {Container, Content, Button, Icon, Header, Body, Title, Right, Toast} from 'native-base';
import I18n from "ex-react-native-i18n";
 import axios from "axios";
import {connect} from "react-redux";
 import {profile} from "../actions";
 import {NavigationEvents} from "react-navigation";
import CONST from '../consts';
import styles from '../../assets/style'
  class MyAds extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lang : this.props.lang,spinner: false,
            text: '',
            favourites : [],
            blog_photo : [],
            segment: 1,
            active : true,
        };
    }

    onFocus() {
        this.componentWillMount()
    }

    async componentWillMount() {


        axios.post(`${CONST.url}myFreeBlogs`, {
            lang:this.props.lang ,
            user_id :  this.props.auth.data.id,
        }).then( (response)=> {
            if( response.data.data)
            {
                this.setState({
                    favourites      : response.data.data,
                    blog_photo      : response.data.data_photo,
                    spinner         : false
                });
            }

        })
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
                    this.state.favourites.splice(i,1);
                    CONST.showToast(response.data.msg,  'success')

                    // Toast.show({ text: response.data.msg, duration : 2000  ,type :"success", textStyle: {  color: "white",fontFamily : 'CairoRegular' ,textAlign:'center' } });
                }else{
                    CONST.showToast(response.data.msg,  'danger')
                    // Toast.show({ text: response.data.msg, duration : 2000  ,type :"danger", textStyle: {  color: "white",fontFamily : 'CairoRegular' ,textAlign:'center' } });
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
                    this.state.blog_photo.splice(i,1);
                    CONST.showToast(response.data.msg,  'success')
                    // Toast.show({ text: response.data.msg, duration : 2000  ,type :"success", textStyle: {  color: "white",fontFamily : 'CairoRegular' ,textAlign:'center' } });
                }else{
                    CONST.showToast(response.data.msg,  'danger')
                    // Toast.show({ text: response.data.msg, duration : 2000  ,type :"danger", textStyle: {  color: "white",fontFamily : 'CairoRegular' ,textAlign:'center' } });
                }
            })
            .catch( (error)=> {
                this.setState({spinner: false});
            }).then(()=>{
            this.setState({spinner: false});
        });
    }

    noResults() {
        return (
            <View style={{ flexGrow: 1, width : '100%' }}>
                <View style={[ styles.no_data ]}>
                    <Image style={[ styles.width_150 , styles.height_150 ]} source={require('../../assets/no_data.png')} resizeMode={"contain"}/>
                </View>
            </View>
        );
    }

    myAdv(status){

        this.setState({active: status ? true : false, segment: status});

    }


    render() {
        return (
            <Container>
                 <Header style={styles.Header_Up}>
                    <Body style={[styles.body_header,styles.textHead]}>
                        <Title style={styles.headerTitle}>{I18n.translate('mine')}</Title>
                    </Body>
                    <Right style={[ styles.RightDir ]}>
                        <Button transparent onPress={()=> this.props.navigation.goBack()} >
                            <Icon style={styles.icons} type="AntDesign" name={ (this.state.lang !== 'ar' || this.state.lang == null) ? 'right' : 'left' }/>
                        </Button>
                    </Right>
                </Header>

                <NavigationEvents onWillFocus={() => this.onFocus()} />

                <Content contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={[styles.overHidden]}>
                        <View style={[styles.rowCenter , styles.Border, styles.Radius_60, styles.Width_80, styles.paddingVertical_5, styles.paddingHorizontal_5, styles.marginVertical_15]}>
                            <TouchableOpacity style={ this.state.active ? [styles.flex_50, styles.bg_ligth, styles.Radius_40, styles.paddingHorizontal_5, styles.paddingVertical_5] : [styles.flex_50, styles.paddingHorizontal_5, styles.paddingVertical_5]} onPress={() => this.myAdv(1)}>
                                <Text style={ this.state.active ? [styles.text_White, styles.textSize_16, styles.textRegular, styles.textCenter] : [styles.text_black, styles.textSize_16, styles.textRegular, styles.textCenter]}>
                                    {I18n.translate('free_Ads')}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={ this.state.active ? [styles.flex_50, styles.paddingHorizontal_5, styles.paddingVertical_5] : [styles.flex_50, styles.bg_ligth, styles.Radius_40, styles.paddingHorizontal_5, styles.paddingVertical_5]} onPress={() => this.myAdv(0)}>
                                <Text style={ this.state.active ? [styles.text_black, styles.textSize_16, styles.textRegular, styles.textCenter] : [styles.text_White, styles.textSize_16, styles.textRegular, styles.textCenter]}>
                                    {I18n.translate('photo_ads')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {
                            (this.state.segment === 1)
                                ?
                                <View style={[styles.rowGroup, styles.Width_100]}>
                                    {
                                        this.state.favourites.map((item, i) => {
                                            return (
                                                <View style={[styles.block_section_up , { flexBasis : '47%' }]} key={i}>
                                                    <View>
                                                        <View>
                                                            <Image style={styles.image_MAZAD} source={{uri: item.img}}/>
                                                            <Text style={[styles.textDate,{textAlign:'right',fontSize : 10 , fontFamily :'CairoBold'}]}>
                                                                {I18n.translate('price')} : {item.price}
                                                            </Text>
                                                            <TouchableOpacity onPress={()=>{ this.delete(item.id , i ,'photo')}} style={[ styles.width_30, styles.height_30, styles.flexCenter, styles.position_A, styles.bg_red ,{top: -5 , right: -5}]}>
                                                                <Icon style={[ styles.textSize_14, styles.text_White ]} type="Ionicons" name='close' />
                                                            </TouchableOpacity>
                                                            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Edit_ad',{id : item.id});}} style={[ styles.width_30, styles.height_30, styles.flexCenter, styles.position_A, styles.bg_green ,{top: -5 , left: -5}]}>
                                                                <Icon style={[ styles.textSize_14, styles.text_White  ]} type="AntDesign" name='edit'  />
                                                            </TouchableOpacity>
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
                                    { (this.state.favourites.length === 0 && this.state.spinner === false) ? this.noResults() : null}
                                </View>
                                :
                                <View style={[styles.rowGroup, styles.Width_100]}>
                                    {
                                        this.state.blog_photo.map((item, i) => {
                                            return (
                                                <View style={[styles.block_section_up , styles.flex_45,{height : 130 , width : 80}]} key={item.index} >
                                                    <Image style={styles.image} source={{uri: item.img}}/>
                                                    <TouchableOpacity onPress={()=>{ this.delete_photo(item.id , i ,'image')}} style={{position: 'absolute', top: 5 , right: 5}}>
                                                        <Icon style={[styles.icons,{  fontSize:18 , color : 'white' , backgroundColor:'#f00', width: 35 , height:35,textAlign:'center',borderRadius: 50,lineHeight : 35}]} type="Ionicons" name='close' />
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        })
                                    }
                                    { (this.state.blog_photo.length === 0 && this.state.spinner === false) ? this.noResults() : null}
                                </View>
                        }
                    </View>
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
export default connect(mapStateToProps,{profile})(MyAds);



