import{createSlice} from '@reduxjs/toolkit'

const initialState={
    listQuestions:[],
    listQuestionsByCategory:[],
    questionById:[],
    listQuestionsByUserId:[],
}

export const questionSlice=createSlice({
    name:'question',
    initialState,
    reducers:{
        getQuestions:(state,action)=>{
            state.listQuestions=(action.payload);
        },
        addQuestion:(state,action)=>{
            state.listQuestions.push(action.payload);
        // if(state.listQuestionsByCategory==null)
        //     state.listQuestionsByCategory=(action.payload)
        // else
            state.listQuestionsByCategory.push(action.payload)
        },
        addQuestionWithImage:(state,action)=>{
            state.listQuestions.push(action.payload);
            state.listQuestionsByCategory.push(action.payload)
        },
        getQuestionsByCategory:(state,action)=>{
            state.listQuestionsByCategory=(action.payload)
        },
        getQuestionById:(state,action)=>{
            state.questionById=(action.payload)
        },
        getQuestionByUserId:(state,action)=>{
            state.listQuestionsByUserId=(action.payload)
        },


    },
})

export const{getQuestions,addQuestion,getQuestionsByCategory,getQuestionByUserId,getQuestionById,addQuestionWithImage} =questionSlice.actions;
export default questionSlice.reducer;