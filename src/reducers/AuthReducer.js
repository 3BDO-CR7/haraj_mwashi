const INITIAL_STATE = {user: null, loading: false,user_id: null ,success: 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case ('login_user') :
            return ({...state, loading: true});
        case ('login_failed') :
            return ({...state, loading: false, user: action.error });
        case ('login_confirm') :
             return ({...state ,user: action.data,loading: false, user_id: action.data.user_id ,success: 2});
        case ('login_success') :
             return ({...state , user: action.result , user_id : action.result.user_id,success: 1 });
        case ('user_logout') :
            return ({...state, user: null});
        case ('temp_auth') :
            return ({...state, user: null});
        default :
            return state;
    }

}






