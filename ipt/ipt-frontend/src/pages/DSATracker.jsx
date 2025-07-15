import React, { useEffect, useState, useContext } from 'react';
import {
  Container, Typography, Card, CardContent, Grid, Button, Select,
  MenuItem, FormControl, InputLabel, Box, TextField, CircularProgress, Divider
} from '@mui/material';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import Charts from '../components/Charts';
import { AuthContext } from '../context/AuthContext';
import { useSnackbar } from '../context/SnackbarContext';

function DSATracker() {
  const [questions, setQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [topicFilter, setTopicFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;
    try {
      await API.delete(`/questions/${id}`);
      setQuestions(questions.filter((q) => q._id !== id));
      showSnackbar('Deleted successfully', 'success');
    } catch (err) {
      showSnackbar(err.response?.data?.message || "Failed to delete question", 'error');
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!isLoggedIn){
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const res = await API.get('/questions');
        setQuestions(res.data);
      } catch (err) {
        console.error(err);
        showSnackbar(err.response?.data?.message || "Failed to load questions", 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [isLoggedIn]);

  const filteredQuestions = questions.filter(q => 
    (searchQuery ? q.title.toLowerCase().includes(searchQuery.toLowerCase()) : true) &&
    (topicFilter ? q.topic === topicFilter : true) &&
    (statusFilter ? q.status === statusFilter : true) && 
    (difficultyFilter ? q.difficulty === difficultyFilter : true)
  );

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
        DSA Tracker
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" onClick={() => navigate('/add')}>
          + Add New Question
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
            <TextField
              label="Search by Title"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ width: 250 }}
            />

            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Topic</InputLabel>
              <Select
                value={topicFilter}
                label="Topic"
                onChange={(e) => setTopicFilter(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {[...new Set(questions.map(q => q.topic))].map(topic => (
                  <MenuItem key={topic} value={topic}>{topic}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Status</InputLabel>
              <Select 
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Solved">Solved</MenuItem>
                <MenuItem value="Needs Revision">Needs Revision</MenuItem>
                <MenuItem value="Revised">Revised</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Difficulty</InputLabel>
              <Select
                value={difficultyFilter}
                label="Difficulty"
                onChange={(e) => setDifficultyFilter(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Easy">Easy</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Hard">Hard</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Charts data={filteredQuestions} />

          <Grid container spacing={3}>
            {filteredQuestions.map((q) => (
              <Grid item xs={12} md={6} lg={4} key={q._id}>
                <Card
                  sx={{
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
                    }
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ color: '#0077b6' }}>{q.title}</Typography>
                    <Typography variant="body2">Platform: {q.platform}</Typography>
                    <Typography variant="body2">Difficulty: {q.difficulty}</Typography>
                    <Typography variant="body2">Company: {q.company}</Typography>
                    <Typography variant="body2">Topic: {q.topic}</Typography>
                    <Typography variant="body2">Notes: {q.notes || "No notes"}</Typography>
                    <Typography variant="body2">Time Taken: {q.timeTaken} mins</Typography>
                    <Typography variant="body2">Status: {q.status}</Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                      <Button
                        variant="outlined"
                        onClick={() => navigate(`/edit/${q._id}`)}
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
        </>
      )}
    </Container>
  );
}

export default DSATracker;
