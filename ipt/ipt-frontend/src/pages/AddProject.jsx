import React, {useState} from 'react';
import { Container, Typography, TextField, Button, Box, MenuItem} from '@mui/material';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../context/SnackbarContext';

function AddProject(){
    const [form, setForm] = useState({
        title: '',
        description: '',
        techStack: '',
        status: 'In Progress',
        link: ''
    });

    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await API.post('/projects', form);
            showSnackbar('Project added successfully', 'success');
            navigate('/projects');
        }catch(err){
            showSnackbar(err.response?.data?.error || "Failed to add project", 'error');
        }
    };

    return(
        <Container maxWidth="sm" sx={{ mt: 4, backgroundColor: '#f5f5f5', borderRadius: 2, p: 3  }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #00b4d8, #48cae4)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Add New Project
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
          Add Project
        </Button>
      </Box>
    </Container>
    );
}

export default AddProject;