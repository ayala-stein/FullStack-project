import React, { useEffect, useState } from 'react';
import './Questions.css'
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import BasicQuestion from './basicQuestion'
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';


export default function Questions() {
  const location=useLocation()
  const dispatch=useDispatch()
  const QuestionsByCategory = useSelector((state) => state.question.listQuestionsByCategory)

  const getToday = () => {
  return moment().format('YYYY-MM-DD');
  };
  
  useEffect(()=>{
    if(QuestionsByCategory!=null)
      setQuestionCheck(true)
    else
      setQuestionCheck(false)
  })
  const allcategory=location.state.category

  const [isOpen, setIsOpen] = useState(false);
  const [questionCheck, setQuestionCheck] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(true);
  };
  const nav=useNavigate();
  const user = useSelector((state) => state.user.userByMail); 

  const checkUser=()=>{
    if(user==null){
      nav('/signIn')
    }
    else{
      return user.id
    }
  }

  const [question, setQuestion] = useState('');

  const handleQuestionChange = async(e) => {
    setQuestion(e.target.value);
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuestion = {
      id: 0,
      text: question,
      image:null,
      comments: [],
      dateUpload:getToday(),
      user:{id: checkUser()},
      category:allcategory
    };
      dispatch({type:'ADD_QUESTION',payload: newQuestion})
    setIsOpen(false)
  };

  return (
    <>
              <h2>שאלות</h2>
                {/* מראה את כל השאלות */}
                {/* {questionCheck &&( */}
             {QuestionsByCategory.map((item, index) =>
                <BasicQuestion question={item} key={index}/>                
                 )}
                

{/* כפתור הוספה */}
{!isOpen && (
      <Fab color="primary" aria-label="outlined" onClick={handleButtonClick}>
        <AddIcon />
      </Fab>
)}

{/* שאילתה שלפיה הוספת שאלה נפתחת או נסגרת */}
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
       <h1>Ask a Question</h1>
      <form >
        <textarea value={question} onChange={handleQuestionChange} placeholder="Type your question here..."
          rows="9" cols="50"></textarea>
        <br />
        <Button onClick={handleSubmit}>הוספה</Button>
      </form>
          </div>
        </div>
      )}
    </>
  );
}











