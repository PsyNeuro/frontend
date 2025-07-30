import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  LinearProgress,
  Container,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import {
  School,
  Assignment,
  Grade,
  Schedule,
  Notifications,
  Person,
  LogoutOutlined,
  BookOutlined,
  TrendingUp,
  CalendarToday,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate(); //navigation
  const [user, setUser] = useState<any>(null); // state to store user data / user state management

  useEffect(() => {
    // Get user data from localStorage (name, email, and role)

    const userData = localStorage.getItem("user");

    if (userData) {
      setUser(JSON.parse(userData)); //if user data is found, load it
    } else {
      // If no user data, redirect to login
      checkAuthStatus();
    }
  }, [navigate]);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/protected", {
        withCredentials: true, // This sends the httpOnly cookie
      });

      // If we get here, user is authenticated
      // But we still need user data, so get it from backend
      const userResponse = await axios.get("http://localhost:5000/api/me", {
        withCredentials: true,
      });

      setUser(userResponse.data.user);
      localStorage.setItem("user", JSON.stringify(userResponse.data.user));
    } catch (error) {
      // Not authenticated, redirect to login
      navigate("/pages/Login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    const userDataold = localStorage.getItem("user");
    const usertokenold = localStorage.getItem("token");

    if (!userDataold) {
      console.log(userDataold, "User data removed...");
      navigate("/pages/Login");
    } else {
      console.log(userDataold, "User data not removed...");
    }
    if (!usertokenold) {
      console.log(usertokenold, "User token removed...");
      navigate("/pages/Login");
    } else {
      console.log(usertokenold, "User token not removed...");
    }
  };

  // Mock data for dashboard
  const courses = [
    { id: 1, name: "Computer Science 101", progress: 75, grade: "A-" },
    { id: 2, name: "Mathematics 201", progress: 60, grade: "B+" },
    { id: 3, name: "Physics 150", progress: 85, grade: "A" },
    { id: 4, name: "English Literature", progress: 45, grade: "B" },
  ];

  const upcomingAssignments = [
    {
      id: 1,
      title: "CS Final Project",
      course: "Computer Science 101",
      dueDate: "2025-08-01",
      priority: "high",
    },
    {
      id: 2,
      title: "Math Quiz 3",
      course: "Mathematics 201",
      dueDate: "2025-07-30",
      priority: "medium",
    },
    {
      id: 3,
      title: "Physics Lab Report",
      course: "Physics 150",
      dueDate: "2025-08-05",
      priority: "low",
    },
  ];

  const recentActivities = [
    { id: 1, activity: "Submitted CS Assignment 4", time: "2 hours ago" },
    { id: 2, activity: "Completed Math Quiz 2", time: "1 day ago" },
    { id: 3, activity: "Joined Physics Study Group", time: "2 days ago" },
    { id: 4, activity: "Downloaded Lecture Notes", time: "3 days ago" },
  ];

  if (!user) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Top Navigation */}
      <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
        <Toolbar>
          <School sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            UniSystem Dashboard
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutOutlined />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Welcome Section */}
        <Paper
          elevation={3}
          sx={{
            p: 3,
            mb: 4,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
        >
          <Box display="flex" alignItems="center">
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mr: 3,
                bgcolor: "white",
                color: "primary.main",
              }}
            >
              <Person sx={{ fontSize: 40 }} />
            </Avatar>
            <Box>
              <Typography
                variant="h4"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                Welcome back, {user.name}!
              </Typography>
              <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.8)" }}>
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)} •{" "}
                {user.email}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "rgba(255,255,255,0.9)", mt: 1 }}
              >
                Ready to continue your learning journey?
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: "100%", textAlign: "center", p: 2 }}>
              <CardContent>
                <BookOutlined
                  sx={{ fontSize: 40, color: "primary.main", mb: 1 }}
                />
                <Typography
                  variant="h4"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  {courses.length}
                </Typography>
                <Typography color="text.secondary">Active Courses</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: "100%", textAlign: "center", p: 2 }}>
              <CardContent>
                <Assignment
                  sx={{ fontSize: 40, color: "warning.main", mb: 1 }}
                />
                <Typography
                  variant="h4"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  {upcomingAssignments.length}
                </Typography>
                <Typography color="text.secondary">
                  Pending Assignments
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: "100%", textAlign: "center", p: 2 }}>
              <CardContent>
                <TrendingUp
                  sx={{ fontSize: 40, color: "success.main", mb: 1 }}
                />
                <Typography
                  variant="h4"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  3.2
                </Typography>
                <Typography color="text.secondary">Overall GPA</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: "100%", textAlign: "center", p: 2 }}>
              <CardContent>
                <Schedule sx={{ fontSize: 40, color: "info.main", mb: 1 }} />
                <Typography
                  variant="h4"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  12
                </Typography>
                <Typography color="text.secondary">Credit Hours</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Main Content Grid */}
        <Grid container spacing={3}>
          {/* Courses Section */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ mb: 2, display: "flex", alignItems: "center" }}
                >
                  <School sx={{ mr: 1 }} />
                  My Courses
                </Typography>
                {courses.map((course) => (
                  <Box key={course.id} sx={{ mb: 3 }}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ mb: 1 }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "medium" }}
                      >
                        {course.name}
                      </Typography>
                      <Chip label={course.grade} color="primary" size="small" />
                    </Box>
                    <Box display="flex" alignItems="center">
                      <LinearProgress
                        variant="determinate"
                        value={course.progress}
                        sx={{ flexGrow: 1, mr: 2, height: 8, borderRadius: 4 }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {course.progress}%
                      </Typography>
                    </Box>
                  </Box>
                ))}
                <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                  View All Courses
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Upcoming Assignments */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ mb: 2, display: "flex", alignItems: "center" }}
                >
                  <Assignment sx={{ mr: 1 }} />
                  Upcoming Assignments
                </Typography>
                <List>
                  {upcomingAssignments.map((assignment) => (
                    <ListItem key={assignment.id} sx={{ px: 0 }}>
                      <ListItemIcon>
                        <CalendarToday color="action" />
                      </ListItemIcon>
                      <ListItemText
                        primary={assignment.title}
                        secondary={`${assignment.course} • Due: ${assignment.dueDate}`}
                      />
                      <Chip
                        label={assignment.priority}
                        color={
                          assignment.priority === "high"
                            ? "error"
                            : assignment.priority === "medium"
                            ? "warning"
                            : "success"
                        }
                        size="small"
                      />
                    </ListItem>
                  ))}
                </List>
                <Button variant="outlined" fullWidth sx={{ mt: 1 }}>
                  View All Assignments
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Activity */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ mb: 2, display: "flex", alignItems: "center" }}
                >
                  <Notifications sx={{ mr: 1 }} />
                  Recent Activity
                </Typography>
                <List>
                  {recentActivities.map((activity) => (
                    <ListItem key={activity.id} sx={{ px: 0 }}>
                      <ListItemText
                        primary={activity.activity}
                        secondary={activity.time}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Quick Actions
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button variant="contained" startIcon={<Assignment />}>
                Submit Assignment
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" startIcon={<Grade />}>
                View Grades
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" startIcon={<Schedule />}>
                Class Schedule
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
