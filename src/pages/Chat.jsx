import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    TextField,
    Button,
    Avatar,
    Divider,
    List,
    ListItemButton,
    ListItemText,
    Grid,
    Chip,
    Drawer,
    IconButton,
    Badge,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';


export default function Chat({ activeColor = '#ff9800' }) {
    const [bookings, setBookings] = useState([
        {
            id: 'BK12345',
            pickup: 'Connaught Place, Delhi',
            drop: 'Marine Drive, Mumbai',
            fare: 6500,
            vehicleType: 'Sedan',
            seats: '4+1',
            status: 'One Way Trip',
            hasUnread: true,
            lastMsg: 'Hello, is my booking confirmed?',
            time: '09:30 AM',
            messages: [
                { sender: 'user', msg: 'Hello, is my booking confirmed?', time: '09:30 AM' },
                { sender: 'admin', msg: 'Yes, your booking is confirmed! Driver will arrive in 10 minutes.', time: '09:35 AM' },
                { sender: 'user', msg: 'Great, thank you!', time: '09:40 AM' },
            ],
        },
        {
            id: 'BK12346',
            pickup: 'MG Road, Bangalore',
            drop: 'Park Street, Kolkata',
            fare: 7200,
            vehicleType: 'SUV',
            seats: '6+1',
            status: 'Round Trip',
            hasUnread: true,
            lastMsg: 'Can I modify my booking time?',
            time: '10:15 AM',
            messages: [
                { sender: 'user', msg: 'Can I modify my booking time?', time: '10:15 AM' },
                { sender: 'admin', msg: 'Yes, you can modify up to 30 minutes before booking.', time: '10:20 AM' },
            ],
        },
        {
            id: 'BK12347',
            pickup: 'Jubilee Hills, Hyderabad',
            drop: 'Ameerpet, Hyderabad',
            fare: 450,
            vehicleType: 'Auto',
            seats: '3+1',
            status: 'One Way Trip',
            hasUnread: false,
            lastMsg: 'No messages yet',
            time: '',
            messages: [],
        },
    ]);


    const [selectedBooking, setSelectedBooking] = useState(bookings[0]);
    const [messageInput, setMessageInput] = useState('');
    const [drawerOpen, setDrawerOpen] = useState(false);


    const handleSendMessage = () => {
        if (messageInput.trim()) {
            const updatedBookings = bookings.map((b) =>
                b.id === selectedBooking.id
                    ? {
                        ...b,
                        messages: [
                            ...b.messages,
                            {
                                sender: 'admin',
                                msg: messageInput,
                                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            },
                        ],
                    }
                    : b
            );
            setBookings(updatedBookings);
            setSelectedBooking(updatedBookings.find((b) => b.id === selectedBooking.id));
            setMessageInput('');
        }
    };


    const handleBookingSelect = (booking) => {
        setSelectedBooking(booking);
        setBookings((prev) =>
            prev.map((b) => (b.id === booking.id ? { ...b, hasUnread: false } : b))
        );
        setDrawerOpen(false);
    };


    const bookingListContent = (
        <Box sx={{ p: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: activeColor }}>
                    Active Bookings
                </Typography>
                <IconButton 
                    sx={{ display: { xs: 'block', md: 'none' } }}
                    onClick={() => setDrawerOpen(false)}
                >
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <List sx={{ height: 'calc(100% - 80px)', overflowY: 'auto', pr: 1 }}>
                {bookings.map((booking) => (
                    <ListItemButton
                        key={booking.id}
                        selected={selectedBooking.id === booking.id}
                        onClick={() => handleBookingSelect(booking)}
                        sx={{
                            mb: 1,
                            borderRadius: 2,
                            bgcolor: selectedBooking.id === booking.id ? `${activeColor}22` : '#fff',
                            border: selectedBooking.id === booking.id ? `2px solid ${activeColor}` : '1px solid #e0e0e0',
                            '&:hover': { bgcolor: `${activeColor}11` },
                            transition: 'all 0.2s',
                        }}
                    >
                        <Badge badgeContent={booking.hasUnread ? 1 : 0} color="error" overlap="circular">
                            <Avatar sx={{ bgcolor: activeColor, color: '#fff', mr: 2, fontWeight: 700 }}>
                                {booking.id.charAt(booking.id.length - 1)}
                            </Avatar>
                        </Badge>
                        <ListItemText
                            primary={
                                <Typography sx={{ fontWeight: 700, color: activeColor, fontSize: 14 }}>
                                    {booking.id}
                                </Typography>
                            }
                            secondary={
                                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block', fontSize: 12 }}>
                                    {booking.lastMsg} • {booking.time}
                                </Typography>
                            }
                        />
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );


    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', display: 'flex', flexDirection: 'column', width: '100%' }}>
            {/* Header */}
            <Box
                sx={{
                    bgcolor: activeColor,
                    color: '#fff',
                    p: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Chat & Support
                </Typography>
                <IconButton
                    sx={{ display: { xs: 'block', md: 'none' }, color: '#fff' }}
                    onClick={() => setDrawerOpen(true)}
                >
                    <MenuIcon />
                </IconButton>
            </Box>


            {/* Main Content */}
            <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden', width: '100%' }}>
                {/* Booking List - Desktop */}
                <Box
                    sx={{
                        width: { xs: 0, md: 280 },
                        flexShrink: 0,
                        display: { xs: 'none', md: 'block' },
                        bgcolor: '#fff',
                        borderRight: `1px solid #e0e0e0`,
                        overflow: 'hidden',
                        height: '90vh',
                    }}
                >
                    {bookingListContent}
                </Box>


                {/* Chat Area */}
                <Box 
                    sx={{ 
                        flex: 1, 
                        display: 'flex', 
                        overflow: 'hidden',
                        minWidth: 0,
                    }}
                >
                    {/* Chat Container */}
                    <Box 
                        sx={{ 
                            flex: 1, 
                            display: 'flex', 
                            flexDirection: 'column',
                            minWidth: 0,
                            height: '82vh',
                        }}
                    >
                        <Paper 
                            elevation={2} 
                            sx={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                height: '100%', 
                                borderRadius: 0,
                                minHeight: 0,
                                m: 0,
                            }}
                        >
                            {/* Chat Header */}
                            <Box sx={{ p: 2, borderBottom: `1px solid #e0e0e0`, flexShrink: 0 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                                    <Box sx={{ minWidth: 0 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 700, color: activeColor, wordBreak: 'break-word' }}>
                                            {selectedBooking.id}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: 12 }}>
                                            {selectedBooking.pickup} → {selectedBooking.drop}
                                        </Typography>
                                    </Box>
                                    <Chip
                                        label={selectedBooking.status}
                                        sx={{ bgcolor: activeColor, color: '#fff', fontWeight: 700, height: 28, flexShrink: 0 }}
                                    />
                                </Box>
                            </Box>


                            {/* Booking Details */}
                            <Box sx={{ bgcolor: `${activeColor}11`, p: 1.5, borderBottom: `1px solid #e0e0e0`, flexShrink: 0 }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6} sm={3}>
                                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: 11 }}>
                                            Vehicle
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600, color: activeColor, fontSize: 13 }}>
                                            {selectedBooking.vehicleType}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: 11 }}>
                                            Seats
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600, color: activeColor, fontSize: 13 }}>
                                            {selectedBooking.seats}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: 11 }}>
                                            Fare
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600, color: activeColor, fontSize: 13 }}>
                                            ₹{selectedBooking.fare}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: 11 }}>
                                            Status
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600, color: activeColor, fontSize: 13 }}>
                                            Active
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>


                            {/* Messages */}
                            <Box
                                sx={{
                                    flex: 1,
                                    overflowY: 'auto',
                                    bgcolor: '#fafafa',
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1.5,
                                    minHeight: 0,
                                }}
                            >
                                {selectedBooking.messages.length > 0 ? (
                                    selectedBooking.messages.map((msg, idx) => (
                                        <Box
                                            key={idx}
                                            sx={{
                                                display: 'flex',
                                                justifyContent: msg.sender === 'admin' ? 'flex-end' : 'flex-start',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    maxWidth: { xs: '85%', sm: '70%' },
                                                    bgcolor: msg.sender === 'admin' ? activeColor : '#fff',
                                                    color: msg.sender === 'admin' ? '#fff' : '#333',
                                                    p: 1.5,
                                                    borderRadius: 2,
                                                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                                    wordBreak: 'break-word',
                                                }}
                                            >
                                                <Typography variant="body2" sx={{ fontSize: 14 }}>
                                                    {msg.msg}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        display: 'block',
                                                        mt: 0.5,
                                                        color: msg.sender === 'admin' ? 'rgba(255,255,255,0.8)' : '#999',
                                                        textAlign: 'right',
                                                        fontSize: 11,
                                                    }}
                                                >
                                                    {msg.time}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    ))
                                ) : (
                                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
                                        No messages yet. Start a conversation!
                                    </Typography>
                                )}
                            </Box>


                            {/* Message Input */}
                            <Box sx={{ p: 2, borderTop: `1px solid #e0e0e0`, display: 'flex', gap: 1, alignItems: 'flex-end', flexShrink: 0, bgcolor: '#fff' }}>
                                <TextField
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage();
                                        }
                                    }}
                                    placeholder="Type message..."
                                    fullWidth
                                    size="small"
                                    multiline
                                    maxRows={3}
                                    sx={{ bgcolor: '#f5f5f5' }}
                                />
                                <Button
                                    variant="contained"
                                    sx={{
                                        bgcolor: activeColor,
                                        color: '#fff',
                                        px: { xs: 1.5, sm: 2 },
                                        fontWeight: 700,
                                        minWidth: 'fit-content',
                                        height: '40px',
                                        flexShrink: 0,
                                    }}
                                    onClick={handleSendMessage}
                                    endIcon={<SendIcon />}
                                >
                                    <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                                        Send
                                    </Box>
                                </Button>
                            </Box>
                        </Paper>
                    </Box>


                    {/* Image - Desktop only, wider */}
                    <Box 
                        sx={{ 
                            width: { xs: 0, md: 0, lg: 350 },
                            flexShrink: 0,
                            display: { xs: 'none', lg: 'flex' },
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: 2,
                            height: '90vh',
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                height: '100%',
                                bgcolor: '#f0f0f0',
                                borderRadius: 2,
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <img 
                                src='https://cdn-icons-png.flaticon.com/512/2950/2950711.png' 
                                alt='chat illustration' 
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    padding: '20px',
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>


            <Drawer 
                anchor="left" 
                open={drawerOpen} 
                onClose={() => setDrawerOpen(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 280,
                        boxSizing: 'border-box',
                    },
                }}
            >
                {bookingListContent}
            </Drawer>
        </Box>
    );
}
