import React, {useState, useEffect} from 'react';
import { Container, Typography, TextField, Button, Box} from '@mui/material';
import API from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from '../context/SnackbarContext';

function EditBehavioral() {
    const [form, setForm] = useState({question: '', answer: ''});
    const { id } = useParams();
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await API.get( `/behaviorals/${id}`);
                setForm(res.data);
            }catch(err){
                showSnackbar(err.response?.data?.error || "Failed to load question", 'error');
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            await API.put(`/behaviorals/${id}`, form);
            showSnackbar('Behavioral question updated successfully', 'success');
            navigate('/behaviorals');
        }catch(err){
            showSnackbar(err.response?.data?.error || "Failed to update question", 'error');
        }
    };

    return(
        <Container maxWidth="sm" sx={{ mt: 4, backgroundColor: '#f5f5f5' , borderRadius: 2, p: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #06d6a0, #118ab2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Edit Behavioral Question
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
          Update Question
        </Button>
      </Box>
    </Container>
    );
}

export default EditBehavioral;