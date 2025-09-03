import {
  Button,
  Container,
  Paper,
  Box,
  FormControl,
  FormLabel,
  TextField,
} from "@mui/material";
import Header from "../components/Header";
import { useState } from "react";
import { registerUser } from "../utils/api_user";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const data = await registerUser(name, email, password);
    console.log(data);
  };
  return (
    <>
      <Header title="Create a New Account" />
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 6 }}>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <FormControl fullWidth>
              <FormLabel>Name</FormLabel>
              <TextField
                variant="outlined"
                placeholder="Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel>Email</FormLabel>
              <TextField
                variant="outlined"
                type="email"
                placeholder="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel>Password</FormLabel>
              <TextField
                variant="outlined"
                type="password"
                placeholder="Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel>Confirm Password</FormLabel>
              <TextField
                variant="outlined"
                type="password"
                placeholder="confirm Password"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 2 }}
              fullWidth
              onClick={handleRegister}
            >
              Sign Up
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default RegisterPage;
