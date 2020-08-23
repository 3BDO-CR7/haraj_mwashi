import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {Image, Icon} from 'native-base';
 import {connect} from "react-redux";
import {logout, profile, tempAuth, userLogin} from "../actions";
class Header extends React.Component {

    constructor(props) {
        super(props);
     }
  componentWillMount() {
   }


  render() {

      return (
      <View style={styles.bgImage}>
        <TouchableOpacity  onPress={() => this.props.navigation.navigate('mune') }>
          <Icon style={styles.icon} active type="EvilIcons" name='navicon' />
        </TouchableOpacity>
          <Image source={require('../../assets/png.png')}/>

          {
              (this.props.auth) ?
                  <TouchableOpacity onPress={() => {
                      this.props.navigation.navigate('notification')
                  } }>
                      <Icon style={styles.icon}  type={(this.props.type != null ? this.props.type : 'MaterialCommunityIcons')} name={this.props.iconName} />
                  </TouchableOpacity>

                  :
                  <View/>
          }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  bgImage : {
    display               : 'flex',
    padding               : 10,
    paddingTop            : 30,
    alignItems            : 'center',
    flexDirection         : 'row',
    justifyContent        : 'space-between',
      backgroundColor:'#8C499C'
  },
  text: {
      color               : "#fff",
      fontSize            : 20,
      fontFamily          : 'CairoRegular',
      textAlign           : 'center',
  },
  icon : {
    color                 : '#fff',
    fontSize              : 25,
  },
});


const mapStateToProps = ({ auth, lang ,profile }) => {

    return {
        auth   : auth.user,
        lang   : lang.lang,
        user   : profile.user
    };
};
export default connect(mapStateToProps, {profile})(Header);




