import Toast from 'react-native-tiny-toast'
export default {
    url       : 'http://mwashii.aait-sa.com/api/',
    color     : '#134949',
    showToast : (msg,type)=> {
        if(type == 'success')
        {
            Toast.show(msg,{
                position: Toast.position.center,
                containerStyle:{backgroundColor : '#00bb43', width : '90%'},
                textStyle: {fontFamily : 'CairoRegular'},
                imgStyle: {},
                mask: true,
                maskStyle:{},
            })
        }else{
            Toast.show(msg,{
                position: Toast.position.center,
                containerStyle:{backgroundColor : '#F00', width : '90%'},
                textStyle: {fontFamily : 'CairoRegular'},
                imgStyle: {},
                mask: true,
                maskStyle:{},
            })
        }

}
};

