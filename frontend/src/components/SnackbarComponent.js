import * as React from 'react';
import Snackbar from "@mui/material/Snackbar";
import { Stack } from '@mui/joy';
import Alert from '@mui/material/Alert';


function SnackbarComponent({handleClose, open}) {

return(
    <Stack spacing={2} sx={{ width: '100%' }}>
    <Snackbar anchorOrigin={{horizontal:'right', vertical:'top'}} open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        You have new message!
      </Alert>
    </Snackbar>
    </Stack>
)
 
}
export default SnackbarComponent;
