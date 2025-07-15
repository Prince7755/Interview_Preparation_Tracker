import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Grid, Card, CardContent, Button,
  TextField, Box, Divider, MenuItem
} from '@mui/material';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../context/SnackbarContext';

function PlannerPage() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get('/planner');
        setTasks(res.data);
      } catch (err) {
        showSnackbar(err.response?.data?.error || 'Failed to load tasks', 'error');
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await API.delete(`/planner/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
      showSnackbar('Deleted successfully', 'success');
    } catch (err) {
      showSnackbar(err.response?.data?.error || "Failed to delete", 'error');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const res = await API.put(`/planner/${id}`, { status });
      setTasks(tasks.map(t => t._id === id ? res.data : t));
      showSnackbar('Status updated', 'success');
    } catch (err) {
      showSnackbar(err.response?.data?.error || "Failed to update status", 'error');
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'All') return true;
    return task.status === filter;
  });

  return (
    <Container sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #8338ec, #3a86ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Daily / Weekly Planner
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button variant="contained" onClick={() => navigate('/addtask')}>
          + Add New Task
        </Button>

        <TextField
          select
          label="Filter by Status"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{ width: 200 }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </TextField>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={3}>
        {filteredTasks.map(task => (
          <Grid item xs={12} md={6} lg={4} key={task._id}>
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
                <Typography variant="h6" gutterBottom sx={{ color: '#8338ec' }}>
                  {task.task}
                </Typography>
                <Typography variant="body2">
                  <strong>Date:</strong> {task.date}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Status:</strong> {task.status}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      handleStatusChange(task._id, task.status === 'Completed' ? 'Pending' : 'Completed')
                    }
                  >
                    Mark {task.status === 'Completed' ? 'Pending' : 'Completed'}
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={() => navigate(`/edittask/${task._id}`)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(task._id)}
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

export default PlannerPage;
