import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    AsyncStorage,
    Alert,
    View,
    Image,
    KeyboardAvoidingView,
    ActivityIndicator,TouchableOpacity
} from 'react-native';
import {
    Container,
    Content,
    Form,
    Item,
    Input,
    Label,
    Icon,
    Title,
    Picker,
    Button,
    Toast,
    Body,
    Left,
    Right, Header
} from 'native-base'

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from "expo-constants";

import I18n from "ex-react-native-i18n";
import axios from "axios";
// import Spinner from "react-native-loading-spinner-overlay";
// import {Bubbles} from "react-native-loader";
import {connect} from "react-redux";
const  base_url = 'http://plus.4hoste.com/api/';
import CONST from '../consts';
import styles from '../../assets/style'
import * as Animatable from "react-native-animatable";

class Register extends Component {

    constructor(props) {
        super(props);

         this.state  = {
            en_message   : 'please complete all required data',
            ar_message   : 'برجآء تأكد من إدخال جميع البيانات',
            key : null,
            cities: [],
             codes: [],
            countries : [],
            is_password: false,
            cf_password:null ,
            is_email: false,
            email :'' ,
            spinner: false,
            phone : '',
            lang : this.props.lang,
            country_id: 1,
            password : '',
            city_id : null ,
            name : '' ,
            files : null,
            isLoaded : false,
            text: null,
            selected2   : undefined,
            image  : null};
     }

  componentWillMount() {

       this.setState({spinner: true});
      axios.post(`${CONST.url}countries`, { lang: this.props.lang  })
          .then( (response)=> {
              this.setState({countries: response.data.data});

              axios.post(`${CONST.url}cities`, { lang: this.props.lang , country_id: this.state.country_id })
                  .then( (response)=> {

                      this.setState({cities: response.data.data});
                      this.setState({city_id: response.data.data[0].id});


                      axios.post(`${CONST.url}codes`, { lang: this.props.lang  })
                          .then( (response)=> {
                              this.setState({codes: response.data.data});
                              this.setState({key: response.data.data[0]});
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
          }).catch( (error)=> {
              this.setState({spinner: false});
          })

  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64:      true,
      aspect: [4, 3],
    });

    this.setState({files: result.base64});

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };



  onValueChange(value) {
    this.setState({ country_id: value});
    setTimeout(()=>{

          this.setState({spinner: true});
          axios.post(`${CONST.url}cities`, { lang: this.props.lang , country_id: this.state.country_id })
              .then( (response)=> {
                  this.setState({cities: response.data.data});
                  this.setState({city_id: response.data.data[0].id});
                  axios.post(`${CONST.url}choose_codes`, { lang: this.props.lang , country_id: this.state.country_id })
                      .then( (response)=> {
                          this.setState({key:response.data.data})
                      })
                      .catch( (error)=> {
                          this.setState({spinner: false});
                      }).then(()=>{
                      this.setState({spinner: false});
                  }).then(()=>{
                      this.setState({spinner: false});
                  });

              }).catch( (error)=> {
                  this.setState({spinner: false});
              })

      },1500);

  }

    onValueChangeCity(value) {
        this.setState({
          city_id: value
        });
    }



    changeFocusName(name)   { this.setState({name}) }
     changeFocusPassword(password) { this.setState({password}) }
    changeFocusCfPassword(cf_password) {
        if(this.state.password !== cf_password)
        {
            this.setState({cf_password:cf_password});
            this.setState({is_password:false});
            return false;
        }
        else {
            this.setState({cf_password:cf_password});
            this.setState({is_password:true})
        }
    }




    validate = () => {
        let isError = false;
        let msg = '';

        if(this.state.name.length <= 0) {
            isError = true;
            msg = I18n.t('nameValidation');
        }else if (this.state.phone.length <= 0 ) {
            isError = true;
            msg = I18n.t('phoneRequired');
        }else if (this.state.email.length <= 0){
            isError = true;
            msg = I18n.t('enem');
        }else if (this.state.email.indexOf("@") === -1 || this.state.email.indexOf(".") === -1){
            isError = true;
            msg = I18n.t('emailNotCorrect');
        }else if (this.state.country_id == null) {
            isError = true;
            msg = I18n.t('encountry');
        }else if (this.state.city_id == null) {
            isError = true;
            msg = I18n.t('chooCity');
        } else if (this.state.password.length <= 0) {
            isError = true;
            msg = I18n.t('passwordRequired');
        }
        if (msg != ''){
            CONST.showToast(  msg,   "danger")

            // Toast.show({ text: msg, duration : 2000  ,type :"danger", textStyle: {  color: "white",fontFamily : 'CairoRegular' ,textAlign:'center' } });

        }
        return isError;
    };
    sendData()
    {

        const err = this.validate();
        if (!err)
        {
            this.setState({isLoaded: true,spinner: true});
            axios.post(`${CONST.url}signUp`, {
                lang: this.props.lang ,
                phone : this.state.phone ,
                email : this.state.email ,
                files :  this.state.files,
                name : this.state.name ,
                password : this.state.password ,
                key : this.state.key,
                country_id: this.state.country_id ,
                city_id : this.state.city_id
            })
                .then( (response)=> {
                    this.setAsyncStorage(response);
                }).catch( (error)=> {
                    this.setState({spinner: false,isLoaded: false});
                }).then(()=>{
                this.setState({spinner: false,isLoaded: false});

            }).then(()=>{
                this.setState({spinner: false, isLoaded: false});
            });
        }
    }


    async setAsyncStorage(response) {

        if(response.data.value === '1')
      {
          CONST.showToast(  response.data.msg,   "success")

          // Toast.show({ text: response.data.msg, duration : 2000  ,type :'success',textStyle: { color: "white",fontFamily            : 'CairoRegular' ,textAlign:'center' } });
          //await AsyncStorage.setItem('plusUserId', JSON.stringify(response.data.user_id));

           this.props.navigation.navigate('Confirmation',
                 {
                     phone: this.state.phone,
                     key : this.state.key,
                     password: this.state.password,
                     user_id :response.data.user_id,
                     code    : response.data.code
              });


      }else if(response.data.value === '2')
       {
           Alert.alert(
               `${I18n.currentLocale() === 'en' ? 'Sign In' : 'سجل دخول'}`,
               `${I18n.currentLocale() === 'en' ? 'User exists , Login Now ?' : 'هذا الحساب مسجل بالفعل ، تسجيل دخول ؟'}`,
               [
                   {
                       text: `${I18n.currentLocale() === 'en' ? 'Sign In' : 'سجل دخول'}`,
                       onPress: () => this.props.navigation.navigate('login')
                   },
                   {
                       text: `${I18n.currentLocale() === 'en' ? 'Cancel' : 'إلغاء'}`,
                       onPress: () => console.log('Cancel Pressed'),
                       style: 'cancel',
                   }
               ],
               {cancelable: false},
           );
       }else{
            CONST.showToast(  response.data.msg,   "danger")

            // Toast.show({ text: response.data.msg, duration : 2000  ,textStyle: { color: "yellow",fontFamily            : 'CairoRegular' ,textAlign:'center' } });
        }
    }

    renderSubmit() {
        if (this.state.isLoaded){
            return(
                <View  style={{ justifyContent:'center', alignItems:'center'}}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }
        return (

            <TouchableOpacity  onPress={() => this.sendData()} style={[ styles.flexCenter, styles.bg_bom, styles.width_150, styles.height_50, styles.marginVertical_10 ]}>
                <Text style={[ styles.textBtn , styles.text_darkGreen ]}>{I18n.translate('send')}</Text>
            </TouchableOpacity>

        );
    }

  render() {
    let { image } = this.state;
    return (
      <Container style={{ backgroundColor :'#134949' }}>
          {/*<Spinner visible={this.state.spinner}/>*/}
          <Header style={[styles.Header_Up]}>
              <Body style={[styles.body_header,styles.textHead]}>
                  <Title style={styles.headerTitle}>{I18n.translate('signUP')}</Title>
              </Body>
              <Right style={[ styles.RightDir ]}>
                  <Button transparent onPress={()=> this.props.navigation.goBack()} >
                      <Icon style={styles.icons} type="AntDesign" name={ (this.state.lang !== 'ar' || this.state.lang == null) ? 'right' : 'left' }/>
                  </Button>
              </Right>
          </Header>
        <Content contentContainerStyle={{ flexGrow: 1, backgroundColor :'#134949' }}>

            <TouchableOpacity onPress={this._pickImage} style={[ styles.width_100, styles.height_100, styles.Border, styles.borderOpcityGray, styles.flexCenter, styles.marginVertical_25, styles.position_R ]}>
              <View style={[ styles.width_100, styles.height_100, styles.flexCenter ]}>
                    <Icon style={[ styles.textSize_16, styles.marginVertical_5, styles.text_bom ]} active type="AntDesign" name='pluscircleo' />
                    <Text style={[ styles.textSize_11, styles.text_bom, styles.textRegular ]}>{I18n.translate('pohot')}</Text>
                    <Text style={[ styles.textSize_9, styles.text_bom, styles.textRegular ]}>( {I18n.translate('choice')} )</Text>
              </View>
              {image && <Image source={{ uri: image }} style={[ styles.width_100, styles.height_100, styles.position_A, styles.top_0, styles.flexCenter ]} />}
            </TouchableOpacity>

            <View style={styles.bgDiv}>
                <KeyboardAvoidingView behavior="padding" style={{  flex: 1, width :'100%'}} >
                    <View style={{width :'100%'}}>
                        <View style={styles.item} >
                            {/*<Icon style={styles.icon_input} active type="SimpleLineIcons" name='user' />*/}
                            {/*<Label style={styles.label}>{ I18n.translate('username')}</Label>*/}
                            <Input
                                placeholder={ I18n.translate('username')}
                                style={[styles.input, { paddingRight : 10, paddingLeft : 10, color : "#fff" }]}
                                value={ this.state.name}
                                onChangeText={(name)=> this.changeFocusName(name)}
                                placeholderTextColor="#fff"
                            />
                        </View>
                        <View style={{flex:1, flexDirection: 'row'}}>
                            <View style={{flex:1}}>
                                <View style={[styles.item , {flexDirection : 'row'}]} >
                                    {/*<Icon style={styles.icon_input} active type="SimpleLineIcons" name='phone' />*/}
                                    {/*<Label style={styles.label}>{ I18n.translate('phone')}</Label>*/}
                                    <Input
                                        placeholder={ I18n.translate('phone')}
                                        style={[styles.input, { paddingRight : 10, paddingLeft : 10, color : "#fff" }]}
                                        keyboardType={'number-pad'}
                                        onChangeText={(phone) => this.setState({phone})}
                                        value={ this.state.mobile }
                                        placeholderTextColor="#fff"
                                    />
                                </View>
                            </View>
                        </View>
                        <View>
                            <View style={[styles.item]} >
                                {/*<Icon style={styles.icon_input} active type="Entypo" name='mail' />*/}
                                {/*<Label style={styles.label}>{ I18n.translate('email')}</Label>*/}
                                <Input
                                    placeholder={ I18n.translate('email')}
                                    style={[styles.input, { paddingRight : 10, paddingLeft : 10, color : "#fff" }]}
                                    onChangeText={(email) => this.setState({email})}
                                    value={ this.state.email }
                                    placeholderTextColor="#fff"
                                />
                            </View>
                        </View>
                        <Item style={[ styles.Border , styles.borderWhite , styles.position_R , styles.padding_0, styles.Width_100 ,{ marginBottom : 10, marginTop : 10, right : 2, marginRight : 0, } ]} regular>
                            <Icon style={[ styles.iconPicker, styles.text_White ]} name='down' type="AntDesign"/>
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
                                textStyle={{ color: "#fff" , width : '100%', writingDirection: 'rtl',fontFamily : 'CairoRegular',paddingLeft : 10, paddingRight: 10 }}
                                onValueChange={this.onValueChange.bind(this)}
                            >
                                {this.state.countries.map((city, i) => {
                                    return <Picker.Item style={{color: "#fff", width : '100%',fontFamily : 'CairoRegular'}}  key={i} value={city.id} label={city.name} />
                                })}
                            </Picker>
                        </Item>
                        <Item style={[ styles.Border , styles.borderWhite , styles.position_R , styles.padding_0, styles.Width_100 ,{ marginBottom : 10, marginTop : 10, right : 2, marginRight : 0, } ]} regular>
                            <Icon style={[ styles.iconPicker, styles.text_White ]} name='down' type="AntDesign"/>
                            <Picker
                                mode="dropdown"
                                iosHeader={I18n.translate('myCity')}
                                headerBackButtonText={I18n.translate('goBack')}
                                style={{width: '100%',backgroundColor:'transparent',color: '#fff', writingDirection: 'rtl',fontFamily : 'CairoRegular'}}
                                placeholderStyle={{ color: "#fff", writingDirection: 'rtl', width : '100%',fontFamily : 'CairoRegular' }}
                                selectedValue={this.state.city_id}
                                onValueChange={this.onValueChangeCity.bind(this)}
                                textStyle={{ color: "#fff" , width : '100%', writingDirection: 'rtl',fontFamily : 'CairoRegular',paddingLeft : 10, paddingRight: 10 }}
                                placeholder={I18n.translate('myCity')}
                                itemTextStyle={{ color: '#363636', width : '100%', writingDirection: 'rtl',fontFamily : 'CairoRegular' }}>
                                {this.state.cities.map((city, i) => {
                                    return <Picker.Item   style={{color: "#fff" , width : '100%',fontFamily : 'CairoRegular'}}  key={i} value={city.id} label={city.name} />
                                })}
                            </Picker>
                        </Item>
                        <View style={[styles.item]}  >
                            {/*<Icon style={styles.icon_input} active type="SimpleLineIcons" name='lock' />*/}
                            {/*<Label style={styles.label}>{I18n.translate('password')}</Label>*/}
                            <Input
                                placeholder={ I18n.translate('password')}
                                style={[styles.input, { paddingRight : 10, paddingLeft : 10, color : "#fff" }]}
                                value={this.state.password}
                                secureTextEntry
                                placeholderTextColor="#fff"
                                onChangeText={(password)=> this.changeFocusPassword(password)}
                            />
                        </View>
                        { this.renderSubmit() }
                        <Text onPress={() => this.props.navigation.navigate('login')} style={[ styles.flexCenter, styles.text_bom, styles.textRegular, styles.textSize_14, styles.marginVertical_10 ]}>{I18n.translate('have_account')}</Text>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </Content>
      </Container>
    );
  }
}


const mapStateToProps = ({ lang}) => {

    return {

        lang   : lang.lang,

    };
};
export default connect(mapStateToProps,{})(Register);




