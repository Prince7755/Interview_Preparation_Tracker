import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Grid, Button, Box, CircularProgress, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { useSnackbar } from '../context/SnackbarContext';

function SystemDesignPage() {
  const [topics, setTopics] = useState([]);
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchTopics = async () => {
    setLoading(true);
    try {
      const res = await API.get('/systemdesign');
      setTopics(res.data);
    } catch (err) {
      showSnackbar(err.response?.data?.message || "Failed to load topics", 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this topic?')) return;
    try {
      await API.delete(`/systemdesign/${id}`);
      setTopics(topics.filter(t => t._id !== id));
      showSnackbar('Topic deleted', 'success');
    } catch (err) {
      showSnackbar(err.response?.data?.message || "Failed to delete topic", 'error');
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #ee0979, #ff6a00)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        System Design Tracker
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={() => navigate('/systemdesign/add')}>
          + Add New System Design Topic
        </Button>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : topics.length === 0 ? (
        <Typography variant="h6" textAlign="center">No topics found</Typography>
      ) : (
        <Grid container spacing={3}>
          {topics.map((topic) => (
            <Grid key={topic._id} xs={12} md={6} lg={4}>
              <Card
                sx={{
                  height: '100%',
                  backgroundColor: '#f5f5f5',
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ color: '#ee0979' }}>
                    {topic.title}
                  </Typography>

                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Notes:</strong> {topic.notes || "No notes added"}
                  </Typography>

                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Status:</strong> {topic.status}
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                      variant="outlined"
                      onClick={() => navigate(`/editsystemdesign/${topic._id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(topic._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default SystemDesignPage;
