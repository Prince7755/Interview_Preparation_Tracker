import React, {useEffect, useState} from 'react';
import{
    Container, Typography, Grid, Card, CardContent, Button,
    TextField, Box, Divider
} from '@mui/material';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../context/SnackbarContext';

function MockInterviewsPage(){
    const [mocks, setMocks] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await API.get('/mockinterviews');
                setMocks(res.data);
            }catch(err){
                showSnackbar(err.response?.data?.error || 'Failed to load mock interviews', 'error');
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if(!window.confirm("Delete this mock interview?")) return;
        try{
            await API.delete(`/mockinterviews/${id}`);
            setMocks(mocks.filter(m => m._id !== id));
            showSnackbar('Deleted successfully', 'success');
        }catch(err){
            showSnackbar(err.response?.data?.error || 'Failed to delete', 'error');
        }
    };

    return(
        <Container sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #f72585, #7209b7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Mock Interviews
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button variant="contained" color="secondary" onClick={() => navigate('/addmockinterview')}>
          + Add New Mock
        </Button>

        <TextField
          label="Search by company"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 250 }}
        />
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={3}>
        {mocks.filter(m => m.company.toLowerCase().includes(search.toLowerCase())).map(m => (
          <Grid item xs={12} md={6} lg={4} key={m._id}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
                },
                borderLeft: '5px solid #f72585'
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: '#7209b7' }}>
                  {m.company} - {m.roundType}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Date:</strong> {m.date}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Rating:</strong> {m.rating || "Not rated"}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Feedback:</strong> {m.feedback || "No feedback"}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={() => navigate(`/editmockinterview/${m._id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(m._id)}
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

export default MockInterviewsPage;