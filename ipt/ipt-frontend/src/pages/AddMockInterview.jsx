import React, { useState } from 'react';
import {
  Container, Typography, TextField, Button, Box, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../context/SnackbarContext';

function AddMockInterview() {
  const [form, setForm] = useState({
    date: '',
    roundType: '',
    company: '',
    feedback: '',
    rating: ''
  });
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/mockinterviews', form);
      showSnackbar('Mock interview added successfully', 'success');
      navigate('/mockinterviews');
    } catch (err) {
      showSnackbar(err.response?.data?.error || "Failed to add mock interview", 'error');
    }
  };

  const roundTypes = ['Coding', 'Technical', 'System Design', 'Behavioral/HR', 'Managerial', 'Telephonic', 'OA', 'GD', 'Case Study'];

  return (
    <Container maxWidth="sm" sx={{ mt: 4, backgroundColor: '#f5f5f5' , borderRadius: 2, p: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #7209b7, #f72585)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Add Mock Interview
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          name="date"
          label="Date"
          variant="outlined"
          fullWidth
          required
          value={form.date}
          onChange={handleChange}
        />
        <FormControl fullWidth>
          <InputLabel>Round Type</InputLabel>
          <Select
            name="roundType"
            label="Round Type"
            value={form.roundType}
            onChange={handleChange}
            required
          >
            {roundTypes.map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          name="company"
          label="Company"
          variant="outlined"
          fullWidth
          required
          value={form.company}
          onChange={handleChange}
        />
        <TextField
          name="feedback"
          label="Feedback"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={form.feedback}
          onChange={handleChange}
        />
        <TextField
          name="rating"
          label="Rating (1-5)"
          variant="outlined"
          fullWidth
          value={form.rating}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="secondary">
          Add Mock Interview
        </Button>
      </Box>
    </Container>
  );
}

export default AddMockInterview;
