import React,{ useEffect,useState }  from 'react'
import { Link, useNavigate, Routes, Route } from 'react-router-dom'
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import './Layout.css'
import navbar from '../image/navbar4.png'
import SignUp from './SignUp'
import Questions from './Questions'
import SignIn from './SignIn'
import HomePage from './HomePage'
import About from './About';
import PrivateArea from './PrivateArea';
import Answers from './Answers';
import { IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import{logout} from '../redux/reducers/UserReducer'
import{getQuestionByUserId} from '../redux/reducers/questionReducer'
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  }
}));


export default function Layout() {

  const user=useSelector((state)=>state.user.userByMail)

  const [arr, setArr] = useState([]);
  
  useEffect(() => {
    axios.get("http://localhost:8585/api/categories/getCategories").then((res) => {
      setArr(res.data);
    })

  }, [])

  const dispatch = useDispatch()

  const getCategoriesById = (categoryId) => {
    dispatch({ type: 'GET_QUESTIONS_BY_CATEGORY', payload: categoryId })
  }


  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    dispatch(logout(null)) 
    dispatch(getQuestionByUserId(null))
  };

  const handleCloseUserMenu2 = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <header className="header">
        <img className='header2' src={navbar} ></img>
        <div className="nav-links">
          <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant={user != null ? 'dot' : ''}>

           <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: blue[700] }} 
           src={user != null  ?`data:image/*;base64,${user.image}`:'/broken-image.jpg'} />
              </IconButton>
            <Menu
              sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'right',}}
              open={Boolean(anchorElUser)} onClose={handleCloseUserMenu} >

              <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">logout</Typography>
                </MenuItem>
                <MenuItem>
                <Link to={"/PrivateArea"} onClick={handleCloseUserMenu2}>השאלות שלי</Link>
                </MenuItem>
            </Menu>
          </StyledBadge>
          
          {/* <Link className="nav-link" to='/PrivateArea'>אזור אישי </Link> */}
          <Link className="nav-link" to='/About'>אודות </Link>
          <div className="dropdown aa">קטגוריות
            <div className="dropdown-content" >
              {arr.map((item, index) => <Link to={"/Questions"} key={index} 
              state={{category:item}} onClick={() => getCategoriesById(item.id)}>
                  {item.name}</Link>)}
            </div>
          </div>
          <Link className="nav-link" to='/'>דף הבית</Link>
          <Button className="login-button" href="./SignIn" variant="contained">כניסה</Button>
          <Button className="login-button" href="./SignUp" variant="contained">הרשמה</Button>
        </div>
      </header>


      <Routes>
        <Route path='Questions' element={<Questions/>}></Route>
        <Route path="SignIn" element={<SignIn />} />
        <Route path="SignUp" element={<SignUp />} />
        <Route path="/" element={<HomePage />} />
        <Route path="About" element={<About />} />
        <Route path="PrivateArea" element={<PrivateArea />} />
        <Route path="Answers" element={<Answers />} />
      </Routes>


      <footer className="footer">
        <p className="footer-text">
          לבריאות👨‍⚕️ דואגים לבריאות שלכם
        </p>
      </footer>
    </>
  )
}
