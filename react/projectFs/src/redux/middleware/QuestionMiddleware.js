import axios from "axios";
import { getQuestions,getQuestionsByCategory,getQuestionByUserId,getQuestionById,addQuestionWithImage,addQuestion } from "../reducers/questionReducer";
 
export const getQuestionsMidd=({dispatch,getState})=>next=>action=>{
    if(action.type==='GET_QUESTIONS'){
        axios.get('http://localhost:8585/api/questions/getAllQuestions')
        .then((response)=>{
            console.log('resp.data',response.data);
            dispatch(getQuestions(response.data))
        })
        .catch((error)=>{
            console.error('error fetching question:',error);
        })
    }


    if(action.type==='GET_QUESTIONS_BY_CATEGORY'){
        axios.get(`http://localhost:8585/api/questions/getQuestionByCategoryId/${action.payload}`)
        .then((response)=>{
            console.log('resp.data',response.data);
            dispatch(getQuestionsByCategory(response.data))
        })
        .catch((error)=>{
            console.error('error fetching question:',error);
            // dispatch(getQuestionsByCategory(null))
        })
    }

    if(action.type==='GET_QUESTIONS_BY_ID'){
        axios.get(`http://localhost:8585/api/questions/get/${action.payload}`)
        .then((response)=>{
            console.log('resp.data',response.data);
            dispatch(getQuestionById(response.data))
        })
        .catch((error)=>{
            console.error('error fetching question:',error);
        })
    }

    if(action.type==='GET_QUESTIONS_BY_USER_ID'){
        axios.get(`http://localhost:8585/api/questions/getQuestionByUserId/${action.payload}`)
        .then((response)=>{
            console.log('resp.data',response.data);
            dispatch(getQuestionByUserId(response.data))
        })
        .catch((error)=>{
            console.error('error fetching question:',error);
            // dispatch(getQuestionByUserId(null))
        })
    }
    if(action.type==='ADD_QUESTION_WITH_IMAGE'){
        const {question,image}=action.payload
        const formData=new FormData()
        formData.append('image',image)
        formData.append('question',new Blob([JSON.stringify(question)],{type:'application/json'}))
        axios.post(`http://localhost:8585/api/questions/uploadQuestion`,formData)
        .then((response)=>{
            console.log('resp.data',response.data);
            dispatch(addQuestionWithImage(response.data))
        })
        .catch((error)=>{
            console.error('error fetching question:',error);
        })
    }




    if(action.type==='ADD_QUESTION'){
        const newQuestion=action.payload
        console.log('newQuestion',newQuestion);
        axios.post("http://localhost:8585/api/questions/createQuestion",newQuestion)
        .then((response)=>{
            console.log('resp.data',response.data);
            dispatch(addQuestion({...response.data}))
        })
        .catch((error)=>{
            console.error('error fetching question:',error);
        })
    }


    return next(action)
}