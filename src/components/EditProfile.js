import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity, ActivityIndicator
} from 'react-native';
import {
    Container,
    Item,
    Input,
    Icon,
    Title,
    Picker,
    Button,
    Toast, Header, Left, Body, Right, Label,
} from 'native-base'
import  * as Permissions from 'expo-permissions'
import  * as ImagePicker from 'expo-image-picker';
import  {connect} from "react-redux";
import  I18n from "ex-react-native-i18n";
import  axios from "axios";
// import  Spinner from "react-native-loading-spinner-overlay";
// import  {Bubbles} from "react-native-loader";
import  { profile ,updateProfile,logout ,tempAuth} from '../actions'
import  CONST from '../consts';
import  styles from '../../assets/style'
class   EditProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password     : '',
            cf_password  : '',
            phone        : '',
            countries    : [],
            codes        : [],
            key          : '',
            city_id      : '',
            cities       : [],
            country_id   : '',
            name         : '',
            spinner      : false,
            text         : '',
            pathname     : '',
            favourites   : [],
            image        : 'https://image.shutterstock.com/image-vector/default-avatar-profile-icon-grey-260nw-1545687068.jpg',
            img          : '',
            lang         : 'ar',
            // email        : '',
        };

        if(!this.props.user) {
            this.props.navigation.navigate('login');
        }
        this.setState({lang: this.props.lang});
    }

    componentWillReceiveProps(newProps){
            this.setState({
                isLoaded: false,spinner: false
            });
            if(newProps.Updated === 2)
            {
                if( JSON.stringify(this.props.user) !== JSON.stringify(newProps.user)){
                    if(newProps.result != null)
                    {
                        if(newProps.result.value === '1')
                        {
                            // Toast.show({ text:  newProps.result.msg, duration : 2000  ,type :"success", textStyle: {  color: "white",fontFamily : 'CairoRegular' ,textAlign:'center' } });
                            CONST.showToast(newProps.result.msg,  "success")
                            this.props.profile({  user_id: this.props.user.id,lang : this.props.lang  });
                            this.props.navigation.navigate('profile');
                        }else if(newProps.result.value === '2')
                        {
                            CONST.showToast(newProps.result.msg,  "warning")

                            // Toast.show({ text:  newProps.result.msg, duration : 2000  ,type :"warning", textStyle: {  color: "white",fontFamily : 'CairoRegular' ,textAlign:'center' } });
                            this.props.navigation.navigate('Confirmation_Page',{
                                user_id : this.props.user.id,
                                type : 'phone'
                            });
                        }else{
                            CONST.showToast(newProps.result.msg,  "danger")

                            // Toast.show({ text:  newProps.result.msg, duration : 2000  ,type :"danger", textStyle: {  color: "white",fontFamily : 'CairoRegular' ,textAlign:'center' } });
                        }
                    }
                }
            }
    }

    validate = () => {
        let isError = false;
        let msg = '';

        if (this.state.phone.length <= 0 || this.state.phone.length < 9) {
            isError = true;
            msg = I18n.t('phoneValidation');
        }

        else if (this.state.name === '') {
            isError = true;
            msg = I18n.t('nameRequired');
        }
        else if(this.state.password.length > 0) {
            isError = true;
            if(this.state.password.length < 6)
            {   isError = true;
                msg = I18n.t('passwordRequired');

            }else if(this.state.password !== this.state.cf_password)
            {   isError = true;
                msg = I18n.t('cf_passwordRequired');
            }else{
                isError = false;
            }
        }
        if (msg !== ''){
            CONST.showToast(msg,  "danger")

            // Toast.show({ text: msg, duration : 2000  ,type :"danger", textStyle: {  color: "white",fontFamily : 'CairoRegular' ,textAlign:'center' } });

        }
        return isError;
    };


    renderSubmit() {

        if (this.state.isLoaded){
            return(
                <View  style={{ justifyContent:'center', alignItems:'center'  , marginTop:50}}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }

        return (

            <Button  onPress={() => this.sendData()} style={[ styles.bgLiner , { marginTop:  40 } ]}>
                <Text style={styles.textBtn}>{I18n.translate('save')}</Text>
            </Button>

        );
    }

    sendData() {

        const err = this.validate();
        if (!err){
            this.setState({isLoaded: true,spinner: true});
            const data = {
                lang      : this.props.lang ,
                user_id   : this.props.user.id,
                phone     : this.state.phone ,
                // email     : this.state.email ,
                avatar    : this.state.img,
                codes     : [],
                name      : this.state.name ,
                password  : this.state.password ,
                key       : this.state.key,
                country_id: this.state.country_id ,
                city_id   : this.state.city_id
            };

            this.props.updateProfile(data);
        }else{
            console.warn('error')
        }

    }

    componentWillMount() {
       if(this.props.lang) { this.setState({lang:    this.props.lang}); }
        if(this.props.auth)
        {
            if(this.props.user)
            {
                this.setState({
                    image     :this.props.user.avatar,
                    phone     :this.props.user.mobile,
                    city_id   :this.props.user.city_id,
                    key       :this.props.user.key,
                    country_id: this.props.user.country_id,
                    name      : this.props.user.name,
                    // email      : this.props.user.email
                });

            }else{

                this.setState({
                    image     :this.props.auth.data.avatar,
                    phone     :this.props.auth.data.mobile,
                    city_id   :this.props.auth.data.city_id,
                    key       :this.props.auth.data.key,
                    country_id: this.props.auth.data.country_id,
                    name      : this.props.auth.data.name,
                    // email      : this.props.auth.data.email,
                });
                this.props.profile({ user_id: this.props.auth.data.id  });
            }

        }else{
            this.props.navigation.navigate('login');
        }

        this.setState({spinner: true});
          axios.post(`${CONST.url}countries`, { lang: this.props.lang  })
              .then( (response)=> {
                  this.setState({countries: response.data.data});
                  axios.post(`${CONST.url}cities`, { lang: this.props.lang , country_id: this.state.country_id })
                      .then( (response)=> {
                          this.setState({cities : response.data.data});
                          axios.post(`${CONST.url}codes`, { lang: this.props.lang })
                              .then( (response)=> {
                                  this.setState({codes:response.data.data})
                              }).then(()=>{
                              this.setState({spinner: false});
                          })

                      })
              });

          this.props.profile({  user_id: this.props.auth.data.id  });

      }

        componentDidMount() {
            this.getPermissionAsync();
        }

        getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          await   Permissions.askAsync(Permissions.CAMERA);
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      };

        _pickImage      = async () => {
          await   Permissions.askAsync(Permissions.CAMERA);
          await Permissions.askAsync(Permissions.CAMERA_ROLL);
          let result      = await ImagePicker.launchImageLibraryAsync({
          allowsEditing : true,
          base64        : true,
          aspect        : [4, 3],
        });
          this.setState({img: result.base64});
          if (!result.cancelled) {
              this.setState({ image: result.uri });
          }
      };

        changeFocusName(name)   { this.setState({name}) }
        changeFocusPhone(phone) { this.setState({phone}) }
        onValueChangeCity(value) {
        this.setState({
            city_id: value
        });
    }

    onValueChange_key(key) {
        this.setState({key});
    }

    onValueChange(value) {
        this.setState({ country_id: value});
        setTimeout(()=>{
            this.setState({spinner: true});
            axios.post(`${CONST.url}cities`, { lang:this.props.lang , country_id: this.state.country_id })
                .then( (response)=> {
                    this.setState({
                        city_id : response.data.data[0].id,
                        cities  : response.data.data
                    });
                }).then(()=>{
                   this.setState({spinner: false});
            });

        },1500);

    }


  render() {
    let { image } = this.state;
    return (
      <Container>
          {/*<Spinner visible={this.state.spinner}/>*/}

          <Header style={styles.Header_Up}>
              <Body style={[styles.body_header,styles.textHead]}>
                  <Title style={styles.headerTitle}>{I18n.translate('editAcc')}</Title>
              </Body>
              <Right style={[ styles.RightDir ]}>
                  <Button transparent onPress={()=> this.props.navigation.navigate('profile')} >
                      <Icon style={styles.icons} type="AntDesign" name={ (this.state.lang !== 'ar' || this.state.lang == null) ? 'right' : 'left' }/>
                  </Button>
              </Right>
          </Header>

          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

              <View style={[ styles.marginVertical_20 ]}>
                  <View style={styles.imagePicker}>
                      <Button onPress={this._pickImage} style={styles.clickOpen}>
                          {this.state.image && <Image source={{ uri: image }} style={styles.imgePrive} />}
                      </Button>
                  </View>

                  <KeyboardAvoidingView behavior="padding" style={{ flex: 1}}>
                      <View style={[ styles.centerColum, styles.Width_80 ]}>
                          <View style={[styles.item , {flexDirection : 'row'}]} >
                              {/*<Icon style={[styles.icon_input , { top : 17 }]} active type="SimpleLineIcons" name='user' />*/}
                              {/*<Label style={styles.label}>{ I18n.translate('username')}</Label>*/}
                              <Input
                                  style={[styles.input, { paddingRight : 10, paddingLeft : 10, color : "#363636" }]}
                                  value={ this.state.name}
                                  onChangeText={(name)=> this.changeFocusName(name)}
                                  placeholder={ I18n.translate('email')}
                              />
                          </View>

                          <View style={{flexDirection: 'row', width : '100%'}}>
                              <View style={[ styles.flex_80 ]}>
                                  <View style={[ styles.item ]} >
                                      {/*<Icon style={styles.icon_input} active type="SimpleLineIcons" name='phone' />*/}
                                      {/*<Label style={styles.label}>{ I18n.translate('enterchoose')}</Label>*/}
                                      <Input
                                          value={ this.state.phone }
                                          placeholder={I18n.translate('enterchoose')}
                                          style={[styles.input, { paddingRight : 10, paddingLeft : 10, color : "#363636" }]}
                                          onChangeText={(phone) => this.setState({phone})}
                                          placeholderColor='#FFF'
                                      />
                                  </View>
                              </View>
                              <View style={[ styles.flex_20 ]}>
                                  <View style={[ styles.rowGroup , styles.position_R , { alignItems : 'center', paddingHorizontal : 0, borderWidth : 1, borderColor : '#b5b5b5' , borderLeftWidth : 0,top : 10, height : 52}]} regular>
                                      <Picker
                                          mode               ="dropdown"
                                          style              ={{ color: '#9a9a9a',backgroundColor:'transparent' }} iosHeader={I18n.translate('keyCountry')}
                                          headerBackButtonText={I18n.translate('goBack')}
                                          selectedValue       ={this.state.key}
                                          onValueChange      ={this.onValueChange.bind(this)} //ios
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

                          {/*<View>*/}
                          {/*    <Item style={[styles.item]} >*/}
                          {/*        <Icon style={[styles.icon_input , { top : 17 }]} active type="Entypo" name='mail' />*/}
                          {/*        /!*<Label style={styles.label}>{ I18n.translate('email')}</Label>*!/*/}
                          {/*        <Input style={[styles.input]} onChangeText={(email) => this.setState({email})}  value={ this.state.email }     />*/}
                          {/*    </Item>*/}
                          {/*</View>*/}
                          <View style={[ styles.itemPiker_second, { marginBottom : 15, borderWidth : 1, borderColor : '#b5b5b5', marginTop : 10 } ]} regular>
                              <Icon style={[ styles.iconPicker, { top : 15, right : 5 } ]} name='down' type="AntDesign"/>
                              <Picker
                                  iosHeader={I18n.translate('choose_country')}
                                  headerBackButtonText={I18n.translate('goBack')}
                                  mode="dropdown"
                                  placeholder={I18n.translate('choose_country')}
                                  placeholderStyle={{ color: "#fff", writingDirection: 'rtl', width : '100%',fontFamily : 'CairoRegular' }}
                                  placeholderIconColor="#444"
                                  style={{backgroundColor:'transparent',color: '#fff', width : '100%', writingDirection: 'rtl',fontFamily : 'CairoRegular'}}
                                  selectedValue={this.state.country_id}
                                  itemTextStyle={{ color: '#363636', width : '100%', writingDirection: 'rtl',fontFamily : 'CairoRegular' }}
                                  textStyle={{ color: "#acabae" , width : '100%', writingDirection: 'rtl',fontFamily : 'CairoRegular',paddingLeft : 10, paddingRight: 10 }}
                                  onValueChange={this.onValueChange.bind(this)}
                              >
                                  {this.state.countries.map((city, i) => {
                                      return <Picker.Item style={{color: "#444", width : '100%',fontFamily : 'CairoRegular'}}  key={i} value={city.id} label={city.name} />
                                  })}
                              </Picker>
                          </View>
                          <View style={[ styles.itemPiker_second, { borderWidth : 1, borderColor : '#b5b5b5' } ]} regular>
                              <Icon style={[ styles.iconPicker, { top : 15, right : 5 } ]} name='down' type="AntDesign"/>
                              <Picker
                                  mode="dropdown"
                                  iosHeader={I18n.translate('myCity')}
                                  headerBackButtonText={I18n.translate('goBack')}
                                  style={{width: '100%',backgroundColor:'transparent',color: '#afafaf', writingDirection: 'rtl',fontFamily : 'CairoRegular'}}
                                  placeholderStyle={{ color: "#c5c5c5", writingDirection: 'rtl', width : '100%',fontFamily : 'CairoRegular' }}
                                  selectedValue={this.state.city_id}
                                  onValueChange={this.onValueChangeCity.bind(this)}
                                  textStyle={{ color: "#acabae" , width : '100%', writingDirection: 'rtl',fontFamily : 'CairoRegular',paddingLeft : 10, paddingRight: 10 }}
                                  placeholder={I18n.translate('myCity')}
                                  itemTextStyle={{ color: '#c5c5c5', width : '100%', writingDirection: 'rtl',fontFamily : 'CairoRegular' }}>
                                  {this.state.cities.map((city, i) => {
                                      return <Picker.Item   style={{color: "#444" , width : '100%',fontFamily : 'CairoRegular'}}  key={i} value={city.id} label={city.name} />
                                  })}
                              </Picker>
                          </View>

                          { this.renderSubmit() }

                          <TouchableOpacity style={{marginVertical: 40}} onPress={()=> {this.props.navigation.navigate('chnage_password')}}>
                              <Text style={{fontFamily:'CairoRegular' , color : '#444' , fontSize : 16 , textAlign:'center'}}>{I18n.translate('chnage_password')}</Text>
                          </TouchableOpacity>
                      </View>
                  </KeyboardAvoidingView>

              </View>

        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth, lang ,profile }) => {
    return {
         auth       : auth.user,
         lang       : lang.lang,
         user       : profile.user,
         result     : profile.result,
         userId     : profile.user_id,
         Updated     : profile.updated,
    };
};
export default connect(mapStateToProps, {profile,updateProfile,logout,tempAuth})(EditProfile);
