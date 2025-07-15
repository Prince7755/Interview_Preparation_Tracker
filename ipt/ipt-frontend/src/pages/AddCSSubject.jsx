import React, {useState} from 'react';
import { Container, Typography, TextField, Button, MenuItem, Box} from '@mui/material';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../context/SnackbarContext';

function AddCSSubject(){
    const [form, setForm] = useState({
        subject: '',
        topic: '',
        notes: '',
        status:'Needs Revision'
    });

    const navigate = useNavigate();
    const {showSnackbar} = useSnackbar();

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/cssubjects', form);
            showSnackbar('Topic added successfully', 'success');
            navigate('/csfundamentals');
        }catch(err){
            showSnackbar(err.response?.data?.error || 'Failed to add topic', 'error');
        }
    };

    return(
        <Container maxWidth="sm" sx={{ mt: 4, backgroundColor: '#f5f5f5', borderRadius: 2, p: 3 }}>
      <Typography variant="h4" gutterBottom>Add CS Fundamental Topic</Typography>
      <form onSubmit={handleSubmit}>
        <TextField name="subject" label="Subject" variant="outlined" fullWidth margin="normal" onChange={handleChange} select required>
          <MenuItem value="OS">OS</MenuItem>
          <MenuItem value="DBMS">DBMS</MenuItem>
          <MenuItem value="CN">CN</MenuItem>
          <MenuItem value="OOPS">OOPS</MenuItem>
          <MenuItem value="DSA Theory">DSA Theory</MenuItem>
        </TextField>

        <TextField name="topic" label="Topic" variant="outlined" fullWidth margin="normal" onChange={handleChange} required />

        <TextField name="notes" label="Notes" variant="outlined" fullWidth margin="normal" multiline rows={3} onChange={handleChange} />

        <TextField name="status" label="Status" variant="outlined" select fullWidth margin="normal" value={form.status} onChange={handleChange}>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Needs Revision">Needs Revision</MenuItem>
        </TextField>

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Add Topic
        </Button>
      </form>
    </Container>
    );
}

export default AddCSSubject;