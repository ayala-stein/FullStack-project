import{createSlice} from '@reduxjs/toolkit'

const initialState={
    listComment:[],
    listCommentsByQuestionId:[],
    listCommentByUserId:[],
    listCommentByScore:[],
}

export const commentSlice=createSlice({
    name:'comment',
    initialState,
    reducers:{
        getAllComments:(state,action)=>{
            state.listComment=(action.payload)
        },
        getCommentByQuestionId:(state,action)=>{
            state.listCommentsByQuestionId=(action.payload)
        },
        getCommentByUserId:(state,action)=>{
            state.listCommentByUserId=(action.payload)
        },
        getCommentByScore:(state,action)=>{
            state.listCommentByScore=(action.payload)
        },
        createNewComment:(state,action)=>{
            state.listComment.push(action.payload);
        // if(state.listCommentsByQuestionId==null)
        //     state.listCommentsByQuestionId=(action.payload);
        // else
            state.listCommentsByQuestionId.push(action.payload);

        },
        createNewCommentWithImage:(state,action)=>{
            state.listComment.push(action.payload);
        }

    }
})

export const{getCommentByQuestionId,getAllComments,createNewCommentWithImage,createNewComment,getCommentByScore,getCommentByUserId} =commentSlice.actions;
export default commentSlice.reducer;