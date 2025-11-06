import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Divider,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Card,
  CardContent,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import StarIcon from '@mui/icons-material/Star';

export default function Profile({ activeColor = '#ff9800' }) {
  const [profileData, setProfileData] = useState({
    id: 'USR' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    phone: '+91 9876543210',
    licenseNumber: 'DL-01-2024-98765',
    licenseExpiry: '2026-12-31',
    picture: 'https://via.placeholder.com/150?text=User',
    vehicleNumber: 'DL-01-AB-1234',
    vehicleType: 'Sedan',
    vehicleModel: 'Honda Accord',
    aadhar: '1234-5678-9012',
    address: 'Plot 123, Main Street, Delhi, India - 110001',
    joinedDate: '2024-01-15',
    totalRides: 156,
    rating: 4.8,
  });

  const [editData, setEditData] = useState(profileData);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [imageInput, setImageInput] = useState(null);

  const handleEditOpen = () => {
    setEditData(profileData);
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
  };

  const handleEditSave = () => {
    if (imageInput) {
      editData.picture = imageInput;
    }
    setProfileData(editData);
    setEditDialogOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageInput(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogout = () => {
    setLogoutDialogOpen(true);
  };

  const confirmLogout = () => {
    setLogoutDialogOpen(false);
    console.log('User logged out');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', py: 3, px: { xs: 1, sm: 2, md: 3 } }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, color: activeColor }}>
          My Profile
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            size="small"
            startIcon={<EditIcon />}
            sx={{ 
              bgcolor: activeColor, 
              color: '#fff', 
              fontWeight: 700,
              '&:hover': { bgcolor: activeColor, opacity: 0.9 }
            }}
            onClick={handleEditOpen}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<LogoutIcon />}
            sx={{ 
              color: activeColor, 
              borderColor: activeColor, 
              fontWeight: 700,
              '&:hover': { bgcolor: `${activeColor}11` }
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {/* Main Profile Grid */}
      <Grid container spacing={2} sx={{ width: '100%', margin: 0 }}>
        {/* Profile Header Card */}
        <Grid item xs={12}>
          <Card sx={{ bgcolor: '#fff', borderRadius: 2, boxShadow: 2 }}>
            <CardContent sx={{ p: 3 }}>
              <Grid container spacing={3} alignItems="center">
                {/* Avatar Section */}
                <Grid item xs={12} md={3} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                  <Box sx={{ position: 'relative', display: 'inline-block' }}>
                    <Avatar
                      src={profileData.picture}
                      alt={profileData.name}
                      sx={{ 
                        width: 120, 
                        height: 120, 
                        border: `3px solid ${activeColor}`,
                        boxShadow: 2
                      }}
                    />
                    <Chip
                      label="Verified"
                      size="small"
                      sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        bgcolor: '#4caf50',
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: '0.7rem'
                      }}
                    />
                  </Box>
                </Grid>

                {/* User Info Section */}
                <Grid item xs={12} md={9}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: '#333', mb: 1 }}>
                        {profileData.name}
                      </Typography>
                      <Chip
                        label={`ID: ${profileData.id}`}
                        size="medium"
                        sx={{ 
                          bgcolor: `${activeColor}22`, 
                          color: activeColor, 
                          fontWeight: 700,
                          fontSize: '0.9rem'
                        }}
                      />
                    </Grid>

                    {/* Stats Row */}
                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                        <Grid item xs={6} sm={4}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: activeColor }}>
                              {profileData.totalRides}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#666', fontWeight: 600 }}>
                              Total Rides
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: activeColor, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                              {profileData.rating}
                              <StarIcon sx={{ fontSize: 18, color: '#ffc107' }} />
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#666', fontWeight: 600 }}>
                              Rating
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: activeColor }}>
                              {profileData.joinedDate}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#666', fontWeight: 600 }}>
                              Joined Date
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Personal Information - 2 Column Layout */}
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: '#fff', borderRadius: 2, boxShadow: 2, height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <PersonIcon sx={{ color: activeColor, mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, color: activeColor }}>
                  Personal Information
                </Typography>
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: activeColor, display: 'block', mb: 1 }}>
                    Email Address
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#333', p: 1.5, bgcolor: `${activeColor}08`, borderRadius: 1, borderLeft: `3px solid ${activeColor}` }}>
                    {profileData.email}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: activeColor, display: 'block', mb: 1 }}>
                    Phone Number
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#333', p: 1.5, bgcolor: `${activeColor}08`, borderRadius: 1, borderLeft: `3px solid ${activeColor}` }}>
                    {profileData.phone}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: activeColor, display: 'block', mb: 1 }}>
                    Aadhar Number
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#333', p: 1.5, bgcolor: `${activeColor}08`, borderRadius: 1, borderLeft: `3px solid ${activeColor}` }}>
                    {profileData.aadhar}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: activeColor, display: 'block', mb: 1 }}>
                    Joined Date
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#333', p: 1.5, bgcolor: `${activeColor}08`, borderRadius: 1, borderLeft: `3px solid ${activeColor}` }}>
                    {profileData.joinedDate}
                  </Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: activeColor, display: 'block', mb: 1 }}>
                    Address
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#333', p: 1.5, bgcolor: `${activeColor}08`, borderRadius: 1, borderLeft: `3px solid ${activeColor}` }}>
                    {profileData.address}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* License Information */}
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: '#fff', borderRadius: 2, boxShadow: 2, height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <CardMembershipIcon sx={{ color: activeColor, mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, color: activeColor }}>
                  License Information
                </Typography>
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: activeColor, display: 'block', mb: 1 }}>
                    License Number
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#333', p: 1.5, bgcolor: `${activeColor}08`, borderRadius: 1, borderLeft: `3px solid ${activeColor}` }}>
                    {profileData.licenseNumber}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: activeColor, display: 'block', mb: 1 }}>
                    Expiry Date
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#333', p: 1.5, bgcolor: `${activeColor}08`, borderRadius: 1, borderLeft: `3px solid ${activeColor}` }}>
                    {profileData.licenseExpiry}
                  </Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <Box sx={{ 
                    p: 2, 
                    bgcolor: new Date(profileData.licenseExpiry) > new Date() ? '#e8f5e8' : '#ffebee',
                    borderRadius: 1,
                    border: `1px solid ${new Date(profileData.licenseExpiry) > new Date() ? '#4caf50' : '#f44336'}`
                  }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, display: 'block', mb: 0.5 }}>
                      License Status
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: new Date(profileData.licenseExpiry) > new Date() ? '#4caf50' : '#f44336',
                        fontWeight: 600
                      }}
                    >
                      {new Date(profileData.licenseExpiry) > new Date() ? 'Valid' : 'Expired'}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Vehicle Information */}
        <Grid item xs={12}>
          <Card sx={{ bgcolor: '#fff', borderRadius: 2, boxShadow: 2 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <DriveEtaIcon sx={{ color: activeColor, mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, color: activeColor }}>
                  Vehicle Information
                </Typography>
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: activeColor, display: 'block', mb: 1 }}>
                    Vehicle Number
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#333', p: 1.5, bgcolor: `${activeColor}08`, borderRadius: 1, borderLeft: `3px solid ${activeColor}` }}>
                    {profileData.vehicleNumber}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: activeColor, display: 'block', mb: 1 }}>
                    Vehicle Type
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#333', p: 1.5, bgcolor: `${activeColor}08`, borderRadius: 1, borderLeft: `3px solid ${activeColor}` }}>
                    {profileData.vehicleType}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: activeColor, display: 'block', mb: 1 }}>
                    Vehicle Model
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#333', p: 1.5, bgcolor: `${activeColor}08`, borderRadius: 1, borderLeft: `3px solid ${activeColor}` }}>
                    {profileData.vehicleModel}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: activeColor, display: 'block', mb: 1 }}>
                    Status
                  </Typography>
                  <Chip 
                    label="Active" 
                    sx={{ 
                      bgcolor: '#4caf50', 
                      color: '#fff', 
                      fontWeight: 700,
                      width: '100%',
                      justifyContent: 'center'
                    }} 
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Edit Profile Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: activeColor, color: '#fff', fontWeight: 700 }}>
          Edit Profile Information
        </DialogTitle>
        <DialogContent sx={{ mt: 2, p: 3 }}>
          {/* Profile Picture */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Avatar
              src={imageInput || editData.picture}
              alt={editData.name}
              sx={{ width: 120, height: 120, mx: 'auto', mb: 2, border: `3px solid ${activeColor}` }}
            />
            <input
              accept="image/*"
              hidden
              id="profile-pic-input"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="profile-pic-input">
              <Button
                variant="outlined"
                component="span"
                size="small"
                startIcon={<CameraAltIcon />}
                sx={{ color: activeColor, borderColor: activeColor, fontWeight: 600 }}
              >
                Change Profile Picture
              </Button>
            </label>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: activeColor, mb: 1 }}>
                Personal Information
              </Typography>
              <TextField
                fullWidth
                label="Full Name"
                value={editData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                margin="dense"
                size="small"
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={editData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                margin="dense"
                size="small"
              />
              <TextField
                fullWidth
                label="Phone"
                value={editData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                margin="dense"
                size="small"
              />
              <TextField
                fullWidth
                label="Aadhar Number"
                value={editData.aadhar}
                onChange={(e) => handleInputChange('aadhar', e.target.value)}
                margin="dense"
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: activeColor, mb: 1 }}>
                Address & Vehicle
              </Typography>
              <TextField
                fullWidth
                label="Address"
                value={editData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                margin="dense"
                size="small"
                multiline
                rows={2}
              />
              <TextField
                fullWidth
                label="Vehicle Number"
                value={editData.vehicleNumber}
                onChange={(e) => handleInputChange('vehicleNumber', e.target.value)}
                margin="dense"
                size="small"
              />
              <TextField
                fullWidth
                label="Vehicle Type"
                value={editData.vehicleType}
                onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                margin="dense"
                size="small"
              />
              <TextField
                fullWidth
                label="Vehicle Model"
                value={editData.vehicleModel}
                onChange={(e) => handleInputChange('vehicleModel', e.target.value)}
                margin="dense"
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: activeColor, mb: 1 }}>
                License Information
              </Typography>
              <TextField
                fullWidth
                label="License Number"
                value={editData.licenseNumber}
                onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                margin="dense"
                size="small"
              />
              <TextField
                fullWidth
                label="License Expiry"
                type="date"
                value={editData.licenseExpiry}
                onChange={(e) => handleInputChange('licenseExpiry', e.target.value)}
                margin="dense"
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, bgcolor: '#f5f5f5' }}>
          <Button 
            onClick={handleEditClose} 
            startIcon={<CancelIcon />} 
            sx={{ color: '#666', fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleEditSave}
            variant="contained"
            sx={{ 
              bgcolor: activeColor, 
              color: '#fff', 
              fontWeight: 700,
              '&:hover': { bgcolor: activeColor, opacity: 0.9 }
            }}
            startIcon={<SaveIcon />}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Logout Dialog */}
      <Dialog open={logoutDialogOpen} onClose={() => setLogoutDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, color: activeColor }}>
          Confirm Logout
        </DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to logout from your account?</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={() => setLogoutDialogOpen(false)}
            sx={{ color: '#666', fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmLogout}
            variant="contained"
            sx={{ 
              bgcolor: activeColor, 
              color: '#fff', 
              fontWeight: 700,
              '&:hover': { bgcolor: activeColor, opacity: 0.9 }
            }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}