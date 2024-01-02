
import * as React from 'react';

import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';





import "../anim.css"
import { Group } from '@mui/icons-material';


const Spin = () => {

  const [questions,setQuestions] = React.useState([])

  return(


      <Box className = "circle" sx = {{display:"flex", justifyContent:"center"}}>
        <Typography className = "circle-inner" sx = {{display:"flex", justifyContent:"center"}}>

        </Typography>
      </Box>


  )
}
  export default Spin;