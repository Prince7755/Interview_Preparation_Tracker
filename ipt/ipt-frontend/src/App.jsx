import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/DashBoard';
import AddQuestion from './pages/AddQuestion';
import EditQuestion from './pages/EditQuestion';
import { AuthContext } from './context/AuthContext';
import Profile from './pages/Profile';
import SystemDesignPage from './pages/SystemDesignPage';
import DSATracker from './pages/DSATracker';
import AddSystemDesign from './pages/AddSystemDesign';
import EditSystemDesign from './pages/EditSystemDesign';
import CSFundamentalsPage from './pages/CSFundamentalsPage';
import AddCSSubject from './pages/AddCSSubject';
import EditCSSubject from './pages/EditCSSubject';
import BehavioralPage from './pages/BehavioralPage';
import AddBehavioral from './pages/AddBehavioral';
import EditBehavioral from './pages/EditBehavioral';
import ProjectPage from './pages/ProjectPage';
import AddProject from './pages/AddProject';
import EditProject from './pages/EditProject';
import MockInterviewsPage from './pages/MockInterviewsPage';
import AddMockInterview from './pages/AddMockInterview';
import EditMockInterview from './pages/EditMockInterview';
import PlannerPage from './pages/PlannerPage';
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask';
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/theme';


function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <ThemeProvider theme={theme}>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/login" element={!isLoggedIn ? <Login/> : <Navigate to="/"/>}/>
        <Route path="/register" element={!isLoggedIn ? <Register/> : <Navigate to="/"/>} />
        <Route path="/add" element={isLoggedIn? <AddQuestion/> : <Navigate to="/login" />} />
        <Route path='/edit/:id' element={isLoggedIn ? <EditQuestion/> : <Navigate to="/login" />}/>
        <Route path='/systemdesign' element={isLoggedIn ? <SystemDesignPage/> : <Navigate to="/login"/>}/>
        <Route path='/systemdesign/add' element={isLoggedIn ? <AddSystemDesign/> : <Navigate to="/login"/>}/>
        <Route path='/editsystemdesign/:id' element={isLoggedIn ? <EditSystemDesign/> : <Navigate to="/login"/>}/>
        <Route path='/csfundamentals' element={isLoggedIn ? <CSFundamentalsPage/> : <Navigate to="/login"/>}/>
        <Route path='/addcs' element={isLoggedIn ? <AddCSSubject/> : <Navigate to="/login"/>}/>
        <Route path='/editcs/:id' element={isLoggedIn ? <EditCSSubject/> : <Navigate to="/login"/>}/>
        <Route path='/behaviorals' element={isLoggedIn ? <BehavioralPage/> : <Navigate to="/login"/>}/>
        <Route path='/addbehavioral' element={isLoggedIn ? <AddBehavioral/> : <Navigate to="/login"/>}/>
        <Route path='/editbehavioral/:id' element={isLoggedIn ? <EditBehavioral/> : <Navigate to="/login"/>}/>
        <Route path='/dsa' element={isLoggedIn ? <DSATracker/> : <Navigate to="/login"/>}/>
        <Route path='/projects' element={isLoggedIn ? <ProjectPage/> : <Navigate to="/login"/>}/>
        <Route path='/addproject' element={isLoggedIn ? <AddProject/> : <Navigate to="/login"/>}/>
        <Route path='/editproject/:id' element={isLoggedIn ? <EditProject/> : <Navigate to="/login"/>}/>
        <Route path='/mockinterviews' element={isLoggedIn ? <MockInterviewsPage/> : <Navigate to="/login"/>}/>
        <Route path='/addmockinterview' element={isLoggedIn ? <AddMockInterview/> : <Navigate to="/login"/>}/>
        <Route path='/editmockinterview/:id' element={isLoggedIn ? <EditMockInterview/> : <Navigate to="/login"/>}/>
        <Route path='/planner' element={isLoggedIn ? <PlannerPage/> : <Navigate to="/login"/>}/>
        <Route path='/addtask' element={isLoggedIn ? <AddTask/> : <Navigate to="/login"/>}/>
        <Route path='/edittask/:id' element={isLoggedIn ? <EditTask/> : <Navigate to="/login"/>}/>
        <Route path='/profile' element={<Profile/>} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
