import React, { useState } from 'react';
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Typography,
  Drawer,
  Divider
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CallIcon from '@mui/icons-material/Call';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import InfoIcon from '@mui/icons-material/Info';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
// import IconButton from '@mui/material/IconButton';


const BookingCard = ({ bookingId, pickup, drop, adminPhone }) => {
  const [expanded, setExpanded] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
const [infoOpen, setInfoOpen] = useState(false);

const handleInfoOpen = () => setInfoOpen(true);
const handleInfoClose = () => setInfoOpen(false);

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  const toggleChatDrawer = () => {
    setChatOpen((prev) => !prev);
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Booking ID: {bookingId}
          </Typography>
          <Box>
            <IconButton
              aria-label="Chat"
              onClick={toggleChatDrawer}
              sx={{
                border: '1.5px solid #2196f3',
                borderRadius: '50%',
                mr: 1,
                color: '#2196f3',
              }}
            >
              <ChatIcon />
            </IconButton>
            <IconButton
              aria-label={expanded ? 'Collapse' : 'Expand'}
              onClick={toggleExpand}
              sx={{
                border: '1.5px solid #2196f3',
                borderRadius: '50%',
                color: '#2196f3',
              }}
            >
              {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Box>
        </Box>

        <Collapse in={expanded} timeout="auto" unmountOnExit sx={{ mt: 2 }}>
  <Typography variant="body1" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
    <strong>Pickup:</strong> {pickup}
    {/* No icon here */}
  </Typography>
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
    <Typography variant="body1" sx={{ flexGrow: 1 }}>
      <strong>Drop:</strong> {drop}
    </Typography>
    <IconButton
      aria-label="More booking info"
      size="small"
      onClick={handleInfoOpen}
      sx={{ color: '#2196f3' }}
    >
      <InfoIcon />
    </IconButton>
  </Box>
  <Button
    variant="contained"
    startIcon={<CallIcon />}
    color="primary"
    onClick={() => window.open(`tel:${adminPhone}`)}
  >
    Call Customer
  </Button>

  {/* Info Dialog */}
  <Dialog open={infoOpen} onClose={handleInfoClose}>
    <DialogTitle>Booking Info: {bookingId}</DialogTitle>
    <DialogContent dividers>
      <Typography gutterBottom>Pickup Location: {pickup}</Typography>
      <Typography gutterBottom>Drop Location: {drop}</Typography>
      <Typography gutterBottom>Booking ID: {bookingId}</Typography>
      {/* Add more booking details as needed */}
    </DialogContent>
    <DialogActions>
      <Button onClick={handleInfoClose} color="primary">
        Close
      </Button>
    </DialogActions>
  </Dialog>
</Collapse>

      </Box>

      <Drawer anchor="right" open={chatOpen} onClose={toggleChatDrawer} sx={{ '& .MuiDrawer-paper': { width: 300 } }}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Chat for Booking {bookingId}
          </Typography>
          <Divider />
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Chat interface here...
            </Typography>
          </Box>
          <Button sx={{ mt: 3 }} variant="outlined" onClick={toggleChatDrawer}>
            Close Chat
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default BookingCard;
