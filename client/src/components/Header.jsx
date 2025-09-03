import { Typography, Divider, Button, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const Header = ({ title = "Welcome to My Store" }) => {
  const location = useLocation();

  return (
    <>
      <Typography
        variant="h3"
        align="center"
        fontWeight="bold"
        sx={{ marginBottom: 2, marginTop: 2 }}
      >
        {title}
      </Typography>
      <Box display="flex" justifyContent="center" gap={2}>
        <Button
          component={Link}
          to="/"
          variant={location.pathname === "/" ? "contained" : "outlined"}
        >
          Home
        </Button>
        <Button
          component={Link}
          to="/cart"
          variant={location.pathname === "/cart" ? "contained" : "outlined"}
        >
          Cart
        </Button>
        <Button
          component={Link}
          to="/orders"
          variant={location.pathname === "/orders" ? "contained" : "outlined"}
        >
          Orders
        </Button>
        <Button
          component={Link}
          to="/categories"
          variant={
            location.pathname === "/categories" ? "contained" : "outlined"
          }
        >
          Categories
        </Button>
        <Button
          component={Link}
          to="/login"
          variant={location.pathname === "/login" ? "contained" : "outlined"}
        >
          Login
        </Button>
        <Button
          component={Link}
          to="/register"
          variant={location.pathname === "/register" ? "contained" : "outlined"}
        >
          Register
        </Button>
      </Box>
      <Divider sx={{ mb: 3, mt: 3 }} />
    </>
  );
};

export default Header;
