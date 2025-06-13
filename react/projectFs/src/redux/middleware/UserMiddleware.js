import axios from "axios";
import{getAllUsers,getUserById,createNewUser,addUserWithImage,signIn,errorSignIn,signUp,signUpWithImage,errorSignUp} from '../reducers/UserReducer'

export const getUsersMidd=({dispatch,getState})=>next=>action=>{
    if(action.type==='GET_ALL_USERS'){
        axios.get('http://localhost:8585/api/users/getAllUser')
        .then((response)=>{
            console.log('resp.data',response.data);
            dispatch(getAllUsers(response.data))
        })
        .catch((error)=>{
            console.error('error fetching question:',error);
        })
    }

    if(action.type==='GET_USER_BY_ID'){
        axios.get(`http://localhost:8585/api/users/getUserDetails/${action.payload}`)
        .then((response)=>{
            console.log('resp.data',response.data);
            dispatch(getUserById(response.data))
        })
        .catch((error)=>{
            console.error('error fetching question:',error);
        })
    }

    if(action.type==='SIGN_UP'){
        const newUser=action.payload
        console.log('newUser',newUser);
        axios.post("http://localhost:8585/api/users/signUp",newUser)
        .then((response)=>{
            console.log('resp.data',response.data);
            dispatch(signUp(response.data))
        })
        .catch((error)=>{
            console.error('error fetching question:',error);
            dispatch(errorSignUp(true))

        })
    }

    if(action.type==='SIGN_UP_WITH_IMAGE'){
        console.log('SIGN_UP_WITH_IMAGE');
        const {user,image}=action.payload
        const formData=new FormData()
        console.log("user",user)
        console.log("image",image)
        formData.append('image',image)
        formData.append('user',new Blob([JSON.stringify(user)],{type: 'application/json'}))
        axios.post("http://localhost:8585/api/users/signUpWithImage",formData)
        .then((response)=>{
            console.log('resp.data',response.data);
            dispatch(signUpWithImage(response.data))
        })
        .catch((error)=>{
            console.error('error fetching question:',error);
            dispatch(errorSignUp(true))
        })
    }


    if(action.type==='SIGN_IN'){
        const newUser=action.payload
        console.log('newUser',newUser);
        axios.post("http://localhost:8585/api/users/signIn",newUser)
        .then((response)=>{
            console.log('resp.data',response.data);
            dispatch(signIn(response.data))
        })
        .catch((error)=>{
            console.error('error fetching question:',error);
            dispatch(errorSignIn(true))
        })
    }



    return next(action)
}
