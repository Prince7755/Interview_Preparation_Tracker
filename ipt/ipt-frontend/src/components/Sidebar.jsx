import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider, Box, Typography, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CodeIcon from '@mui/icons-material/code';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import SchoolIcon from '@mui/icons-material/School';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function Sidebar({ open, onClose, user, handleLogout }) {
    const navigate = useNavigate();

    const modules = [
        { label: 'Dashboard', path: '/', icon: <DashboardIcon /> },
        { label: 'DSA Tracker', path: '/dsa', icon: <CodeIcon /> },
        { label: 'System Design', path: '/systemdesign', icon: <DesignServicesIcon /> },
        { label: 'CS Fundamentals', path: '/csfundamentals', icon: <SchoolIcon /> },
        { label: 'Behavioral', path: '/behaviorals', icon: <QuestionAnswerIcon /> },
        { label: 'Projects', path: '/projects', icon: <WorkIcon /> },
        { label: 'Mocks', path: '/mockinterviews', icon: <AssignmentIcon /> },
        { label: 'Planner', path: '/planner', icon: <EventNoteIcon /> },
    ];

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box
                sx={{
                    width: 260,
                    background: 'linear-gradient(180deg, #0f2027, #203a43, #2c5364)',
                    color: '#fff',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Close button */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
                    <IconButton onClick={onClose} sx={{ color: '#fff' }}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Profile info */}
                <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Avatar
                        sx={{
                            width: 60,
                            height: 60,
                            mx: 'auto',
                            mb: 1,
                            bgcolor: 'primary.main',
                            color: 'white'
                        }}
                    >
                        <AccountCircleIcon fontSize="large" />
                    </Avatar>

                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {user?.name || 'User'}
                    </Typography>

                    <Typography variant="body2" sx={{ color: '#ccc' }}>
                        {user?.email || 'No email'}
                    </Typography>
                </Box>



                <Divider sx={{ backgroundColor: '#444' }} />

                {/* Modules */}
                <List>
                    {modules.map((item) => (
                        <ListItem button key={item.label} onClick={() => { navigate(item.path); onClose(); }}>
                            <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItem>
                    ))}
                </List>

                <Box sx={{ flexGrow: 1 }} />

                <Divider sx={{ backgroundColor: '#444' }} />

                {/* Logout button */}
                <List>
                    <ListItem button onClick={() => { handleLogout(); onClose(); }}>
                        <ListItemIcon sx={{ color: '#fff' }}>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
}

export default Sidebar;
