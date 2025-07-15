import React, { useState } from 'react';
import { Container, Typography, TextField, Button, MenuItem } from '@mui/material';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../context/SnackbarContext';

function AddSystemDesign() {
  const [form, setForm] = useState({
    title: '',
    notes: '',
    status: 'Needs Revision',
  });

  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/systemdesign', form);
      showSnackbar('System Design topic added', 'success');
      navigate('/systemdesign');
    } catch (err) {
      showSnackbar(err.response?.data?.message || 'Failed to add topic', 'error');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, backgroundColor: '#f5f5f5', borderRadius: 2, p: 3  }}>
      <Typography variant="h4" gutterBottom>Add System Design Topic</Typography>
      <form onSubmit={handleSubmit}>
        <TextField name="title" label="Title" variant="outlined" fullWidth margin="normal" onChange={handleChange} required />
        <TextField name="notes" label="Notes" variant="outlined" fullWidth margin="normal" onChange={handleChange} multiline rows={3} />
        <TextField name="status" label="Status" variant="outlined" select fullWidth margin="normal" value={form.status} onChange={handleChange}>
          <MenuItem value="Practiced">Practiced</MenuItem>
          <MenuItem value="Needs Revision">Needs Revision</MenuItem>
        </TextField>
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Add Topic
        </Button>
      </form>
    </Container>
  );
}

export default AddSystemDesign;
