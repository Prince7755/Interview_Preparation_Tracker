import React, {useEffect, useState} from 'react';
import {Container, Typography, TextField, Button, MenuItem, CircularProgress} from '@mui/material';
import API from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar  } from '../context/SnackbarContext';

function EditQuestion(){
    const { id }  = useParams();
    const navigate = useNavigate();
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

    const [loading, setLoading] = useState(true);

    const { showSnackbar } = useSnackbar();


    useEffect(() => {
        const fetchQuestion = async () =>{
            try{
            const res = await API.get(`/questions/${id}`);
            setForm(res.data);
        }catch(err){
            console.error(err);
            setForm(null);
        }finally{
            setLoading(false);
        }
        };
        fetchQuestion();
    }, [id]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await API.put(`/questions/${id}`, form);
            showSnackbar('Question updated successfully', 'success');
            navigate('/dsa');
        }catch(err){
            showSnackbar(err.response?.data?.message || "Update failed", 'error');
        }
    };

    const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    };

    if (loading) return <Container sx={{ mt: 4 }}><CircularProgress /></Container>;
    if(!form) return <div>Question not found.</div>

     return (
    <Container maxWidth="sm" sx={{ mt: 4,backgroundColor: '#f5f5f5', borderRadius: 2, p: 3 }}>
      <Typography variant="h4" gutterBottom>Edit Question</Typography>
      <form onSubmit={handleSubmit}>
        <TextField name="title" label="Title" variant="outlined" fullWidth margin="normal" value={form.title} onChange={handleChange} required />
        <TextField name="platform" label="Platform" variant="outlined" fullWidth margin="normal" value={form.platform} onChange={handleChange} required />
        <TextField name="difficulty" label="Difficulty" variant="outlined" fullWidth margin="normal" value={form.difficulty} onChange={handleChange} required />
        <TextField name="company" label="Company" variant="outlined" fullWidth margin="normal" value={form.company} onChange={handleChange} />
        <TextField name="topic" label="Topic" variant="outlined" fullWidth margin="normal" value={form.topic} onChange={handleChange} required/>
        <TextField name="timeTaken" label="Time Taken (minutes)" type="number" variant="outlined" fullWidth margin="normal" value={form.timeTaken} onChange={handleChange}/>
                <TextField name="status" label="Status" variant="outlined" select fullWidth margin="normal"  value={form.status}  onChange={handleChange}>
                <MenuItem value="Solved">Solved</MenuItem>
                <MenuItem value="Needs Revision">Needs Revision</MenuItem>
                <MenuItem value="Revised">Revised</MenuItem>
                 </TextField>
        <TextField name="notes" label="Notes" variant="outlined" fullWidth margin="normal" value={form.notes} onChange={handleChange} multiline rows={3} />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Update Question
        </Button>
      </form>
    </Container>
  );
}

export default EditQuestion;