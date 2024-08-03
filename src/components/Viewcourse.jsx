import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Viewcourse = () => {
  return (
    <div><Card sx={{ maxWidth: 345 }}>
    <CardMedia
      sx={{ height: 140 }}
      image="https://techiecub.com/wp-content/uploads/2021/02/AI-1.png"
      title="AI"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
      Artificial Intelligence
      </Typography>
      <Typography variant="body2" color="text.secondary">
      Artificial Intelligence (AI) refers to the capability of a digital computer or computer-controlled robot to perform tasks commonly associated with intelligent beings.
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Share</Button>
      <Button size="small">Learn More</Button>
    </CardActions>
  </Card></div>
  )
}

export default Viewcourse