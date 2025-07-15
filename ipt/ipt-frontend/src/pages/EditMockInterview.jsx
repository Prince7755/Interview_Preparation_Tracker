import React, { useState, useEffect } from 'react';
import {
  Container, Typography, TextField, Button, Box, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import API from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from '../context/SnackbarContext';

function EditMockInterview() {
  const [form, setForm] = useState({
    date: '',
    roundType: '',
    company: '',
    feedback: '',
    rating: ''
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get(`/mockinterviews/${id}`);
        setForm(res.data);
      } catch (err) {
        showSnackbar(err.response?.data?.error || "Failed to load mock interview", 'error');
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/mockinterviews/${id}`, form);
      showSnackbar('Mock interview updated successfully', 'success');
      navigate('/mockinterviews');
    } catch (err) {
      showSnackbar(err.response?.data?.error || "Failed to update mock interview", 'error');
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
          background: 'linear-gradient(45deg, #4361ee, #7209b7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Edit Mock Interview
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
          Update Mock Interview
        </Button>
      </Box>
    </Container>
  );
}

export default EditMockInterview;
