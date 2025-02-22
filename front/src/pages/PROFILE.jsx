import React, { useEffect } from "react";
import { useAuthStore } from "../Store/AuthStore";
import { Outlet, useNavigate } from "react-router-dom";
import Logout from "./Logout";
import {
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import {
  Home as HomeIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Message as MessageIcon,
  ContactMail as ContactIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

const PROFILE = () => {
  const { logout, getUser, currUser } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, [getUser]);

  const handleLogout = () => {
    logout();
    navigate('/logout');
    
  };

  return (
    <>
      <CssBaseline />
      <Box>
        <AppBar
          position="fixed"
          sx={{
            width: '100%',
            right: 0,
            paddingRight: 'calc(8px)',
          }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
              onClick={() => navigate('/')}
            >
              <HomeIcon />
            </IconButton>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {currUser?.username || 'User'}
            </Typography>

            <Button
              color="inherit"
              startIcon={<NotificationsIcon />}
              onClick={() => navigate('/notif')}
            >
              Notifications
            </Button>

            <Button
              color="inherit"
              startIcon={<PersonIcon />}
              onClick={() => navigate('/profile')}
            >
              Profile
            </Button>

            <Button
              color="inherit"
              startIcon={<PersonIcon />}
              onClick={() => navigate('/profile2')}
            >
              Profile2
            </Button>

            <Button
              color="inherit"
              startIcon={<MessageIcon />}
              onClick={() => navigate('/chats')}
            >
              Message
            </Button>

            <Button
              color="inherit"
              startIcon={<ContactIcon />}
              onClick={() => navigate('/contact')}
            >
              Contact
            </Button>

            <Button
              color="inherit"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}

            >
              Logout
            </Button>

            <IconButton
              color="inherit"
              onClick={() => navigate('/profile')}
              
              sx={{ ml: 0 }}
            >
              <Avatar src={currUser?.profilePic} />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Toolbar />

        <Box
          sx={{
            p: 3,
            flexGrow: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default PROFILE;
