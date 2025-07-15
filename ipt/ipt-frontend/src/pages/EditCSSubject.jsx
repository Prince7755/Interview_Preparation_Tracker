import React, {useState, useEffect} from 'react';
import { Container, Typography, TextField, Button, MenuItem } from '@mui/material';
import API from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from '../context/SnackbarContext';

function EditCSSubject(){
    const [form, setForm] = useState({
        subject: '',
        topic: '',
        notes: '',
        status: ''
    });

    const navigate = useNavigate();
    const { id } = useParams();
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        const fetchTopic = async () => {
            try{
                const res = await API.get(`/cssubjects/${id}`);
                setForm(res.data);
            }catch(err){
                showSnackbar(err.response?.data?.error || 'Failed to load topic', 'error');
            }
        };
        fetchTopic();
    }, [id, showSnackbar]);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            await API.put(`/cssubjects/${id}`, form);
            showSnackbar('Topic updated successfully', 'success');
            navigate('/csfundamentals');
        }catch(err){
            showSnackbar(err.response?.data?.error || 'Failed to update topic', 'error');
        }
    };

    return(
        <Container maxWidth="sm" sx={{ mt: 4, backgroundColor: '#f5f5f5', borderRadius: 2, p: 3 }}>
      <Typography variant="h4" gutterBottom>Edit CS Fundamental Topic</Typography>
      <form onSubmit={handleSubmit}>
        <TextField name="subject" label="Subject" variant="outlined" fullWidth margin="normal" value={form.subject} onChange={handleChange} select required>
          <MenuItem value="OS">OS</MenuItem>
          <MenuItem value="DBMS">DBMS</MenuItem>
          <MenuItem value="CN">CN</MenuItem>
          <MenuItem value="OOPS">OOPS</MenuItem>
          <MenuItem value="DSA Theory">DSA Theory</MenuItem>
        </TextField>

        <TextField name="topic" label="Topic" variant="outlined" fullWidth margin="normal" value={form.topic} onChange={handleChange} required />

        <TextField name="notes" label="Notes" variant="outlined" fullWidth margin="normal" multiline rows={3} value={form.notes} onChange={handleChange} />

        <TextField name="status" label="Status" variant="outlined" select fullWidth margin="normal" value={form.status} onChange={handleChange}>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Needs Revision">Needs Revision</MenuItem>
        </TextField>

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Update Topic
        </Button>
      </form>
    </Container>
    );
}

export default EditCSSubject;