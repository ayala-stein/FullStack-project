import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const SignIn = () => {

  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(true);
  const [finish, setFinish] = useState(0);

  const dispatchUserByMAil=useDispatch();

  const errorUserMail = useSelector((state) => state.user.errorUserByMail);

  // useEffect(() => {
  //   if(finish===1){
  //     if(errorUserMail){
  //       alert('המייל אינו קיים במערכת. נסה שוב')
  //     }
  //     else{
  //       setFinish(0)
  //       setOpen(false)
  //       nav('/')
  //     }
  //     }
  // }, [errorUserMail])

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if ( !(email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) && 
    password.length>7 )){
      alert('יש פרטים לא נכונים')
  }
  else{
    const user = {
      firstName:null,
      lastName:null,
      image:null,
      password:password,
      mail:email,
      comments:[],
      question:[]
    };
    setFinish(1)
     dispatchUserByMAil({ type: 'SIGN_IN' ,payload: user})
     if(finish===1){
      console.log(errorUserMail);
      if(errorUserMail){
        alert('המייל אינו קיים במערכת. נסה שוב')
      }
      else{
        setFinish(0)
        setOpen(false)
        nav('/')
      }
      }
  }
  
  };

  const handleCloseUp = () => {
    setOpen(false);
  };

  return (
    <div className="signin-container">
      <h1>כניסה</h1>
    <React.Fragment  >
       <Dialog open={open}>
         <DialogTitle style={{ alignSelf: 'center', }}>כניסה</DialogTitle>
         <DialogContent>
        <TextField 
          margin="dense"
          id="email"
          label="אימייל"
          type="email"
          fullWidth
          variant="standard"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          margin="dense"
          id="password"
          label="סיסמה"
          type="password"
          fullWidth
          variant="standard"
          onChange={(e) => setPassword(e.target.value)}
        />

        </DialogContent>
        <DialogActions  style={{ flexDirection: 'column', alignItems: 'center' }}>
          {/* כפתור שליחת הנתונים */}
           <Button  onClick={handleSubmit} >שליחה</Button>
          <Link to='/SignUp' onClick={()=>{handleCloseUp;}}>אין לך חשבון? הירשם כאן</Link>
          <br />
        </DialogActions>
      </Dialog>
    </React.Fragment>
    </div>
  );
};

export default SignIn;