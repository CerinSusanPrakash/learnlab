import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const Signup = () => {
  return (
    <div><Box
    component="form"
    sx={{
      '& > :not(style)': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >
    
    
    <div>
    <TextField id="outlined-basic" label="Name" variant="outlined" />
    </div>
    <div>
    <TextField id="filled-basic" label="emal id" variant="outlined" />
    </div>
    <div>
    <TextField id="standard-basic" label="Phone Number" variant="outlined" />
    </div>
    <div>
    <TextField id="standard-basic" label="Password" variant="outlined" />
    </div>
    <div>
    <TextField id="standard-basic" label="Address" variant="outlined" />
    </div>
    
    
  </Box></div>
  )
}

export default Signup