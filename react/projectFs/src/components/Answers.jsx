import React, { useEffect, useState } from 'react';
import './Questions.css'
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';


export default function Answers() {

  const location=useLocation()

  const question=location.state.questionText
  const allquestion=location.state.questionId

  const [answer, setAnswer] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [commentCheck, setCommentCheck] = useState(false);

  const dispatch=useDispatch()
  const dispatchComments=useDispatch()

  const nav=useNavigate();
  

  const user = useSelector((state) => state.user.userByMail);
  const commentList=useSelector((state)=>state.comment.listCommentsByQuestionId) 

  const getToday = () => {
  return moment().format('YYYY-MM-DD');
  };

  useEffect(() => {
    dispatchComments({ type: 'GET_COMMENT_BY_QUESTION_ID', payload: allquestion.id})
    if(commentList!=null){
      setCommentCheck(true)
    }
  }, [])

  
  const handleButtonClick = () => {
    setIsOpen(true);
  };

  const checkUser=()=>{
    if(user==null){
      nav('/signIn')
    }
    else{
      return user.id
    }
  }

  const handleQuestionChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newComment = {
      id: 0,
      text: answer,
      image:null,
      date:getToday(),
      user:{id:checkUser()},
      score:0,
      question:allquestion
    };
     console.log(newComment);
    
    dispatch({type:'CREATE_NEW_COMMENT',payload: newComment})
    setIsOpen(false)
  };

return(
    <>
    <Card sx={{ width:700,height:150}} className="card" style={{marginLeft:100}}>
      <CardHeader
         avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {allquestion.user.firstName[0]}</Avatar>}/>
      <CardContent>
        <Typography variant="body2" color="text.secondary" style={{direction:'rtl'}}>
          {question}</Typography>
      </CardContent>
    </Card>
   
    <h3><div>תשובות</div></h3>
     {/* {commentCheck && ( */}
     { commentList.map((item, index) => (
        <Card
          sx={{ width: 700, height: 150 }}
          key={index}
          className="card"
          style={{ marginLeft: 100 }}
        >
          <CardHeader
            avatar={
              <Avatar
                sx={{ bgcolor: red[500] }}
                aria-label="recipe"
              >
                {item.user.firstName[0]}
              </Avatar>
            }
          />

          <CardContent>
            <Typography variant="body2" color="text.secondary" style={{ direction: "rtl" }}>
              {item.text}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>

          </CardActions>
        </Card>
      ))}
    {/* )}  */}
    {/* {!commentCheck && (
      <Typography variant="h4" style={{ textAlign: "center" }}>
        עדיין לא השיבו לשאלה זו
      </Typography>
    )} */}

    {/* כפתור הוספה */}
    {!isOpen &&(
    <Fab color="primary" aria-label="outlined" onClick={handleButtonClick}>
        <AddIcon />
      </Fab>)}

{/* שאילתה שלפיה הוספת שאלה נפתחת או נסגרת */}
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <h1>Add a Comment</h1>
          <form >
           <textarea value={answer} onChange={handleQuestionChange} placeholder="Type your comment here..."
              rows="9" cols="50"></textarea>
            <br />
           <Button onClick={handleSubmit}>הוספה</Button>
          </form>
        </div>
       </div>
      )}
    </>
)
}











