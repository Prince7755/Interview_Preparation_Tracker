import React, {useEffect, useState} from 'react';
import { Container, Typography, CircularProgress, Card, CardContent} from '@mui/material';
import API from '../services/api';

function Profile(){
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        const fetchProfile = async () => {
            try{
                const res = await API.get('/users/profile');
                setProfile(res.data);
            }catch(err){
                console.error(err);
            }finally{
                setLoading(false);
            }
        };
        fetchProfile();
    },[]);

    if (loading) return <Container sx={{ mt: 4 }}><CircularProgress /></Container>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Profile</Typography>
      <Card sx={{ maxWidth: 400, mx: 'auto', backgroundColor: '#f5f5f5' }}>
        <CardContent>
          <Typography variant="body1">Email: {profile.email}</Typography>
          <Typography variant="body1">Total Questions Added: {profile.totalQuestions}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Profile;