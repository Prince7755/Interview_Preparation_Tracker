import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Grid, Card, CardContent, Button,
  TextField, Box, Divider
} from '@mui/material';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../context/SnackbarContext';

function BehavioralPage() {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get('/behaviorals');
        setQuestions(res.data);
      } catch (err) {
        showSnackbar(err.response?.data?.error || 'Failed to load behavioral questions', 'error');
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this question?")) return;
    try {
      await API.delete(`/behaviorals/${id}`);
      setQuestions(questions.filter(q => q._id !== id));
      showSnackbar('Deleted successfully', 'success');
    } catch (err) {
      showSnackbar(err.response?.data?.error || "Failed to delete", 'error');
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #0077b6, #00b4d8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Behavioral Questions
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button variant="contained" onClick={() => navigate('/addbehavioral')}>
          + Add New Question
        </Button>

        <TextField
          label="Search by question"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 250 }}
        />
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={3}>
        {questions.filter(q => q.question.toLowerCase().includes(search.toLowerCase())).map(q => (
          <Grid key={q._id} xs={12} md={6} lg={4}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
                }
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: '#0077b6' }}>
                  {q.question}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Answer:</strong> {q.answer || "Not answered yet"}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate(`/editbehavioral/${q._id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(q._id)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default BehavioralPage;
