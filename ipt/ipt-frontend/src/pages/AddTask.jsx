import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, MenuItem} from '@mui/material';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../context/SnackbarContext';

function AddTask() {
    const [form, setForm] = useState({date: '', task: '', status: 'pending'});
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await API.post('/planner', form);
            showSnackbar('Task added successfully', 'success');
            navigate('/planner');
        }catch(err){
            showSnackbar(err.response?.data?.error || 'Failed to add task', 'error');
        }
    };

    return(
        <Container maxWidth="sm" sx={{ mt: 4, backgroundColor: '#f5f5f5' , borderRadius: 2, p: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #ffb703, #fb8500)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Add New Task
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          name="date"
          label="Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          required
          value={form.date}
          onChange={handleChange}
        />
        <TextField
          name="task"
          label="Task Description"
          variant="outlined"
          fullWidth
          required
          value={form.task}
          onChange={handleChange}
        />
        <TextField
          select
          name="status"
          label="Status"
          variant="outlined"
          fullWidth
          value={form.status}
          onChange={handleChange}
        >
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </TextField>
        <Button type="submit" variant="contained" color="primary">
          Add Task
        </Button>
      </Box>
    </Container>
    );
}

export default AddTask;