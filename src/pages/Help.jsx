import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Badge,
  Grid,
  Container,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CloseIcon from '@mui/icons-material/Close';

export default function Help({ activeColor}) {
  const [openDialog, setOpenDialog] = useState(null);
  const [adminMsg, setAdminMsg] = useState('');
  const [adminChat, setAdminChat] = useState([
    { sender: 'admin', msg: 'Welcome! How can I help you?', time: '09:00 AM' },
  ]);

  const handleOpenDialog = (type) => setOpenDialog(type);
  const handleCloseDialog = () => setOpenDialog(null);

  const handleMsgSend = () => {
    if (adminMsg.trim()) {
      setAdminChat([
        ...adminChat,
        {
          sender: 'user',
          msg: adminMsg,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setAdminMsg('');
    }
  };

  const helpOptions = [
    {
      id: 'faq',
      title: 'Help & FAQ',
      icon: <HelpOutlineIcon sx={{ fontSize: 40, color: activeColor }} />,
      desc: 'Find answers to common questions and issues',
    },
    {
      id: 'admin',
      title: 'Connect Admin',
      icon: <ChatIcon sx={{ fontSize: 40, color: activeColor }} />,
      desc: 'Live chat with admin support',
    },
    {
      id: 'vehicle',
      title: 'Vehicle Management',
      icon: <DirectionsCarIcon sx={{ fontSize: 40, color: activeColor }} />,
      desc: 'Manage vehicle groups, duty types & queries',
    },
    {
      id: 'video',
      title: 'Try Solution Video',
      icon: <VideoCallIcon sx={{ fontSize: 40, color: activeColor }} />,
      desc: 'Watch self-help and troubleshooting videos',
    },
    {
      id: 'profile',
      title: 'Notification & Profile',
      icon: (
        <Badge color="error" variant="dot">
          <NotificationsIcon sx={{ fontSize: 40, color: activeColor }} />
        </Badge>
      ),
      desc: 'Control notifications, manage profile settings',
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f5f5f5',
        py: 4,
        px: { xs: 1, sm: 2, md: 3 },
        width: '100%',
        margin: 0,
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4, width: '100%' }}>
        <Typography variant="h3" sx={{ fontWeight: 700, color: activeColor, mb: 1, fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}>
          Help & Support Center
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
          Choose an option below to get assistance
        </Typography>
      </Box>

      {/* Help Option Cards Grid - Mobile 100% Width */}
      <Box sx={{ width: '100%', px: { xs: 0, sm: 2 } }}>
        <Grid container spacing={2} sx={{ width: '100%', margin: 0 }}>
          {helpOptions.map((option) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={option.id}>
              <Paper
                elevation={3}
                sx={{
                  p: { xs: 3, sm: 3 },
                  textAlign: 'center',
                  cursor: 'pointer',
                  borderRadius: 3,
                  transition: 'all 0.3s',
                  border: `2px solid transparent`,
                  width: '100%',
                  minHeight: { xs: 140, sm: 200, md: 220 },
                  mx: 'auto',
                  '&:hover': {
                    border: `2px solid ${activeColor}`,
                    boxShadow: `0 8px 20px ${activeColor}44`,
                    transform: { xs: 'none', sm: 'translateY(-8px)' },
                  },
                }}
                onClick={() => handleOpenDialog(option.id)}
              >
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  {option.icon}
                </Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600, 
                    color: '#333', 
                    mt: 1,
                    fontSize: { xs: '1.1rem', sm: '1.25rem' }
                  }}
                >
                  {option.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    mt: 1,
                    fontSize: { xs: '0.85rem', sm: '0.9rem' }
                  }}
                >
                  {option.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Rest of the dialog code remains same */}
      {/* Dialog for FAQ */}
      <Dialog open={openDialog === 'faq'} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: activeColor, color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Help & FAQ
          <IconButton onClick={handleCloseDialog} sx={{ color: '#fff' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Typography variant="body1" sx={{ mb: 2, fontWeight: 600 }}>Frequently Asked Questions:</Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>Q: How to connect with admin?</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>A: Click 'Connect Admin' card to chat directly.</Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>Q: Vehicle management queries?</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>A: Select 'Vehicle Management' for group queries.</Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>Q: Notification issues?</Typography>
          <Typography variant="body2" color="text.secondary">A: Go to 'Notification & Profile' to adjust settings.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: activeColor, fontWeight: 700 }}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Admin Chat */}
      <Dialog open={openDialog === 'admin'} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: activeColor, color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Admin Live Chat
          <IconButton onClick={handleCloseDialog} sx={{ color: '#fff' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <List sx={{ minHeight: 200, maxHeight: 300, overflowY: 'auto', bgcolor: '#fafafa', borderRadius: 2, p: 2 }}>
            {adminChat.map((m, i) => (
              <ListItem key={i} alignItems="flex-start" sx={{ mb: 1 }}>
                <Avatar sx={{ mr: 2, bgcolor: m.sender === 'admin' ? activeColor : '#e3f2fd', color: m.sender === 'admin' ? '#fff' : activeColor }}>
                  <PersonIcon />
                </Avatar>
                <ListItemText
                  primary={<Typography sx={{ fontWeight: m.sender === 'admin' ? 700 : 500, color: m.sender === 'admin' ? activeColor : '#333' }}>{m.msg}</Typography>}
                  secondary={<Typography color="text.secondary" variant="caption">{m.time}</Typography>}
                />
              </ListItem>
            ))}
          </List>
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <TextField 
              value={adminMsg} 
              onChange={(e) => setAdminMsg(e.target.value)} 
              label="Type your message" 
              size="small" 
              fullWidth 
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleMsgSend();
                }
              }}
            />
            <Button variant="contained" sx={{ bgcolor: activeColor, color: '#fff', fontWeight: 700 }} onClick={handleMsgSend}>
              Send
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: activeColor, fontWeight: 700 }}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Vehicle Management */}
      <Dialog open={openDialog === 'vehicle'} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: activeColor, color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Vehicle Management
          <IconButton onClick={handleCloseDialog} sx={{ color: '#fff' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>Select your vehicle group:</Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            {['Sedan', 'SUV', 'Mini', 'Bus', 'Auto'].map((grp) => (
              <Button
                key={grp}
                variant="contained"
                sx={{
                  bgcolor: activeColor,
                  color: '#fff',
                  borderRadius: '50%',
                  minWidth: { xs: 56, sm: 64 },
                  height: { xs: 56, sm: 64 },
                  fontWeight: 600,
                  textTransform: 'capitalize',
                  fontSize: { xs: 12, sm: 14 },
                }}
              >
                {grp}
              </Button>
            ))}
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 3, display: 'block', textAlign: 'center' }}>
            Click vehicle group for queries or help regarding management, bill, or payment.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: activeColor, fontWeight: 700 }}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Video Solutions */}
      <Dialog open={openDialog === 'video'} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: activeColor, color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Try Solution Videos
          <IconButton onClick={handleCloseDialog} sx={{ color: '#fff' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ mt: 2, textAlign: 'center' }}>
          <VideoCallIcon sx={{ fontSize: 60, color: activeColor, mb: 2 }} />
          <Typography variant="body1" sx={{ mb: 2 }}>Watch help videos to solve common vehicle and booking issues!</Typography>
          <Button variant="contained" sx={{ bgcolor: activeColor, color: '#fff', px: 3, fontWeight: 700 }}>Play Video</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: activeColor, fontWeight: 700 }}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Profile & Notifications */}
      <Dialog open={openDialog === 'profile'} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: activeColor, color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Notification & Profile
          <IconButton onClick={handleCloseDialog} sx={{ color: '#fff' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexDirection: { xs: 'column', sm: 'row' }, textAlign: { xs: 'center', sm: 'left' } }}>
            <Avatar sx={{ bgcolor: activeColor, width: 64, height: 64, fontSize: 28, fontWeight: 700 }}>U</Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>Your Profile</Typography>
              <Typography variant="body2" color="text.secondary">Edit notification settings, manage alert & connect support.</Typography>
              <Button variant="outlined" sx={{ mt: 2, color: activeColor, borderColor: activeColor, fontWeight: 700 }}>
                Edit Profile
              </Button>
            </Box>
            <IconButton>
              <NotificationsIcon sx={{ color: activeColor, fontSize: 36 }} />
            </IconButton>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: activeColor, fontWeight: 700 }}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}