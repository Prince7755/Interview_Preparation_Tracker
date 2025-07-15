import React, { useEffect, useState, useContext } from 'react';
import { Container, Typography, Card, CardContent, Grid, Button, Select, MenuItem, FormControl, InputLabel, Box, TextField, CircularProgress, Chip, Stack } from '@mui/material';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useSnackbar } from '../context/SnackbarContext';
import SchoolIcon from '@mui/icons-material/School';
import NotesIcon from '@mui/icons-material/Notes';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function CSFundamentalsPage() {
  const [topics, setTopics] = useState([]);
  const [subjectFilter, setSubjectFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);

  const fetchTopics = async () => {
    if (!isLoggedIn) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await API.get('/cssubjects');
      setTopics(res.data);
    } catch (err) {
      console.error(err);
      showSnackbar(err.response?.data?.error || "Failed to load topics", 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, [isLoggedIn]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this topic?")) return;
    try {
      await API.delete(`/cssubjects/${id}`);
      setTopics(topics.filter((t) => t._id !== id));
      showSnackbar('Deleted successfully', 'success');
    } catch (err) {
      showSnackbar(err.response?.data?.error || "Failed to delete topic", 'error');
    }
  };

  const filteredTopics = topics.filter(t =>
    (subjectFilter ? t.subject === subjectFilter : true) &&
    (statusFilter ? t.status === statusFilter : true) &&
    (searchQuery ? t.topic.toLowerCase().includes(searchQuery.toLowerCase()) : true)
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        fontWeight="bold"
        textAlign="center"
        sx={{
          background: 'linear-gradient(45deg, #6a11cb, #2575fc)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        CS Fundamentals Tracker
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3, justifyContent: 'center' }}>
        <TextField
          label="Search by Topic"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: 250 }}
        />

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Subject</InputLabel>
          <Select
            value={subjectFilter}
            label="Subject"
            onChange={(e) => setSubjectFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="OS">OS</MenuItem>
            <MenuItem value="DBMS">DBMS</MenuItem>
            <MenuItem value="CN">CN</MenuItem>
            <MenuItem value="OOPS">OOPS</MenuItem>
            <MenuItem value="DSA Theory">DSA Theory</MenuItem>
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
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Needs Revision">Needs Revision</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" onClick={() => navigate('/addcs')} sx={{ height: 55 }}>
          + Add Topic
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : filteredTopics.length === 0 ? (
        <Typography variant="h6" textAlign="center">No topics found</Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredTopics.map((topic) => (
            <Grid key={topic._id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  backgroundColor: '#f5f5f5',
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <CardContent>
                  <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                    <SchoolIcon color="primary" />
                    <Typography variant="h6" fontWeight="bold">{topic.subject}</Typography>
                  </Stack>

                  <Typography variant="subtitle1" gutterBottom>{topic.topic}</Typography>

                  <Stack direction="row" spacing={1} mb={1}>
                    <NotesIcon fontSize="small" />
                    <Typography variant="body2">{topic.notes || "No notes added"}</Typography>
                  </Stack>

                  <Chip
                    icon={<CheckCircleIcon />}
                    label={topic.status}
                    color={topic.status === "Completed" ? "success" : "warning"}
                    sx={{ mb: 1 }}
                  />

                  <Box>
                    <Button variant="contained" size="small" color="primary" onClick={() => navigate(`/editcs/${topic._id}`)} sx={{ mr: 1 }}>
                      Edit
                    </Button>
                    <Button variant="outlined" size="small" color="error" onClick={() => handleDelete(topic._id)}>
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

export default CSFundamentalsPage;
