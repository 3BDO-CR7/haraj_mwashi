import React, { Component } from 'react';
import { StyleSheet, I18nManager,TouchableOpacity } from 'react-native';
import  { Container,Icon, Content, Header, Left, Body, Right, Button,Title,Text, View} from 'native-base';

import I18n from "ex-react-native-i18n";
import axios from "axios";
import {connect} from "react-redux";
import {profile} from "../actions";
// import Spinner from "react-native-loading-spinner-overlay";
const  base_url = 'http://plus.4hoste.com/api/';
import CONST from '../consts';
import styles from '../../assets/style'
import {NavigationEvents} from "react-navigation";

class AddE3lan extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text    : '',
            spinner : false,
            lang    : this.props.lang,
        };

    }

    componentWillMount() {


        this.setState({spinner: true});
        this.setState({lang: this.props.lang});

        axios.post(`${CONST.url}adsTermsAndConditions`, { lang: this.props.lang })
            .then( (response)=> {

                this.setState({text: response.data.data});

            })
            .catch( (error)=> {
                console.warn(error);
                this.setState({spinner: false});
            }) .then( ()=> {
            this.setState({spinner: false});
        })

    }

    onAccPresed() {

        let type = this.props.navigation.state.params.type;

        if(type === 1){
            this.props.navigation.navigate('SelectCategory', { type : type})
        }else if(type === 2){
            this.props.navigation.navigate('forme3lan_photo')
        }

    }


    onFocus(){
        this.componentWillMount()
    }

    render() {
     return (
      <Container>
          <NavigationEvents onWillFocus={() => this.onFocus()}/>

          <Header style={styles.Header_Up}>
              <Body style={[styles.body_header,styles.textHead]}>
                  <Title style={styles.headerTitle}>{I18n.translate('ads_condition')}</Title>
              </Body>
              <Right style={[ styles.RightDir ]}>
                  <Button transparent onPress={()=> this.props.navigation.goBack()} >
                      <Icon style={styles.icons} type="AntDesign" name={ (this.state.lang !== 'ar' || this.state.lang == null) ? 'right' : 'left' }/>
                  </Button>
              </Right>
          </Header>


        <Content>

        <View >

            <Text style={[styles.text_info,{marginTop:40}]}>
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </Text>

            <Text style={[styles.text_info,{fontFamily:'CairoBold'}]}>
                ( وَأَوْفُوا بِعَهْدِ اللَّهِ إِذَا عَاهَدتُّمْ وَلَا تَنقُضُوا الْأَيْمَانَ بَعْدَ تَوْكِيدِهَا وَقَدْ جَعَلْتُمُ اللَّهَ عَلَيْكُمْ كَفِيلًا ۚ إِنَّ اللَّهَ يَعْلَمُ مَا تَفْعَلُونَ )
            </Text>

            <Text style={styles.text_info}>

                {this.state.text}

            </Text>


        </View>

        {/*<Spinner visible={this.state.spinner}/>*/}

        <View style={styles.divBtn}>
            <TouchableOpacity onPress={() => this.onAccPresed()}  style={[styles.btn_width,styles.bg_ligth]}>
                <Text style={styles.text_btn}>{I18n.translate('accept')}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.props.navigation.navigate('home')}  style={[styles.btn_width,{backgroundColor:'#919191'}]}>
                <Text  style={styles.text_btn}>{I18n.translate('cancel')}</Text>
            </TouchableOpacity>
        </View>

        </Content>

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
export default connect(mapStateToProps, {profile})(AddE3lan);





