import React ,{useState,useEffect}from 'react';
import './HomePage.css'
import {Link} from 'react-router-dom'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { CardActionArea } from '@mui/material';


const HomePage = () => {
  const images=['../src/image/gra.jpg','../src/image/allergy.jpg','../src/image/116.png','../src/image/china.jpg']
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
  
  return (
    <>
    <div className="homepage">
        <br></br>
    
       <div className="homepage">
        <div className="card-grid">

      {arr.map((item, index) =>
             <Link to={"/Questions"} key={index}  
              state={{category:item}} 
              onClick={() => getCategoriesById(item.id)}>
                    <Card sx={{height:250,width:150}} className='card' key={index}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={images[index]}
          alt="green iguana"
        />
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <br/>
          {item.name}
        </Typography>
        </CardContent>
      </CardActionArea>
    </Card></Link>)}
    </div>
      </div>

</div>
</>
  );
};

export default HomePage;

