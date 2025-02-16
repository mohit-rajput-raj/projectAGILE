import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Container,
  Typography,
  Paper,
  Avatar,
  IconButton,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import {
  Notifications,
  Message,
  Home,
  People,
  Work,
  Analytics,
  Settings,
  Add,
} from "@mui/icons-material";

const StyledSidebar = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  background: "#fff",
  borderRight: "1px solid #eee",
  height: "100vh",
  position: "fixed",
  width: "250px",
}));

const StyledMainContent = styled(Box)(({ theme }) => ({
  marginLeft: "250px",
  padding: theme.spacing(3),
  background: "#f5f5f5",
  minHeight: "100vh",
}));

const Dashboard = () => {
  const [stats, setStats] = useState({
    connections: 500,
    views: 120,
    posts: 45,
  });

  const [activities, setActivities] = useState([
    {
      id: 1,
      type: "connection",
      user: "John Doe",
      action: "connected with you",
      time: "2h ago",
    },
    {
      id: 2,
      type: "post",
      user: "Jane Smith",
      action: "liked your post",
      time: "4h ago",
    },
    {
      id: 3,
      type: "job",
      user: "Tech Corp",
      action: "posted a new job",
      time: "5h ago",
    },
  ]);

  const menuItems = [
    { icon: <Home />, text: "Home" },
    { icon: <People />, text: "My Network" },
    { icon: <Work />, text: "Jobs" },
    { icon: <Message />, text: "Messaging" },
    { icon: <Notifications />, text: "Notifications" },
    { icon: <Analytics />, text: "Analytics" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Link to="/login">allready have a accountt?</Link>
      <StyledSidebar>
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Avatar
            sx={{ width: 80, height: 80, margin: "auto", mb: 2 }}
            src="/avatar-placeholder.png"
          />
          <Typography variant="h6">John Doe</Typography>
          <Typography variant="body2" color="textSecondary">
            Software Engineer
          </Typography>
        </Box>

        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={index} sx={{ mb: 1 }}>
              <ListItemAvatar>{item.icon}</ListItemAvatar>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </StyledSidebar>

      {/* Main Content */}
      <StyledMainContent>
        <Container>
          {/* Stats Section */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="h4">{stats.connections}</Typography>
                <Typography color="textSecondary">Connections</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="h4">{stats.views}</Typography>
                <Typography color="textSecondary">Profile Views</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="h4">{stats.posts}</Typography>
                <Typography color="textSecondary">Posts</Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Content Area */}
          <Grid container spacing={3}>
            {/* Main Feed */}
            <Grid item xs={12} md={8}>
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar sx={{ mr: 2 }} />
                    <Typography variant="body1">
                      Share your thoughts...
                    </Typography>
                    <IconButton sx={{ ml: "auto" }}>
                      <Add />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>

              {/* Activity Feed */}
              {activities.map((activity) => (
                <Card key={activity.id} sx={{ mb: 2 }}>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar sx={{ mr: 2 }} />
                      <Box>
                        <Typography variant="body1">
                          <strong>{activity.user}</strong> {activity.action}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {activity.time}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Grid>

            {/* Right Sidebar */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Suggested Connections
                </Typography>
                <List>
                  {[1, 2, 3].map((item) => (
                    <React.Fragment key={item}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar />
                        </ListItemAvatar>
                        <ListItemText
                          primary={`Suggested User ${item}`}
                          secondary="Software Engineer at Tech Corp"
                        />
                      </ListItem>
                      {item < 3 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </Paper>

              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Recent News
                </Typography>
                <List>
                  {[1, 2, 3].map((item) => (
                    <ListItem key={item}>
                      <ListItemText
                        primary={`Trending News ${item}`}
                        secondary="2 hours ago"
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </StyledMainContent>
    </Box>
  );
};

export default Dashboard;
