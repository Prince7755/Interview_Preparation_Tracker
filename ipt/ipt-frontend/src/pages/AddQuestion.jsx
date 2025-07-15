import React, {useState} from 'react';
import {Container, Typography, TextField, Button, Box, MenuItem} from '@mui/material';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../context/SnackbarContext';

function AddQuestion(){
    const [form, setForm] = useState({
        title: '',
        platform: '',
        difficulty: '',
        company: '',
        topic:'',
        notes: '',
        status: 'Solved',
        timeTaken: 0
    });

    const navigate = useNavigate();
    const { showSnackbar }  = useSnackbar();

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await API.post('/questions', form);
            showSnackbar('Question added', 'success');
            navigate('/dsa');
        }catch(err){
            showSnackbar(err.response?.data?.message || 'Failed to add the question', 'error');
        }
    };

    return(
        <Container maxWidth="sm" sx={{ mt:4, backgroundColor: '#f5f5f5', borderRadius: 2, p: 3 }} >
            <Typography variant='h4' gutterBottom>Add New Question</Typography>
            <form onSubmit={handleSubmit}>
                <TextField name="title" label="Title" variant="outlined" fullWidth margin="normal" onChange={handleChange} required />
                <TextField name="platform" label="Platform" variant="outlined" fullWidth margin="normal" onChange={handleChange} required />
                <TextField name="difficulty" label="Difficulty" variant="outlined" fullWidth margin="normal" onChange={handleChange} required />
                <TextField name="company" label="Company" variant="outlined" fullWidth margin="normal" onChange={handleChange} />
                <TextField name="topic" label="Topic" variant="outlined" fullWidth margin="normal" value={form.topic} onChange={handleChange} required/>
                <TextField name="timeTaken" label="Time Taken (minutes)" type="number" variant="outlined" fullWidth margin="normal" value={form.timeTaken} onChange={handleChange}/>
                <TextField name="status" label="Status" variant="outlined" select fullWidth margin="normal"  value={form.status}  onChange={handleChange}>
                <MenuItem value="Solved">Solved</MenuItem>
                <MenuItem value="Needs Revision">Needs Revision</MenuItem>
                <MenuItem value="Revised">Revised</MenuItem>
                 </TextField>
                <TextField name="notes" label="Notes" variant="outlined" fullWidth margin="normal" onChange={handleChange} multiline rows={3} />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                      Add Question
                </Button>
            </form>
        </Container>
    );
}

export default AddQuestion;