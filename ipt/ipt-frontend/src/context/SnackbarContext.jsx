import React, {createContext, useState, useContext} from 'react';
import { Snackbar, Alert } from '@mui/material';

const SnackbarContext = createContext();

export function SnackbarProvider({children}){
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'info',
    });

    const showSnackbar = (message, severity = 'info') => {
        setSnackbar({open: true, message, severity});
    };

    const handleClose = () => {
        setSnackbar({...snackbar, open: false});
    };

    return(
        <SnackbarContext.Provider value={{showSnackbar}}>
            {children}
            <Snackbar
            open={snackbar.open}
            autoHideDuration={4000}
            onClose={handleClose}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            >
                <Alert onClose={handleClose} severity={snackbar.severity} sx={{width: '100%'}}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
}

export const useSnackbar = () => useContext(SnackbarContext);