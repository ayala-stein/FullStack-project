import {configureStore} from '@reduxjs/toolkit'
import questionReducer from './reducers/questionReducer'
import {getQuestionsMidd} from './middleware/QuestionMiddleware'
import { getCommentsMidd } from './middleware/CommentMiddleware'
import { getUsersMidd } from './middleware/UserMiddleware'
import commentReducer from './reducers/commentReducer'
import UserReducer from './reducers/UserReducer'
export const store=configureStore({
    reducer:{
        question:questionReducer,
        user:UserReducer,
        comment:commentReducer,
    },
    middleware: (getDefaultMiddleware)=>[...getDefaultMiddleware({serializableCheck:false}),getQuestionsMidd,getCommentsMidd,getUsersMidd]
})

