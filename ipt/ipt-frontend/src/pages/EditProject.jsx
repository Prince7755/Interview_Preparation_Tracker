import React, {useState, useEffect} from 'react';
import {Container, Typography, TextField, Button, Box, MenuItem} from '@mui/material';
import API from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from '../context/SnackbarContext';


function EditProject(){
    const [form, setForm] = useState({
        title: '',
        description: '',
        techStack:'',
        status: 'In Progress',
        link: ''
    });
    const { id } = useParams();
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();
    
    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await API.get(`/projects/${id}`);
                setForm(res.data);
            }catch(err){
                showSnackbar(err.response?.data?.error || 'Failed to load project', 'error');
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            await API.put(`/projects/${id}`, form);
            showSnackbar('Project updated successfully', 'success');
            navigate('/projects');
        }catch(err){
            showSnackbar(err.response?.data?.error || 'Failed to update project', 'error');
        }
    };

    return(
        <Container maxWidth="sm" sx={{ mt: 4, backgroundColor: '#f5f5f5', borderRadius: 2, p: 3  }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #06d6a0, #118ab2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Edit Project
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          name="title"
          label="Title"
          variant="outlined"
          fullWidth
          required
          value={form.title}
          onChange={handleChange}
        />
        <TextField
          name="description"
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={form.description}
          onChange={handleChange}
        />
        <TextField
          name="techStack"
          label="Tech Stack"
          variant="outlined"
          fullWidth
          value={form.techStack}
          onChange={handleChange}
        />
        <TextField name="Status" label="Status" variant="outlined" fullWidth margin="normal" value={form.status} onChange={handleChange} select required>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </TextField>
        <TextField
          name="link"
          label="Project Link (optional)"
          variant="outlined"
          fullWidth
          value={form.link}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Update Project
        </Button>
      </Box>
    </Container>
    );
}

export default EditProject;