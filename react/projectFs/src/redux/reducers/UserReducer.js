import{createSlice} from '@reduxjs/toolkit'

const initialState={
    listUsers:[],
    userById:null,
    userByMail:null,
    // {id:3, firstName:'noa',lastName:'plucki',mail:'noa@gmail.com',password:'1234567890',image:'/broken-image.jpg',coomment:[],question:[]},
    errorUserByMail:false
};

export const userSlice=createSlice({
    name:'users',
    initialState,
    reducers:{
        getAllUsers:(state,action)=>{
            state.listUsers=(action.payload);
        },
        editUser:(state ,action)=>{
            const currentUserIndex=state.findIndex(u=>u.userId===action.payload.userId);
            state[currentUserIndex]=action.payload.user;
        },
        deleteUser:(state,action)=>{
            state.filter(u=>u.userId!==action.payload.userId)
        },
        getUserById:(state,action)=>{
            state.userById=(action.payload)
        },
        createNewUser:(state,action)=>{
            state.listUsers.push(action.payload)
        },
        addUserWithImage:(state,action)=>{
            state.listUsers.push(action.payload);
        },
        signIn:(state,action)=>{
            console.log(action.payload);
            state.userByMail=(action.payload); 
        },
        errorSignIn:(state,action)=>{
            state.errorUserByMail=(action.payload);   
        },
        signUp:(state,action)=>{
            state.userByMail=(action.payload);
            state.listUsers.push(action.payload);
        },
        signUpWithImage:(state,action)=>{
            state.userByMail=(action.payload);   
            state.listUsers.push(action.payload);
        },
        errorSignUp:(state,action)=>{
            state.errorUserByMail=(action.payload);   
        },
        logout:(state,action)=>{
            state.userByMail=(action.payload);   
        },
        
    },
})

export const {getAllUsers,editUser,deleteUser,getUserById,createNewUser,addUserWithImage,signIn,errorSignIn,errorSignUp,signUp,signUpWithImage,logout}=userSlice.actions

export default userSlice.reducer