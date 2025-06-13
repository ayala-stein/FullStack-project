import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react';
import './Questions.css'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BasicQuestion from './basicQuestion'

export default function PrivateArea() {

  const userQuestions=useSelector((state)=>state.question.listQuestionsByUserId)
  const user=useSelector((state)=>state.user.userByMail)
  const [stop,setStop]=useState(true);

  const check=()=>{
    if(stop){
      dispatch({type:'GET_QUESTIONS_BY_USER_ID',payload:user.id})
    }

  }

  const dispatch=useDispatch();
  

  useEffect(()=>{
    if(user!=null){
    setStop(false);
    check();
    }
  })
  return (
    <>
        {userQuestions ?(userQuestions.map((item, index)=>
    <BasicQuestion question={item} key={index} ></BasicQuestion>
    )):(
      <Typography variant="h4" style={{ textAlign: "center" }}>
            לא העלת  עדיין שאלות </Typography>
     )}

    </>
  )
}
