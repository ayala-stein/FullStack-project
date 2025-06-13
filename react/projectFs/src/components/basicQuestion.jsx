import * as React from 'react';
import {useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import navbar from '../image/ab.jpg'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Answers from './Answers';
import PhotoSizeSelectActualSharpIcon from '@mui/icons-material/PhotoSizeSelectActualSharp';
import { useState } from 'react';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


export default function BasicQuestion({question}) {
  const [image, setImage] = useState(false);
 const user=useSelector((state)=>state.user.userByMail)
  const[src,setSrc]=useState(navbar)

  const handleExpandClickImage = () => {
    setImage(!image);
  };
//  const letter=question.user.firstName[0]

  return (
    <>
   
     <Card sx={{ width:800}} style={{zIndex:-4,marginLeft:100}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" >
           {/* {letter} */}
          </Avatar>
        }
      />
<Link to={'/Answers'}  state={{questionText:question.text,questionId:question}}>
      <CardContent>
        <Typography variant="body2" color="text.secondary" style={{direction:'rtl'}}>
           {question.text}
           
        </Typography>
      </CardContent> 
     </Link>
      {/* <CardActions disableSpacing>

        <ExpandMore
          expand={image}
          onClick={handleExpandClickImage}
          aria-expanded={image}
          aria-label="show more"
        >
          <PhotoSizeSelectActualSharpIcon></PhotoSizeSelectActualSharpIcon>
        </ExpandMore>

      </CardActions> */}
      <Collapse in={image} timeout="auto" unmountOnExit>
        <CardContent>
        <CardMedia
        sx={{ height: 140 }}
        image={`data:image/*;base64,${question.image}`}
        title="green iguana"
        
      />
        </CardContent>
      </Collapse>
    </Card>
</>
  );
}
