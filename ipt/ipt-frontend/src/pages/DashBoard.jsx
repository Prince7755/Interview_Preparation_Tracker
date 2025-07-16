import React, { useEffect, useState, useContext } from 'react';
import {
  Container, Typography, Grid, Card, CardActionArea, CardContent, Box, Avatar, Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CodeIcon from '@mui/icons-material/Code';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import SchoolIcon from '@mui/icons-material/School';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import API from '../services/api';
import { useSnackbar } from '../context/SnackbarContext';
import { AuthContext } from '../context/AuthContext';

function DashBoard() {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const { user } = useContext(AuthContext);

  const [summary, setSummary] = useState({
    dsa: 0,
    projects: 0,
    behavioral: 0,
    mocks: 0,
    planner: 0,
  });

  const [planner, setPlanner] = useState([]);
  const [lastMock, setLastMock] = useState({});
  const quotes = [
    "Success is the sum of small efforts, repeated day in and day out.",
    "Don’t watch the clock; do what it does. Keep going.",
    "The best way to get started is to quit talking and begin doing.",
    "Believe you can and you're halfway there.",
    "Hard work beats talent when talent doesn’t work hard."
  ];
  const [quoteOfTheDay, setQuoteOfTheDay] = useState('');

  useEffect(() => {
    setQuoteOfTheDay(quotes[Math.floor(Math.random() * quotes.length)]);

    const fetchData = async () => {
      try {
        const [dsaRes, projRes, behRes, mockRes, plannerRes] = await Promise.all([
          API.get('/questions'),
          API.get('/projects'),
          API.get('/behaviorals'),
          API.get('/mockinterviews'),
          API.get('/planner')
        ]);

        setSummary({
          dsa: dsaRes.data.length,
          projects: projRes.data.length,
          behavioral: behRes.data.length,
          mocks: mockRes.data.length,
          planner: plannerRes.data.length,
        });

        setPlanner(plannerRes.data.sort((a, b) => new Date(a.date) - new Date(b.date)));

        if (mockRes.data.length > 0) {
          const sortedMocks = mockRes.data.sort((a, b) => new Date(b.date) - new Date(a.date));
          setLastMock(sortedMocks[0]);
        }

      } catch (err) {
        showSnackbar('Failed to load dashboard data', 'error');
      }
    };
    fetchData();
  }, []);

  const modules = [
    { title: `DSA Tracker (${summary.dsa})`, icon: <CodeIcon />, path: '/dsa', color: '#2196f3' },
    { title: 'System Design Tracker', icon: <DesignServicesIcon />, path: '/systemdesign', color: '#4caf50' },
    { title: 'CS Fundamentals Tracker', icon: <SchoolIcon />, path: '/csfundamentals', color: '#ff9800' },
    { title: `Behavioral Questions (${summary.behavioral})`, icon: <QuestionAnswerIcon />, path: '/behaviorals', color: '#9c27b0' },
    { title: `Projects Tracker (${summary.projects})`, icon: <WorkIcon />, path: '/projects', color: '#f44336' },
    { title: `Mock Interviews (${summary.mocks})`, icon: <AssignmentIcon />, path: '/mockinterviews', color: '#3f51b5' },
    { title: `Planner Tasks (${summary.planner})`, icon: <EventNoteIcon />, path: '/planner', color: '#009688' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', py: { xs: 2, sm: 4 } }}>
      <Container maxWidth="md">

        {/* Title */}
        <Typography
          variant="h4"
          gutterBottom
          textAlign="center"
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #af6f22ff, #1d961dff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '1.8rem', sm: '2.125rem' }
          }}
        >
            Welcome, {user?.name || 'User'}!
        </Typography>

        {/* Summary Section */}
        <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <Typography variant="body1" align="center"><strong>DSA Solved:</strong> {summary.dsa}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body1" align="center"><strong>Projects Completed:</strong> {summary.projects}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body1" align="center"><strong>Mocks Attended:</strong> {summary.mocks}</Typography>
          </Grid>
        </Grid>

        {/* Modules Grid */}
        <Grid container spacing={3}>
          {modules.map((module, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  backdropFilter: 'blur(10px)',
                  background: 'rgba(255, 255, 255, 0.6)',
                  borderRadius: 4,
                  boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.2)'
                  }
                }}
              >
                <CardActionArea onClick={() => navigate(module.path)}>
                  <CardContent sx={{ textAlign: 'center', py: { xs: 2, sm: 4 } }}>
                    <Avatar sx={{ bgcolor: module.color, mx: 'auto', mb: 2, width: 56, height: 56 }}>
                      {module.icon}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                      {module.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Upcoming Tasks */}
       <Card sx={{ mt: 6, p: { xs: 2, sm: 3 } }}>
  <Typography variant="h6" gutterBottom>Upcoming Tasks</Typography>
  <Divider sx={{ mb: 2 }} />
  {planner.filter(task => 
      task.status !== 'Completed' && new Date(task.date) >= new Date()
    ).length === 0 ? (
    <Typography>No upcoming tasks.</Typography>
  ) : (
    planner
      .filter(task => task.status !== 'Completed' && new Date(task.date) >= new Date())
      .slice(0, 2)
      .map(task => (
        <Box key={task._id} sx={{ mb: 1 }}>
          <Typography>
            • <strong>{task.task}</strong> – {new Date(task.date).toLocaleDateString()}
          </Typography>
        </Box>
      ))
  )}
</Card>


        {/* Last Mock Interview */}
        <Card sx={{ mt: 4, p: { xs: 2, sm: 3 } }}>
          <Typography variant="h6" gutterBottom>Last Mock Interview Feedback</Typography>
          <Divider sx={{ mb: 2 }} />
          {lastMock.feedback ? (
            <>
              <Typography><strong>Company:</strong> {lastMock.company}</Typography>
              <Typography><strong>Round:</strong> {lastMock.roundType}</Typography>
              <Typography><strong>Feedback:</strong> {lastMock.feedback}</Typography>
              <Typography><strong>Rating:</strong> {lastMock.rating}/5</Typography>
            </>
          ) : (
            <Typography>No mock interviews attended yet.</Typography>
          )}
        </Card>

        {/* Motivational Quote */}
        <Box sx={{ mt: 6, textAlign: 'center', px: 2 }}>
          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
            "{quoteOfTheDay}"
          </Typography>
        </Box>

      </Container>
    </Box>
  );
}

export default DashBoard;
