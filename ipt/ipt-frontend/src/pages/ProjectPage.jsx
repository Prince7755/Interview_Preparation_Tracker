import React, {useEffect, useState} from 'react';
import{
    Container, Typography, Grid, Card, CardContent, Button, 
    TextField, Box, Divider
} from '@mui/material';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import {useSnackbar} from '../context/SnackbarContext';

function ProjectPage(){
    const [projects, setProjects] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await API.get('/projects');
                setProjects(res.data);
            }catch(err){
                showSnackbar(err.response?.data?.error || 'Failed to load projects', 'error');
            }
        };
        fetchData();
    }, []);

    const handleDelete = async ( id ) => {
        if(!window.confirm("Delete this project?")) return;
        try{
            await API.delete(`/projects/${id}`);
            setProjects(projects.filter(p => p._id !== id));
            showSnackbar('Deleted successfully', 'success');
        }catch(err){
            showSnackbar(err.response?.data?.error || "Failed to delete", 'error');
        }
    };

    return(
        <Container sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #fb8500, #ffb703)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Projects Tracker
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button variant="contained" color="success" onClick={() => navigate('/addproject')}>
          + Add New Project
        </Button>

        <TextField
          label="Search by title"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 250 }}
        />
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={3}>
        {projects.filter(p => p.title.toLowerCase().includes(search.toLowerCase())).map(p => (
          <Grid item xs={12} md={6} lg={4} key={p._id}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 2,
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 6px 25px rgba(0,0,0,0.2)'
                },
                borderLeft: '5px solid #fb8500'
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: '#fb8500' }}>
                  {p.title}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {p.description}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Tech Stack:</strong> {p.techStack}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Status:</strong> {p.status}
                </Typography>
                {p.link && (
                  <Button
                    href={p.link}
                    target="_blank"
                    size="small"
                    color="secondary"
                    sx={{ mb: 1 }}
                  >
                    View Project
                  </Button>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={() => navigate(`/editproject/${p._id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(p._id)}
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

export default ProjectPage;