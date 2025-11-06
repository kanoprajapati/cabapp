import React, { useState } from 'react';
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Typography,
  Drawer,
  Divider,
  TextField,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CallIcon from '@mui/icons-material/Call';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

const initialChat = [
  { sender: 'customer', message: 'Hi, is my booking confirmed?', time: '09:01 AM' },
  { sender: 'admin', message: 'Yes, your booking is confirmed!', time: '09:03 AM' },
];

const BookingCard = ({
  bookingId,
  pickup,
  drop,
  adminPhone,
  vehicleType = 'Sedan',
  seats = '4+1',
  fare = 6500,
  status = 'One Way Trip',
  pickupDate = '27-02-2025',
  pickupTime = '4:45 PM',
}) => {
  const [expanded, setExpanded] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [pickupEdit, setPickupEdit] = useState(pickup);
  const [dropEdit, setDropEdit] = useState(drop);
  const [chatText, setChatText] = useState('');
  const [chat, setChat] = useState(initialChat);

  const toggleExpand = () => setExpanded((prev) => !prev);
  const toggleChatDrawer = () => setChatOpen((prev) => !prev);
  const handleEditStart = () => setEditing(true);
  const handleEditSave = () => setEditing(false);

  const handleChatSend = () => {
    if (chatText.trim()) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setChat([...chat, { sender: 'admin', message: chatText, time: timeStr }]);
      setChatText('');
    }
  };

  return (
    <>
   <Box
      sx={{
        border: '1.8px solid #2196f3',
        borderRadius: 2,
        p: 2,
        mb: 2,
        bgcolor: '#f5f9ff',
        boxShadow: '0 2px 4px rgb(33 150 243 / 0.15)',
      }}
    >
      {/* Flex row: Booking ID left, Icons right */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          mb: 2,
        }}
      >
        <Typography sx={{ fontWeight: 700, color: '#2196f3', fontSize: '20px', minWidth: '120px' }}>
          Booking ID: {bookingId}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            aria-label="Chat"
            onClick={toggleChatDrawer}
            sx={{
              border: '1.3px solid #2196f3',
              borderRadius: '50%',
              color: '#2196f3',
              background: '#e3f2fd',
              width: 40,
              height: 40,
            }}
          >
            <ChatIcon />
          </IconButton>
          <IconButton
            aria-label={expanded ? 'Collapse' : 'Expand'}
            onClick={toggleExpand}
            sx={{
              border: '1.3px solid #2196f3',
              borderRadius: '50%',
              color: '#2196f3',
              background: '#e3f2fd',
              width: 40,
              height: 40,
            }}
          >
            {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </Box>
      </Box>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
       <Box
  sx={{
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    gap: 2,
    bgcolor: '#fff',
    borderRadius: 2,
    boxShadow: '0 0 4px #e3f2fd',
    p: 2,
    mt: 2,
  }}
>
  {/* Left Column - Pickup/Drop/Route */}
  <Box sx={{ flex: 1, minWidth: 200 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
      <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
        User Detail
      </Typography>
      <Typography variant="caption" color="text.secondary">
        30 minutes ago
      </Typography>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
      <Box>
        <Typography sx={{ color: '#2196f3', fontWeight: 700, fontSize: 18 }}>{pickupEdit}</Typography>
        <Typography sx={{ color: '#888', fontSize: 13 }}>Gujarat</Typography>
      </Box>
      {/* Arrow */}
      <Box sx={{ mx: 1 }}>
        <Box sx={{ width: 36, height: 2, bgcolor: '#2196f3', position: 'relative', mt: 2 }}>
          <Box
            sx={{
              position: 'absolute',
              right: -8,
              top: -5,
              borderTop: '6px solid transparent',
              borderBottom: '6px solid transparent',
              borderLeft: '10px solid #2196f3',
            }}
          />
        </Box>
      </Box>
      <Box>
        <Typography sx={{ color: '#2196f3', fontWeight: 700, fontSize: 18 }}>{dropEdit}</Typography>
        <Typography sx={{ color: '#888', fontSize: 13 }}>Maharashtra</Typography>
      </Box>
    </Box>
    <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
      <Typography variant="caption">Date: <strong>{pickupDate}</strong></Typography>
      <Typography variant="caption">Time: <strong>{pickupTime}</strong></Typography>
    </Box>
  </Box>
  
  {/* Right Column - Vehicle, Fare, Actions */}
  <Box sx={{ flex: 1, minWidth: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
      <DirectionsCarIcon sx={{ fontSize: 28, color: '#2196f3' }} />
      <Typography variant="body1" sx={{ fontWeight: 700 }}>
        {vehicleType} <span style={{ fontSize: 13, color: '#888' }}>({seats} Seats)</span>
      </Typography>
      <Box sx={{ bgcolor: '#2196f3', color: '#fff', borderRadius: 1, px: 2, py: 0.5, fontSize: 13, ml: 2 }}>
        {status}
      </Box>
    </Box>
    <Typography variant="h6" sx={{ color: '#2196f3', fontWeight: 700, mb: 2 }}>
      ₹ {fare}
    </Typography>
    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'left', mb: 1 }}>
      <Box sx={{ textAlign: 'center' }}>
        <IconButton sx={{ bgcolor: '#e3f2fd', color: '#2196f3', mb: 1 }}>
          <CallIcon />
        </IconButton>
        <Typography variant="caption" sx={{ color: '#2196f3' }}>Call</Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <IconButton sx={{ bgcolor: '#e3f2fd', color: '#2196f3', mb: 1 }} onClick={toggleChatDrawer}>
          <ChatIcon />
        </IconButton>
        <Typography variant="caption" sx={{ color: '#2196f3' }}>Whatsapp</Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <IconButton sx={{ bgcolor: '#e3f2fd', color: '#2196f3', mb: 1 }}>
          <InfoIcon />
        </IconButton>
        <Typography variant="caption" sx={{ color: '#2196f3' }}>Share</Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <IconButton sx={{ bgcolor: '#e3f2fd', color: '#2196f3', mb: 1 }}>
          <EditIcon />
        </IconButton>
        <Typography variant="caption" sx={{ color: '#2196f3' }}>Edit</Typography>
      </Box>
    </Box>
  </Box>
</Box>

      </Collapse>
    </Box>

      <Drawer
        anchor="right"
        open={chatOpen}
        onClose={toggleChatDrawer}
        sx={{ '& .MuiDrawer-paper': { width: 320, maxWidth: '90vw' } }}
      >
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Chat for Booking {bookingId}
          </Typography>
          <Divider />
          <Box sx={{ flex: 1, overflowY: 'auto', mt: 2 }}>
            <List>
              {chat.map((msg, i) => (
                <ListItem
                  key={i}
                  sx={{
                    justifyContent: msg.sender === 'admin' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <ListItemText
                    primary={msg.message}
                    secondary={msg.time}
                    sx={{
                      textAlign: msg.sender === 'admin' ? 'right' : 'left',
                      bgcolor: msg.sender === 'admin' ? '#e3f2fd' : '#fff',
                      borderRadius: 1,
                      px: 1,
                      py: 0.5,
                      maxWidth: 200,
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
            <TextField
              fullWidth
              placeholder="Type a message..."
              size="small"
              value={chatText}
              onChange={(e) => setChatText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleChatSend();
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button variant="contained" color="primary" size="small" onClick={handleChatSend}>
                      Send
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Button sx={{ mt: 2 }} variant="outlined" onClick={toggleChatDrawer}>
            Close Chat
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default BookingCard;
