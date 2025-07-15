import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box, MenuItem, CircularProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { useSnackbar } from '../context/SnackbarContext';

function EditSystemDesign() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const [form, setForm] = useState({
    title: '',
    notes: '',
    status: 'Needs Revision',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const res = await API.get(`/systemdesign/${id}`);
        setForm({
          title: res.data.title,
          notes: res.data.notes,
          status: res.data.status,
        });
      } catch (err) {
        showSnackbar(err.response?.data?.error || 'Failed to load topic', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchTopic();
  }, [id, showSnackbar]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/systemdesign/${id}`, form);
      showSnackbar('System Design topic updated successfully', 'success');
      navigate('/systemdesign');
    } catch (err) {
      showSnackbar(err.response?.data?.error || 'Failed to update topic', 'error');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4, backgroundColor: '#f5f5f5', borderRadius: 2, p: 3 }}>
      <Typography variant="h4" gutterBottom>Edit System Design Topic</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="title"
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={form.title}
          onChange={handleChange}
          required
        />
        <TextField
          name="notes"
          label="Notes"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={form.notes}
          onChange={handleChange}
        />
        <TextField
          name="status"
          label="Status"
          variant="outlined"
          select
          fullWidth
          margin="normal"
          value={form.status}
          onChange={handleChange}
        >
          <MenuItem value="Practiced">Practiced</MenuItem>
          <MenuItem value="Needs Revision">Needs Revision</MenuItem>
        </TextField>
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Update Topic
        </Button>
      </form>
    </Container>
  );
}

export default EditSystemDesign;
