import React, {useState} from 'react';
import{
    Container, Typography, TextField, Button, Box
} from '@mui/material';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../context/SnackbarContext';

function AddBehavioral(){
    const [form, setForm] = useState({question: '', answer: ''});
    const navigate = useNavigate();
    const {showSnackbar} = useSnackbar();

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await API.post('/behaviorals', form);
            showSnackbar('Behavioral question added successfully', 'success');
            navigate('/behaviorals');
        }catch(err){
            showSnackbar(err.response?.data?.error || 'Failed to add question', 'error');
        }
    };

    return(
        <Container maxWidth="sm" sx={{ mt: 4, backgroundColor: '#f5f5f5', borderRadius: 2, p: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #ef476f, #ffd166)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Add Behavioral Question
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          name="question"
          label="Question"
          variant="outlined"
          fullWidth
          required
          value={form.question}
          onChange={handleChange}
        />
        <TextField
          name="answer"
          label="Answer"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={form.answer}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Question
        </Button>
      </Box>
    </Container>
    );
}

export default AddBehavioral;