import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    I18nManager,
    TouchableOpacity,
    Switch,
    Linking,
    AsyncStorage,
    Image
} from 'react-native';
import {Container, Right, Body, Content, Left, Button, Icon, Picker, Title, Item, Header, Toast} from 'native-base';
import I18n   from 'ex-react-native-i18n';
// import Spinner from "react-native-loading-spinner-overlay";
import axios   from 'axios';
import { connect } from 'react-redux';

// const  base_url = 'http://plus.4hoste.com/api/';
import { userLogin, profile ,logout ,tempAuth} from '../actions'
import CONST from '../consts';
import styles from '../../assets/style'
import * as Animatable from "react-native-animatable";

class MuneApp extends Component {


    constructor(props) {
        super(props);
        this.state    = {
            selected : 1,
            cities   : [],
            spinner  : false,
            country  :  null,
            youtube  : '',
            twitter  : '',
            facebook : '',
            lang     : this.props.lang,
            isLogin  : false,
            instgram : '',
            SwitchOnValueHolder: false
        };


    }

    componentWillMount() {


        AsyncStorage.getItem('plusCountryId')

            .then((value) => {
                if (value !== null && value !== undefined)
                {
                    this.setState({country_id :  value});
                }
            });

        if(this.props.user) {
            this.props.profile({  user_id: this.props.user.id ,lang :this.props.lang });
            if(this.props.auth.mute ==  1)
            {
                this.setState({SwitchOnValueHolder :true})
            }
        }

        if(this.props.user)
        {
            this.setState({country: this.props.user.country_id,country_id: this.props.user.country_id});

            if(this.props.user.mute == 1)
            {
                this.setState({SwitchOnValueHolder : true})
            }else{
                this.setState({SwitchOnValueHolder : false})
            }

        }


        this.setState({spinner: true});
        axios.post(`${CONST.url}countries`, { lang: this.props.lang, country_id : this.state.country })
            .then( (response)=> {
                this.setState({cities: response.data.data});

                axios.post(`${CONST.url}followUs`, { lang: this.props.lang , country_id :  this.state.country })
                    .then( (response)=> {

                        this.setState({facebook: response.data.data.facebook,twitter: response.data.data.twitter,instgram: response.data.data.instgram,youtube: response.data.data.youtube});

                    })
                    .catch( (error)=> {
                        this.setState({spinner: false});
                    }).then(()=>{
                    this.setState({spinner: false});
                });
            })
            .catch( (error)=> {
                this.setState({spinner: false});
            }).then(()=>{
            this.setState({spinner: false});
        });

    }

    ShowAlert = (value) =>{

        axios.post(`${CONST.url}muteNotification`, { lang: this.props.lang , user_id :  this.props.user.id })
            .then( (response)=> {
                CONST.showToast(response.data.msg,  'success')
                // Toast.show({ text: response.data.msg, duration : 2000 ,type:'success',textStyle: { color: "white",fontFamily            : 'CairoRegular' ,textAlign:'center' }});

                if(this.state.SwitchOnValueHolder === true)
                {
                    this.setState({SwitchOnValueHolder : false})
                }else{
                    this.setState({SwitchOnValueHolder : true})
                }

                //this.props.profile({  user_id: this.props.user.id ,lang :  this.props.lang });

            })
            .catch( (error)=> {
                this.setState({spinner: false});
            }).then(()=>{
            this.setState({spinner: false});
        });


    };

    render() {
        return (
            <Container>

                {/*<Spinner visible={this.state.spinner}/>*/}

                <Header style={styles.Header_Up}>
                    <Body style={[styles.body_header, styles.textHead]}>
                        <Title style={styles.headerTitle}>{I18n.translate('settings')}</Title>
                    </Body>
                    <Right style={[ styles.RightDir ]}>
                        <Button transparent onPress={()=> this.props.navigation.navigate('home')} >
                            <Icon style={styles.icons} type="AntDesign" name={ (this.state.lang !== 'ar' || this.state.lang == null) ? 'right' : 'left' }/>
                        </Button>
                    </Right>
                </Header>


                <Content>

                    <View style={styles.user_info}>
                        <Button style={styles.btn_click_move}>
                            <Text style={styles.btn_text_move} onPress={() => {(this.props.auth) ? this.props.navigation.navigate('profile') : this.props.navigation.navigate('login')}}>
                                { (this.props.auth) ? I18n.translate('profile') : I18n.translate('signIn') }
                            </Text>
                        </Button>
                    </View>

                    {
                        ( this.props.auth ) ?
                            <View style={styles.block_section_move_mune}>
                                <View style={styles.MainContainer}>
                                    <Text style={styles.text_switch}> { I18n.translate('notifications') }</Text>
                                    <Switch
                                        onValueChange={(value) => this.ShowAlert(value)}
                                        style={styles.switch}
                                        value={this.state.SwitchOnValueHolder}
                                        trackColor={{ true: '#ced09b', false: '#ddd'  }}
                                        thumbColor={['#fff']}
                                    />
                                </View>
                            </View>
                            :
                            <View/>
                    }
                    <View style={[ styles.block_section_move_mune ]}>
                        <View style={styles.blocking_move}>

                            <TouchableOpacity  onPress={() => {(this.props.auth) ? this.props.navigation.navigate('favorite') : this.props.navigation.navigate('login')}}>
                                <View style={styles.block_item_move}>
                                    <View style={[styles.icon_style_move , styles.bink]}>
                                        {/*<Icon style={[styles.icon_move , styles.conter, styles.text_black]} type="Feather" name='heart' />*/}
                                        <Image resizeMode='contain' style={{ width : 20, height : 20 }} source={require('../../assets/heart.png')}/>
                                    </View>
                                    <Text style={styles.text_enemy}>{I18n.translate('fav')}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {(this.props.auth) ? this.props.navigation.navigate('watchLater') : this.props.navigation.navigate('login')}}>
                                <View style={styles.block_item_move}>
                                    <View  style={[styles.icon_style_move , { backgroundColor : '#DFFAF4' }]}>
                                        {/*<Icon style={[styles.icon_move , styles.conter, styles.text_black]} type="Feather" name='clock' />*/}
                                        <Image resizeMode='contain' style={{ width : 20, height : 20 }} source={require('../../assets/clock_black.png')}/>
                                    </View>
                                    <Text style={styles.text_enemy}>{I18n.translate('last-seen')}</Text>
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity onPress={() => {(this.props.auth) ? this.props.navigation.navigate('adde3lan') : this.props.navigation.navigate('login')}} >
                                <View style={styles.block_item_move}>
                                    <View style={[styles.icon_style_move  , { backgroundColor : '#AFD0FD' }]}>
                                        {/*<Icon style={[styles.icon_move , styles.conter, styles.text_black]} type="FontAwesome" name='user-secret' />*/}
                                        <Image resizeMode='contain' style={{ width : 20, height : 20 }} source={require('../../assets/ads_black.png')}/>
                                    </View>
                                    <Text style={styles.text_enemy}>{I18n.translate('add_ads')}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={[styles.block_section_move_mune, { padding : 0 }]}>

                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('home')}
                            style={[ styles.rowGroups, styles.paddingHorizontal_5, styles.paddingVertical_10, { borderBottomWidth : 1, borderBottomColor : '#DDD' } ]}
                        >
                            <View style={styles.block_up_move}>
                                <Text style={[ styles.text_black, styles.textSize_14, styles.textRegular ]}>{I18n.translate('home')}</Text>
                                {/*<Icon style={[ styles.text_black, styles.textSize_20, styles.marginHorizontal_5, { position : 'relative', top : 3 } ]} type="Octicons" name='home' />*/}
                                <Image resizeMode='contain' style={{ width : 20, height : 20, marginHorizontal : 5,position : 'relative', top : 1}} source={require('../../assets/home.png')}/>
                            </View>
                            <Icon style={[ styles.text_black, styles.textSize_20 ]} type="AntDesign" name={ (this.state.lang !== 'ar' || this.state.lang == null) ? 'right' : 'left' } />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('about')}
                            style={[ styles.rowGroups, styles.paddingHorizontal_5, styles.paddingVertical_10, { borderBottomWidth : 1, borderBottomColor : '#DDD' } ]}
                        >
                            <View style={styles.block_up_move}>
                                <Text style={[ styles.text_black, styles.textSize_14, styles.textRegular ]}>{I18n.translate('aboutApp')}</Text>
                                {/*<Icon style={[ styles.text_black, styles.textSize_20, styles.marginHorizontal_5, { position : 'relative', top : 5 } ]} type="Feather" name='info' />*/}
                                <Image resizeMode='contain' style={{ width : 20, height : 20, marginHorizontal : 5,position : 'relative', top : 3}} source={require('../../assets/info.png')}/>
                            </View>
                            <Icon style={[ styles.text_black, styles.textSize_20 ]} type="AntDesign" name={ (this.state.lang !== 'ar' || this.state.lang == null) ? 'right' : 'left' } />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('terms')}
                            style={[ styles.rowGroups, styles.paddingHorizontal_5, styles.paddingVertical_10, { borderBottomWidth : 1, borderBottomColor : '#DDD' } ]}
                        >
                            <View style={styles.block_up_move}>
                                <Text style={[ styles.text_black, styles.textSize_14, styles.textRegular ]}>{I18n.translate('terms')}</Text>
                                {/*<Icon style={[ styles.text_black, styles.textSize_20, styles.marginHorizontal_5, { position : 'relative', top : 3 } ]} type="FontAwesome" name='list-alt' />*/}
                                <Image resizeMode='contain' style={{ width : 20, height : 20, marginHorizontal : 5,position : 'relative', top : 3}} source={require('../../assets/list.png')}/>
                            </View>
                            <Icon style={[ styles.text_black, styles.textSize_20 ]} type="AntDesign" name={ (this.state.lang !== 'ar' || this.state.lang == null) ? 'right' : 'left' } />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('contact')}
                            style={[ styles.rowGroups, styles.paddingHorizontal_5, styles.paddingVertical_10, { borderBottomWidth : 1, borderBottomColor : '#DDD' } ]}
                        >
                            <View style={styles.block_up_move}>
                                <Text style={[ styles.text_black, styles.textSize_14, styles.textRegular ]}>{I18n.translate('help')}</Text>
                                {/*<Icon style={[ styles.text_black, styles.textSize_20, styles.marginHorizontal_5, { position : 'relative', top : 5 } ]} type="Feather" name='info' />*/}
                                <Image resizeMode='contain' style={{ width : 20, height : 20, marginHorizontal : 5,position : 'relative', top : 3}} source={require('../../assets/question.png')}/>
                            </View>
                            <Icon style={[ styles.text_black, styles.textSize_20 ]} type="AntDesign" name={ (this.state.lang !== 'ar' || this.state.lang == null) ? 'right' : 'left' } />
                        </TouchableOpacity>

                        {

                            (this.props.auth) ?

                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('ChooseBank')}
                                    style={[ styles.rowGroups, styles.paddingHorizontal_5, styles.paddingVertical_10, { borderBottomWidth : 1, borderBottomColor : '#DDD' } ]}
                                >
                                    <View style={styles.block_up_move}>
                                        <Text style={[ styles.text_black, styles.textSize_14, styles.textRegular ]}>{I18n.translate('commission')}</Text>
                                        {/*<Icon style={[ styles.text_black, styles.textSize_20, styles.marginHorizontal_5, { position : 'relative', top : 4 } ]} type="MaterialIcons" name='monetization-on' />*/}
                                        <Image resizeMode='contain' style={{ width : 20, height : 20, marginHorizontal : 5,position : 'relative', top : 3}} source={require('../../assets/accounting.png')}/>
                                    </View>
                                    <Icon style={[ styles.text_black, styles.textSize_20 ]} type="AntDesign" name={ (this.state.lang !== 'ar' || this.state.lang == null) ? 'right' : 'left' } />
                                </TouchableOpacity>

                                :
                                <View/>
                        }

                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('AboutCommission')}
                            style={[ styles.rowGroups, styles.paddingHorizontal_5, styles.paddingVertical_10, { borderBottomWidth : 1, borderBottomColor : '#DDD' } ]}
                        >
                            <View style={styles.block_up_move}>
                                <Text style={[ styles.text_black, styles.textSize_14, styles.textRegular ]}>{I18n.translate('AboutCommission')}</Text>
                                {/*<Icon style={[ styles.text_black, styles.textSize_20, styles.marginHorizontal_5, { position : 'relative', top : 4 } ]} type="Feather" name='dollar-sign' />*/}
                                <Image resizeMode='contain' style={{ width : 20, height : 20, marginHorizontal : 5,position : 'relative', top : 3}} source={require('../../assets/coin.png')}/>
                            </View>
                            <Icon style={[ styles.text_black, styles.textSize_20 ]} type="AntDesign" name={ (this.state.lang !== 'ar' || this.state.lang == null) ? 'right' : 'left' } />
                        </TouchableOpacity>

                        {/*<TouchableOpacity*/}
                        {/*    onPress={() => this.props.navigation.navigate('contact')}*/}
                        {/*    style={[ styles.rowGroups, styles.paddingHorizontal_5, styles.paddingVertical_10, { borderBottomWidth : 1, borderBottomColor : '#DDD' } ]}*/}
                        {/*>*/}
                        {/*    <View style={styles.block_up_move}>*/}
                        {/*        <Text style={[ styles.text_black, styles.textSize_14, styles.textRegular ]}>{I18n.translate('help')}</Text>*/}
                        {/*        /!*<Icon style={[ styles.text_black, styles.textSize_20, styles.marginHorizontal_5, { position : 'relative', top : 4 } ]} type="Feather" name='help-circle' />*!/*/}
                        {/*        <Image resizeMode='contain' style={{ width : 20, height : 20, marginHorizontal : 5,position : 'relative', top : 3}} source={require('../../assets/question.png')}/>*/}
                        {/*    </View>*/}
                        {/*    <Icon style={[ styles.text_black, styles.textSize_20 ]} type="Feather" name='chevron-left' />*/}
                        {/*</TouchableOpacity>*/}

                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('language')}
                            style={[ styles.rowGroups, styles.paddingHorizontal_5, styles.paddingVertical_10, { borderBottomWidth : 1, borderBottomColor : '#DDD' } ]}
                        >
                            <View style={styles.block_up_move}>
                                <Text style={[ styles.text_black, styles.textSize_14, styles.textRegular ]}>{I18n.translate('language')}</Text>
                                {/*<Icon style={[ styles.text_black, styles.textSize_20, styles.marginHorizontal_5, { position : 'relative', top : 3 } ]} type="MaterialIcons" name='language' />*/}
                                <Image resizeMode='contain' style={{ width : 20, height : 20, marginHorizontal : 5,position : 'relative', top : 3}} source={require('../../assets/global.png')}/>
                            </View>
                            <Icon style={[ styles.text_black, styles.textSize_20 ]} type="AntDesign" name={ (this.state.lang !== 'ar' || this.state.lang == null) ? 'right' : 'left' } />
                        </TouchableOpacity>

                        {
                            (this.props.auth) ?
                                <TouchableOpacity
                                    onPress={() => {this.props.logout({ token: this.props.auth.id });this.props.tempAuth();}}
                                    style={[ styles.rowGroups, styles.paddingHorizontal_5, styles.paddingVertical_10 ]}
                                >
                                    <View style={styles.block_up_move}>
                                        <Text style={[ styles.text_red, styles.textSize_14, styles.textRegular ]}>{I18n.translate('logOut')}</Text>
                                        <Icon style={[ styles.text_red, styles.textSize_20, styles.marginHorizontal_5, { position : 'relative', top : 4 } ]} type="Feather" name='log-out' />
                                    </View>
                                    <Icon style={[ styles.text_black, styles.textSize_20 ]} type="AntDesign" name={ (this.state.lang !== 'ar' || this.state.lang == null) ? 'right' : 'left' } />
                                </TouchableOpacity>
                                :
                                <View/>
                        }


                    </View>

                    <View style={styles.block_section_move_mune}>
                        <Text style={styles.text_up_move}>{I18n.translate('follow_us')}</Text>
                        <View style={[ styles.rowGroups ]}>

                            <View style={styles.block_item_move}>
                                <TouchableOpacity  onPress={() => { Linking.openURL(this.state.facebook ) } } >
                                    <View  style={[styles.icon_style_move , styles.social , {backgroundColor : '#064eff' }]}>
                                        <Icon style={[styles.icon_move , styles.conter, { color :'#fff'}]} type="Feather" name='facebook' />
                                    </View>
                                </TouchableOpacity>
                                <Text style={styles.text_enemy}>{I18n.translate('facebook')}</Text>
                            </View>

                            <View style={styles.block_item_move}>
                                <TouchableOpacity  onPress={() => { Linking.openURL(`${this.state.youtube}`) } } >
                                    <View      style={[styles.icon_style , styles.social , {backgroundColor : '#F00' }]}>
                                        <Icon style={[styles.icon , styles.conter , { color :'#fff'}]} type="Feather" name='youtube' />
                                    </View>
                                </TouchableOpacity>
                                <Text style={styles.text_enemy}>{I18n.translate('youtube')}</Text>
                            </View>



                            <View style={styles.block_item_move}>
                                <TouchableOpacity  onPress={() => { Linking.openURL(this.state.instgram ) } }>
                                    <View   style={[styles.icon_style , styles.social,{backgroundColor : '#E4415F'}]}>
                                        <Icon style={[styles.icon , styles.conter ,{color :'#fff'}]} type="Feather" name='instagram' />
                                    </View>
                                </TouchableOpacity>
                                <Text style={styles.text_enemy}>{I18n.translate('instgram')}</Text>
                            </View>


                            <View style={styles.block_item_move}>
                                <TouchableOpacity  onPress={() => { Linking.openURL(this.state.twitter ) } } >
                                    <View  style={[styles.icon_style , styles.social,{backgroundColor:'#55ACEE'}]}>
                                        <Icon style={[styles.icon , styles.conter, {color : '#fff'}]} type="Feather" name='twitter' />
                                    </View>
                                </TouchableOpacity>
                                <Text style={styles.text_enemy}>{I18n.translate('twitter')}</Text>
                            </View>
                        </View>
                    </View>

                </Content>
            </Container>
        );
    }

    componentWillReceiveProps(newProps){
        if(newProps.logout == 1)
        {
            console.log('my new props' , newProps)
            this.props.navigation.navigate('home');
        }
    }
}


const mapStateToProps = ({ auth, lang ,profile }) => {

    return {

        auth   : auth.user,
        lang   : lang.lang,
        user   : profile.user
    };
};
export default connect(mapStateToProps, { userLogin ,profile,logout,tempAuth})(MuneApp);
