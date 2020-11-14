import React from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    FlatList,
    Animated,
    Dimensions,
    TouchableOpacity,
    BackHandler,
    Vibration,
    Platform, AsyncStorage
} from 'react-native';
import {
    Container,
    Icon,
    ScrollList,
    Content,
    Item,
    Input,
    Picker,
    Toast,
    Left,
    Button,
    Body,
    Title,
    Right,
    Header,
    Footer
} from 'native-base';
import axios   from 'axios';
import Tabs from './Tabs';
import I18n   from 'ex-react-native-i18n';
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import {connect} from "react-redux";
import {profile} from "../actions";
import {Notifications} from "expo";
import {NavigationEvents} from "react-navigation";
import CONST from '../consts';
import {Image} from "react-native-expo-image-cache";
const preview = {uri : "https://cdn.iconscout.com/icon/premium/png-256-thumb/loading-387-713102.png"} ;
const isIOS = Platform.OS === 'ios';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
const width = Dimensions.get('window').width;
import * as Animatable from "react-native-animatable";
import styles from '../../assets/style'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state  = {
            city          : null,
            toggle        : 0,
            page          : 1,
            render        : 1,
            spinner       : true,
            loader       : false,
            isSearch      : false,
            lang            : this.props.lang,
            pagination    : '',
            view_grid     : 'list',
            view_grids    : 'grid',
            iconType      : 'Feather',
            categories    : [],
            cities        : [],
            blogs         : [],
            latitude      : null,
            longitude     : null,
            selected      : null,
            category_id   : null,
            filter_category_id       : null,
            filter_sub_category_id   : null,
            filter_section_id        : null,
            filter_sub_section_id    : null,
            is_nearest    : 0,
            country_id    : null,
            countries     : [],
            sub_categories: [],
            sections      : [],
            models        : [],
            is_result     : null,
            active_modal_filter      : false,
        };
    }


    onFocus() {
        if(this.props.navigation.state.params && this.props.navigation.state.params.new_ad == 1){
            this.setState({
                city_id      : null ,
                loader       : false ,
                page         : 1 ,
                latitude     : null ,
                longitude    : null ,
                country_id   : null ,
                blogs        : []
            },()=> {
                this.getBlogsData();
            });
        }
    }
    handleNotification = (notification) => {
        if (notification && notification.origin !== 'received') {
            if(notification){
                this.props.navigation.navigate('notifications');
            }
        }
        if (notification.remote) {
            Vibration.vibrate();
            const notificationId                = Notifications.presentLocalNotificationAsync({
                title: notification.data.title  ? notification.data.title : I18n.translate('newNotification'),
                body: notification.data.body    ? notification.data.body : I18n.translate('_newNotification'),
                ios: { _displayInForeground: true }
            });
        }
    };

    async componentDidMount() {
        setTimeout(()=> {
            this.allowNotification();
        },8000)
    }
    async  allowNotification(){
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );

        let finalStatus      = existingStatus;

        if (existingStatus  !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus      = status;
        }

        if (finalStatus     !== 'granted') {
            return;
        }

        let token            = await Notifications.getExpoPushTokenAsync();
        this.setState({ device_id : token });
        AsyncStorage.setItem('deviceID', token);

        if (finalStatus === 'granted') {
            Notifications.addListener(this.handleNotification);
        }
    }


    componentWillUnmount() {
         this.setState({page : 1});
         BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        if (this.props.navigation.isFocused()) {
            BackHandler.exitApp();
            return true;
        }
    }



    async componentWillMount() {
        this.runPlaceHolder();
        this.setState({
            city_id      : null ,
            loader       : false ,
            page         : 1 ,
            latitude     : null ,
            longitude    : null ,
            country_id   : null ,
            blogs        : []
        },()=>{
            this.more();
            this.setState({lang: this.props.lang});
            axios.post(`${CONST.url}categories`, { lang: this.props.lang })
                .then( (response)=> {
                    this.setState({categories: response.data.data});
                    axios.post(`${CONST.url}countries`, { lang: this.props.lang  })
                        .then( (response)=> {
                            this.setState({countries: response.data.data});
                        });
                });
        });
         BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    onValueChange2(value) {
        if (value) {
            this.setState({
                city_id       : value,
                city          : value,
                loader        : false ,
                page          : 1 ,
                blogs         : []
            });
            setTimeout(() => {
                this.getBlogsData();
            }, 1000);
        }
    }

    _renderItem = ({item ,key}) => (
        (this.state.toggle === 0)  ?
            <View style={[ styles.overHidden ]}>
                <Animatable.View animation="zoomInUp" easing="ease-out" delay={400}>
                    <TouchableOpacity
                        onPress={() => {this.props.navigation.navigate('details',{ blog_id : item.id})} }
                        key={ key }
                        style={[ styles.rowGroup, styles.paddingHorizontal_5, styles.Border_Btn_Opc_Gray, styles.paddingVertical_5 ]}
                    >
                        <View style={[ styles.flex_30, styles.height_80 ]}>
                            <Image style={[styles.Radius_5,  styles.Width_100, styles.heightFull, styles.Border, styles.borderOpcityGray]}  {...{preview, uri : item.img}}  resizeMode={'stretch'} />
                        </View>
                        <View style={[ styles.paddingHorizontal_10, styles.flex_70 ]}>
                            <View  onPress={() => {this.props.navigation.navigate('details',{ blog_id : item.id})} }>
                                <Text style={[styles.info, styles.textBold , { color : '#676767'}]}>{item.title}</Text>
                                <View style={styles.icon_text}>
                                    <Text style={[styles.info, styles.textBold, styles.textSize_14, styles.text_red]}>{item.price}</Text>
                                </View>
                                <View style={[ styles.rowGroup ]} >
                                    <View style={styles.icon_text}>
                                        <Icon style={[styles.textSize_11, styles.text_gray]} active type="Feather" name='map-pin'/>
                                        <Text style={[styles.textSize_13, styles.textRegular, styles.text_gray, styles.marginHorizontal_5 ]}>{item.country}</Text>
                                    </View>
                                    <View style={[styles.icon_text, {alignSelf: 'flex-end'}]} >
                                        <Icon style={[styles.textSize_11, styles.text_gray ]} active type="Feather" name='clock'/>
                                        <Text style={[styles.textSize_13, styles.textRegular, styles.text_gray, styles.marginHorizontal_5 ]}>{item.date}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Animatable.View>
            </View>
            :
            <View style={{flexBasis:'50%', overflow : 'hidden' }}>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate({routeName: 'details', params: {blog_id: item.id,}, key: 'APage' + i})}}>
                    <View style={[styles.block_section_mero ]}>
                        <View style={{ position : 'relative', overflow : 'hidden' }}>
                            <Image style={styles.image_MAZAD} {...{preview, uri : item.img}} resizeMode={'stretch'}/>
                            <Text style={[styles.textDate,{textAlign:'right',fontSize : 10 , fontFamily :'CairoBold'}]}>
                                {I18n.translate('price')} : {item.price}
                            </Text>
                        </View>
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
                    </View>
                </TouchableOpacity>
            </View>
    );

    more(){
         if(this.state.loader == false){
             this.getBlogsData()
         }
    }

    getBlogsData() {
        this.setState({
            loader               :    true,
            page                 :    this.state.page
        },()=>{
            axios.post(`${CONST.url}get-blogs`, {
                lang             :  this.props.lang,
                city_id          :  this.state.city,
                latitude         :  this.state.latitude ,
                longitude        :  this.state.longitude ,
                country_id       :  this.state.country_id ,
                category_id      :  null,
                model            :  null,
                page             :  this.state.page
            }).then( (response)=> {
                this.setState({
                    loader       :   response.data.data.length === 0 ? true :false,
                    blogs        :   this.state.page === 1 || this.state.page === 0 ? response.data.data : this.state.blogs.concat(response.data.data),
                    spinner      :   false,
                    page         :   this.state.page + 1
                });
            }).catch(err => {
                this.setState({
                    spinner      :  false,
                    loader       :  response.data.data.length === 0 ? true :false,
                });
            })
        });
    }

    _getLocationAsync = async () => {
            let { status } = await Permissions.askAsync(Permissions.LOCATION);
            if (status !== 'granted') {
                CONST.showToast('Permission to access location was denied',  "danger")

                // Toast.show({ text: 'Permission to access location was denied', duration : 4000, type:'danger',textStyle: { color: "white" ,textAlign:'center' }});
            }else {
                    return await Location.getCurrentPositionAsync({
                        enableHighAccuracy: false,
                        maximumAge: 15000
                    }).then((position) => {
                      if(this.state.latitude === null){
                          this.setState({
                              longitude  : position.coords.longitude,
                              latitude   : position.coords.latitude,
                              is_nearest : 1,
                              page       : 1,
                              loader     : false,
                              spinner    : false
                          },()=>{
                              this.getBlogsData();
                          });
                      }else{
                              this.setState({
                                  city_id          :  null,
                                  latitude         :  null ,
                                  longitude        :  null ,
                                  country_id       :  null ,
                                  category_id      :  null,
                                  model            :  null,
                                  loader           : false,
                                  page             :  1
                              },()=>{
                                  this.getBlogsData();
                              });
                      }
                    });
            }
    };

    handleKeyUp(keyword) {
        this.setState({blogs             : []});
        setTimeout(()=>{
            axios.post(`${CONST.url}get-blogs`, {
                lang                     :  this.props.lang,
                keyword                  :  keyword,
            }).then( (response)=> {
                        this.setState({
                            blogs        :response.data.data,
                            page         : 0,
                        })
                }).catch( (error)=> {
                    this.setState({spinner: false});
                }).then(()=> {
                this.setState({spinner: false});
            });
        },500)
    }

    getCategories(id,name){
        if(id)
        {
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
            this.props.navigation.navigate('Categories',{
                category_id     : id,
                city_id         : this.state.city,
                latitude        : this.state.latitude,
                longitude       : this.state.longitude,
                name            : name,
            });
        }else{

            this.setState({
                city_id          :  null,
                latitude         :  null ,
                longitude        :  null ,
                country_id       :  null ,
                category_id      :  null,
                model            :  null,
                page             :  1,
                blogs            : [],
                loader           : false
            },()=>{
                this.getBlogsData();
            });

        }

    }

    onSearch(){
        this.setState({isSearch: !this.state.isSearch});
    }

    onValueChange5(value) {
        if(value){
            this.setState({
                country_id : value,
                city_id    : null ,
                city       : null ,
                blogs      : [] ,
                page       : 1,
                loader     : false
            },()=>{
                this.getBlogsData();
                axios.post(`${CONST.url}cities`, { lang: this.props.lang , country_id : value })
                    .then( (response)=> {
                        if(response.data.data.length > 0){
                            this.setState({cities: response.data.data});
                        }
                    })
            });
        }
    }

    changeViewGrid() {
        if(this.state.view_grids === 'grid')
        {
            this.setState({view_grids: 'list' });
        }else {
            this.setState({view_grids: 'grid'});
        }

        if(this.state.toggle === 0)
        {
            this.setState({toggle:  1,render:  2});
         }else {
            this.setState({ toggle:  0,render:  1})
         }
    }

    _keyExtractor = (item, index) => item.id;

    _renderRows(loadingAnimated, numberRow, uniqueKey) {
        let shimmerRows = [];
        for (let index = 0; index < numberRow; index++) {
            shimmerRows.push(
                <ShimmerPlaceHolder
                    key={`loading-${index}-${uniqueKey}`}
                    ref={(ref) => loadingAnimated.push(ref)}
                    style={{marginVertical: 7, alignSelf: 'center'}}
                    width={width - 20}
                    height={100}
                    colorShimmer={['#ffffff75', '#f2f0ff', '#ffffff75']}
                />
            )
        }
        return (
            <View>
                {shimmerRows}
            </View>
        )
    }

    runPlaceHolder() {
        if (Array.isArray(this.loadingAnimated) && this.loadingAnimated.length > 0) {
            Animated.parallel(
                this.loadingAnimated.map(animate => {
                    if (animate&&animate.getAnimated) {
                        return animate.getAnimated();
                    }
                    return null;
                }),
                {
                    stopTogether: false,
                }
            ).start(() => {
                this.runPlaceHolder();
            })
        }
    }

    noResults() {
        return (
            <View style={[ styles.Width_100, styles.flexCenter, styles.heightFull ]}>
                <Text style={[ styles.text_red, styles.textRegular, styles.textSize_20 ]}>
                    {I18n.translate('no_results')}
                </Text>
            </View>
        );
    }

    render() {
        this.loadingAnimated = [];
        return (
            <Container>
                <NavigationEvents onWillFocus={() => this.onFocus()} />
                <Header style={[styles.Header_Up]}>
                    <Left style={[ styles.RightDir ]}>
                        <Button transparent onPress={() => this.props.navigation.navigate('mune')}>
                            <Icon style={styles.icon_header} type="Feather" name='align-right' />
                        </Button>
                    </Left>
                    <Body style={styles.body_header}>
                        <Title style={[styles.headerTitle , {color : '#FFF', fontFamily : 'CairoBold', alignSelf:'center'}]}>{I18n.translate('home')}</Title>
                    </Body>
                    <Right style={[ styles.RightDir ]}>
                        <Button style={styles.botn} transparent onPress={()=> { this.onSearch() }}>
                            <Icon style={styles.icon_header} type="AntDesign" name='search1' />
                        </Button>
                        {
                            (this.props.auth) ?

                                <Button style={styles.botn} transparent onPress={() => this.props.navigation.navigate('notification')}>
                                    <Icon style={styles.icon_header} type="AntDesign" name='bells' />
                                </Button>
                                :
                                <View/>
                        }
                        <Button style={styles.botn} transparent onPress={()=> this.changeViewGrid()}>
                            <Icon style={styles.icon_header} type={this.state.iconType} name={this.state.view_grids} />
                        </Button>
                    </Right>
                </Header>
                <Content scrollEnabled={false} contentContainerStyle={{ flexGrow: 1,flex: 1, height: Dimensions.get('window').height }} >
                    <View style={[ styles.overHidden ]}>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.scroll}>
                        <View  style={[ styles.flexCenter ]}>
                        <TouchableOpacity style={[ styles.paddingHorizontal_10 , null === this.state.category_id ? styles.active : ""]}  onPress={()=> { this.getCategories(null,'') }}>
                            <Text  style={[ styles.textBold, styles.textSize_16, styles.paddingVertical_10, null === this.state.category_id ? styles.text_bom : styles.text_gray ]}>
                                {I18n.translate('all')}
                            </Text>
                        </TouchableOpacity>
                        </View>

                        {
                            this.state.categories.map((item, key) => (
                                (item.id !== 17) ?
                                <View  key={item.id}  style={[ styles.flexCenter ]}>
                                    <TouchableOpacity style={[styles.paddingHorizontal_10 , item.id === this.state.category_id ? styles.active : ""]}  onPress={()=> { this.getCategories(item.id,item.name ) }}>
                                      <Text  style={[ styles.textBold, styles.textSize_16, styles.paddingVertical_10, item.id === this.state.category_id ? styles.text_bom : styles.text_gray ]}>
                                          {item.name}
                                      </Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                <View/>
                        ))
                        }
                    </ScrollView>
                </View>
                <View style={[ styles.filter ]}>

                    <View style={styles.viewPikerHome}>
                        <Item style={styles.itemPikerHome} regular>
                            <Picker
                                iosHeader={I18n.translate('choose_country')}
                                headerBackButtonText={I18n.translate('goBack')}
                                mode="dropdown"
                                style={styles.PickerHome}
                                onValueChange={this.onValueChange5.bind(this)}
                                placeholderStyle={{ color: "#444", writingDirection: 'rtl', width : '100%',fontFamily : 'CairoRegular', fontSize : 14, paddingRight : 5, paddingLeft: 5 }}
                                selectedValue={this.state.country_id}
                                textStyle={{ color: "#444",fontFamily : 'CairoRegular', writingDirection: 'rtl', fontSize : 14, paddingRight : 5, paddingLeft: 5 }}
                                placeholder={I18n.translate('choose_country')}
                                itemTextStyle={{ color: '#444',fontFamily : 'CairoRegular', writingDirection: 'rtl', fontSize : 14, paddingRight : 5, paddingLeft: 5 }}>

                                <Picker.Item style={styles.itemPicker} label={I18n.translate('choose_country')} value={null} />

                                {
                                    this.state.countries.map((country, i) => (
                                        <Picker.Item style={styles.itemPicker} key={i} label={country.name} value={country.id} />
                                    ))
                                }

                            </Picker>
                        </Item>
                        <Icon style={styles.iconPicker} type="AntDesign" name='down' />
                    </View>

                    <View style={styles.viewPikerHome}>
                        <Item style={styles.itemPikerHome} regular>
                            <Picker
                                iosHeader={I18n.translate('choose_city')}
                                headerBackButtonText={I18n.translate('goBack')}
                                mode="dropdown"
                                style={styles.PickerHome}
                                selectedValue={this.state.city}
                                onValueChange={this.onValueChange2.bind(this)}
                                placeholderStyle={{ color: "#444", writingDirection: 'rtl', width : '100%',fontFamily : 'CairoRegular', fontSize : 14, paddingRight : 5, paddingLeft: 5 }}
                                textStyle={{ color: "#444",fontFamily : 'CairoRegular', writingDirection: 'rtl', fontSize : 14, paddingRight : 5, paddingLeft: 5 }}
                                placeholder={I18n.translate('choose_city')}
                                itemTextStyle={{ color: '#444',fontFamily : 'CairoRegular', writingDirection: 'rtl', fontSize : 14, paddingRight : 5, paddingLeft: 5 }}>

                                <Picker.Item style={styles.itemPicker} label={I18n.translate('choose_city')} value={null} />

                                {
                                    this.state.cities.map((country, i) => (
                                        <Picker.Item style={styles.itemPicker} key={i} label={country.name} value={country.id} />
                                    ))
                                }

                            </Picker>
                        </Item>
                        <Icon style={styles.iconPicker} type="AntDesign" name='down' />
                    </View>

                    <TouchableOpacity style={styles.clickFunctionHome} onPress={()=> {this._getLocationAsync()}}>
                        <Text style={[styles.textRegular, styles.text_black, styles.textSize_14]}>{I18n.translate('nearest')}</Text>
                        <Icon style={[styles.text_darkGreen, styles.textSize_14]} type="MaterialCommunityIcons" name='near-me' />
                    </TouchableOpacity>


                </View>

                    {/*<View style={[ styles.filter ]}>*/}
                        {/*<View     style={{ justifyContent : 'center', width : '100%'}}>*/}
                            {/*<TouchableOpacity onPress={()=> this.props.navigation.navigate('ChooseBank')} style={{ width : 160  , backgroundColor :CONST.color, textAlign : 'center' }}>*/}
                                {/*<Text style={[ styles.headerTitle,{color : '#fff',fontSize : 18 , textAlign :'center'} ]}>{I18n.t('commission_calc')}</Text>*/}
                            {/*</TouchableOpacity>*/}
                        {/*</View>*/}
                    {/*</View>*/}

                    <View style={[styles.flexCenter, styles.Width_100, styles.bgFullWidth]}>

                         { (this.state.blogs.length === 0) ? this.noResults() : null}

                         {
                             this.state.spinner ?
                                 this._renderRows(this.loadingAnimated, 5, '5rows')
                                 :
                                 <FlatList
                                     data={this.state.blogs}
                                     style={[styles.flatList]}
                                     keyExtractor={this._keyExtractor}
                                     onEndReachedThreshold={isIOS ? .01 : 1}
                                     key={this.state.render}
                                     extraData={this.state}
                                     renderItem={  this._renderItem}
                                     onEndReached={this.more.bind(this)}
                                     numColumns = { this.state.render }
                                 />
                         }


                     </View>

                </Content>

                {
                    this.state.blogs.length >= 5 ?
                        <Animatable.View   animation="pulse" iterationCount="infinite"  delay={2000}  style={{position:'absolute' , bottom: '15%' , left : 0 , alignItems : 'center', justifyContent : 'center', width : '100%'}}>
                            <TouchableOpacity onPress={()=>this.more()} style={[ styles.width_150, styles.height_30, styles.flexCenter, { backgroundColor : '#ced09b' } ]}>
                                <Text style={[ styles.textRegular, styles.text_darkGreen ]}>{I18n.translate('moreth')}</Text>
                            </TouchableOpacity>
                        </Animatable.View>
                        :
                        null
                }

                {this.state.isSearch === true ? (
                    <View style={styles.up_block_search}>
                        <TouchableOpacity onPress={()=> { this.onSearch() }} style={styles.over_block_search}/>
                        <View style={styles.block_search}>
                            <Input style={styles.input_search} onChangeText={(keyword)=> this.handleKeyUp(keyword)} placeholder={I18n.translate('search')} />
                        </View>
                    </View>
                ) : (
                    <View />
                )}


                <Tabs  style={{zIndex : 999999}} routeName="home" navigation={this.props.navigation}/>
            </Container>
        );
    }

}




const mapStateToProps = ({ auth, lang ,profile }) => {
    return {
        auth   : auth.user,
        lang   : lang.lang,
        user   : profile.user
    };
};
export default connect(mapStateToProps, {profile})(Home);
