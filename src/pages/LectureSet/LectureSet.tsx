import { Box, Grid, TextField, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const LectureSet = () => {
  const navigate = useNavigate();

  const [form, setForm] = React.useState({
    title: "",
    description: "",
    url: "",
    duration: "",
    teacher: "",
  });

  React.useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/isteacher",
          {},
          { withCredentials: true }
        );
        if (
          response.data &&
          response.data.message === "Access granted: You are a teacher."
        ) {
          return true;
        }
        navigate("/pages/dashboard");
        return false;
      } catch (error) {
        navigate("/pages/dashboard");
        return false;
      }
    };
    checkAuthStatus();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/lectureset",
        form,
        { withCredentials: true }
      );
      if (response.status === 200) {
        alert("Lecture created successfully!");
        setForm({
          title: "",
          description: "",
          url: "",
          duration: "",
          teacher: "",
        });
      } else {
        alert("Failed to create lecture.");
      }
    } catch (error) {
      alert("Error creating lecture.");
      console.error(error);
    }
  };

  return (
    <Box maxWidth={500} mx="auto" mt={4}>
      <Typography variant="h4" gutterBottom>
        Create Lecture
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="URL"
              name="url"
              value={form.url}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Duration (minutes)"
              name="duration"
              type="number"
              value={form.duration}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Teacher Name"
              name="teacher"
              value={form.teacher}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Lecture
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default LectureSet;
