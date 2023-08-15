import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import React from 'react';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

type SnackbarSuccessProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    autoHideDuration?: number;
    type?: "success" | "error" | "warning" | "info";
    message?: string;
} 

export default function SnackbarCustom({ open, setOpen, autoHideDuration, type, message }: SnackbarSuccessProps) {
      const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    return (<Stack>
            <Snackbar open={open} autoHideDuration={autoHideDuration ? autoHideDuration : 3000 } onClose={handleClose}>
                <Alert  onClose={handleClose} severity={type ? type : "success" } sx={{ width: '100%', fontSize: 13 }}>
                    {message ? message : "Operação realizada com sucesso!"}
                </Alert>
            </Snackbar>
        </Stack>)
}