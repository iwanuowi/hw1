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
import { loginUser } from "../utils/api_user";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = await loginUser(email, password);
    console.log(data);
  };

  return (
    <>
      <Header title="Login to Your Account" />
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 6 }}>
          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
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
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 2 }}
              fullWidth
              type="submit"
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default LoginPage;
