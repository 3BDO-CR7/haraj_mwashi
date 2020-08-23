import React, { Component } from 'react';
import { StyleSheet, Text, LayoutAnimation, View, Platform ,UIManager,TouchableOpacity} from 'react-native';
import {Container,Radio, Content,ListItem, Button, Icon, Title, Header, Left, Body, Right} from 'native-base';
import {connect} from "react-redux";
import {profile} from "../actions";
class InitScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected          : null,

            expanded     : false,
            pressed      : []
        };

        if (Platform.OS === 'android') {
        }
    }



    async componentWillMount() {
        if (this.props.lang == null) {
            this.props.navigation.navigate('language');
        }else {
            this.props.navigation.navigate('home');
        }
    }


    render() {
        let  parents =
        this.state.parents ;
        return (
            <Container>
                <Header />
                <Content>

                </Content>
            </Container>
        );
    }
}

const styles          = StyleSheet.create({
    header : {
        backgroundColor       : "transparent",
        justifyContent        : 'space-between',
        flexDirection         : 'row',
        paddingTop            : 25,
        paddingRight          : 5,
        paddingLeft           : 5,
        borderWidth           : 1,
        borderColor           : "#ECECEC",
        height : 85
    },
    text : {
        fontFamily            : 'CairoRegular',
        color                 : '#444',
        marginTop             : 7,
        fontSize              : 15,
        marginLeft            : 15
    },
    icons : {
        fontSize              : 20,
        color                 : "#3591cf"
    },
    logo : {
        width                 : 150,
        height                : 150,
        alignItems            : 'center',
        justifyContent        : 'center',
        alignSelf             : 'center',
        margin                : 40,
        borderRadius :65,
    },
    texter : {
        fontFamily            : 'CairoRegular',
        textAlign             : 'center',
        margin                : 15
    },
    headerTitle:{
        color                 : '#444',
        fontFamily            : 'CairoRegular',
    }
});
const mapStateToProps = ({ auth, lang ,profile}) => {
    return {
        auth   : auth.user,
        lang   : lang.lang,
        user   : profile.user,
    };
};
export default connect(mapStateToProps,{profile})(InitScreen);



