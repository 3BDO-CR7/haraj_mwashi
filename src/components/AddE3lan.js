import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import {Container, Icon, Content, Button, Title, Text, View, Body, Right, Header, Left} from 'native-base';
import I18n from "ex-react-native-i18n";
import styles from '../../assets/style'
import {connect} from "react-redux";
import {profile} from "../actions";



class AddE3lan extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lang            : this.props.lang,
        };
    }


  render() {
    return (
      <Container>

          <Header style={[styles.Header_Up]}>
              <Left style={[ styles.RightDir]}>
                  <Button transparent onPress={() => this.props.navigation.navigate('mune')}>
                      <Icon style={styles.icons} type="Octicons" name='three-bars' />
                  </Button>
              </Left>
              <Body style={[styles.body_header,styles.flexCenter]}>
                  <Title style={styles.headerTitle}>{I18n.translate('add_Ads')}</Title>
              </Body>
              <Right style={[ styles.RightDir]}>
                  <Button transparent onPress={()=> this.props.navigation.goBack()} >
                      <Icon style={styles.icons} type="AntDesign" name={ (this.state.lang !== 'ar' || this.state.lang == null) ? 'right' : 'left' }/>
                  </Button>
              </Right>
          </Header>

        <Content contentContainerStyle={[ styles.bgFullWidth ]}>

        <View style={styles.content}>
            <View style={styles.fixed_top}>
                     <TouchableOpacity
                         style={styles.fixed_btn}
                         onPress={() => this.props.navigation.navigate('termse3lan',{type : 1})}
                     >
                        <Text style={styles.text_btn}>
                            {I18n.translate('free_Ads')}
                        </Text>
                    </TouchableOpacity>

                     <TouchableOpacity
                         style={[styles.fixed_btn,{backgroundColor:'#ced09b'}]}
                         onPress={() => this.props.navigation.navigate('termse3lan' ,{type : 2})}
                     >
                        <Text style={[ styles.text_btn , styles.text_darkGreen ]}>
                            {I18n.translate('photo_ads')}
                        </Text>
                    </TouchableOpacity>
            </View>
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
export default connect(mapStateToProps,{profile})(AddE3lan);
