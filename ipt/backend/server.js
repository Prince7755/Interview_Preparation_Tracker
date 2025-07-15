const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const authRoutes = require('./routes/authRoutes');
const questionRoutes = require('./routes/questionRoutes');
const userRoutes = require('./routes/userRoutes');
const systemDesignRoutes = require('./routes/systemDesignRoutes');
const csSubjectRoutes = require('./routes/csSubjectRoutes');
const behavioralRoutes = require('./routes/behavioralRoutes');
const projectRoutes = require('./routes/projectsRoutes');
const mockInterviewRoutes = require('./routes/mockInterviewRoutes');
const plannerRoutes = require('./routes/plannerRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/systemdesign', systemDesignRoutes);
app.use('/api/cssubjects', csSubjectRoutes);
app.use('/api/behaviorals', behavioralRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/mockinterviews', mockInterviewRoutes);
app.use('/api/planner', plannerRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() =>{
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log(err));