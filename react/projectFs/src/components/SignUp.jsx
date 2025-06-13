import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from '@mui/material/TextField';

const SignUp = () => {

  const errorUserMail = useSelector((state) => state.user.errorUserByMail);

  const dispatch = useDispatch();

  const nav = useNavigate();
  const [image, setImage] = useState();
  const [open, setOpen] = useState(true);
  const [finish, setFinish] = useState(0);
  const [state,setState]=useState({
    firstName:'',
    lastName:'',
    password:"",
    mail:''
  })

  const handleForm=(event)=>{
      event.preventDefault()
      setImage(event.target.files[0])
  }

  const handleChange=(e)=>{
  const value=e.target.value
  setState({
    ...state,[e.target.name]:value
  })
 }

  const handleSubmit = (e) => {
    e.preventDefault();

   const{firstName,lastName,mail,password}=state

   const user = {
      "id":0,
      "firstName":state.firstName,
      "lastName":state.lastName,
      "password":state.password,
      "mail":state.mail,
      "comments":[],
      "question":[]
    };
    
    if(firstName.length>0 && lastName.length>0 && password.length>7 &&
      mail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
      setFinish(1)
        dispatch({type:'SIGN_UP_WITH_IMAGE', payload:{user,image}});
      for(const key in state){
        setState({
          ...state,[key]:''
        })
      }
    }
    else
    alert('אחד מהנתונים שהוכנסו שגוי. אנא נסה שנית')

  };

  useEffect(() => {
    if(finish===1){
      if(errorUserMail){
        alert('המייל אינו קיים במערכת. נסה שוב')
      }
      else{
        setFinish(0)
        setOpen(false)
        nav('/')
      }
      }
  }, [errorUserMail,finish,open])


  const handleCloseUp = () => {
    setOpen(false);
  };

  return (
    <div className="signup-container">
      <h1>Signup</h1>
    <React.Fragment>
       <Dialog open={open}>
         <DialogTitle style={{ alignSelf: 'center' }}>הרשמה</DialogTitle>
         <DialogContent>
          <input
            name="firstName"
            placeholder='שם פרטי'
            type="text"
            value={state.firstName}
            onChange={handleChange}
          />
          
          <input
            name="lastName"
            placeholder='שם משפחה'
            type="text"
            value={state.lastName}
            onChange={handleChange}
          />

          <input
            name="mail"
            placeholder=' מייל'
            type="email"
            value={state.mail}
            onChange={handleChange}      
          />

          <input
           name="password"  
           placeholder='סיסמה '           
           type="password"
           value={state.password}
           onChange={handleChange}      
          />

         <input
          name="image"
          type="file"
          placeholder="תמונת פרופיל"
          onChange={handleForm}
        />


        </DialogContent>
        <DialogActions  style={{ flexDirection: 'column', alignItems: 'center' }}>
          
          {/* כפתור שליחת הנתונים */}
           <Button  onClick={handleSubmit}  >שליחה</Button>
          <Link to='/SignIn' onClick={()=>{handleCloseUp;}}>כבר יש לך חשבון? התחבר</Link>
          <br />
        </DialogActions>
      </Dialog>
    </React.Fragment>
    </div>
  );
};

export default SignUp;


