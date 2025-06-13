import axios from "axios";
import {getCommentByQuestionId,getAllComments,createNewCommentWithImage,createNewComment,getCommentByScore,getCommentByUserId} from "../reducers/commentReducer";

export const getCommentsMidd=({dispatch,getState})=>next=>action=>{
    if(action.type==='GET_COMMENT_BY_QUESTION_ID'){
        axios.get(`http://localhost:8585/api/comments/getCommentByQuestionId/${action.payload}`)
        .then((response)=>{
            console.log('resp.data',response.data);
            dispatch(getCommentByQuestionId(response.data))
        })
        .catch((error)=>{
            console.error('error fetching question:',error);
            // dispatch(getCommentByQuestionId(null))
        })
    }

    if(action.type==='GET_ALL_COMMENTS'){
        axios.get(`http://localhost:8585/api/comments/getAllComments`)
        .then((response)=>{
            console.log('resp.data',response.data);
            dispatch(getAllComments(response.data))
        })
        .catch((error)=>{
            console.error('error fetching question:',error);
        })
    }

    if(action.type==='CREATE_NEW_COMMENT_WITH_IMAGE'){
        const newComment=action.payload
        console.log('newComment',newComment);
        axios.post(`http://localhost:8585/api/questions/uploadQuestion`,newComment)
        .then((response)=>{
            console.log('resp.data',response.data);
            dispatch(createNewCommentWithImage(response.data))
        })
        .catch((error)=>{
            console.error('error fetching question:',error);
        })
    }

    if(action.type==='CREATE_NEW_COMMENT'){
        const newComment=action.payload
        console.log('newComment',newComment);
        axios.post(`http://localhost:8585/api/comments/createNewComment`,newComment)
        .then((response)=>{
            console.log('resp.data',response.data);
            dispatch(createNewComment(response.data))
        })
        .catch((error)=>{
            console.error('error fetching question:',error);
        })
    }

    if(action.type==='GET_COMMENT_BY_SCORE'){
        axios.get(`http://localhost:8585/api/comments/getCommentByScore/${action.payload}`)
        .then((response)=>{
            console.log('resp.data',response.data);
            dispatch(getCommentByScore(response.data))
        })
        .catch((error)=>{
            console.error('error fetching question:',error);
        })
    }

    if(action.type==='GET_COMMENT_BY_USER_ID'){
        axios.get(`http://localhost:8585/api/comments/getCommentByUserId/${action.payload}`)
        .then((response)=>{
            console.log('resp.data',response.data);
            dispatch(getCommentByUserId(response.data))
        })
        .catch((error)=>{
            console.error('error fetching question:',error);
        })
    }




    return next(action)

}