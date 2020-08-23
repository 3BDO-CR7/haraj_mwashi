import axios from 'axios';
import { AsyncStorage } from 'react-native';
import CONST from '../consts';

export const userLogin = ({phone, password, device_id,key,lang}) => {

     return (dispatch) => {
        dispatch({type: 'user_login'});
        axios.post( CONST.url + 'signIn', {phone, password, device_id,key, lang})
            .then(response => handelLogin(dispatch, response.data))
            .catch(error => console.log(error));
    };
};


export const tempAuth = () => {
    return (dispatch) => {
        dispatch({type: 'temp_auth'});
    };
};


const handelLogin = (dispatch, data) => {

     if (data.value === '0'){
        loginFailed(dispatch, data)
    }else if(data.value === '2'){
        loginFailedConfirm(dispatch, data)
    }else{
        loginSuccess(dispatch, data)
    }
};


const loginSuccess = (dispatch, data) => {

     let result = data;

     if(result.value === '1')
     {
         if(result.data != null)
         {
             AsyncStorage.setItem('plusUserId', JSON.stringify(result.data))
                 .then(() => dispatch({type: 'login_success', result }));

         }else {
             AsyncStorage.setItem('plusUserData', JSON.stringify(result.data))
                 .then(() => dispatch({type: 'login_success', result }));
         }
     }



};

const loginFailed = (dispatch, error) => {
    dispatch({type: 'login_failed', error});
};

const loginFailedConfirm = (dispatch, data) => {
    dispatch({type: 'login_confirm', data});
};