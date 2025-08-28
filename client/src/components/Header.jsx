import { Typography, Divider, Button, Box } from "@mui/material";
import { Link } from "react-router";

const Header = () => {
  return (
    <>
      <div>
        <Typography
          variant="h3"
          align="center"
          fontWeight="bold"
          sx={{ marginBottom: 2, marginTop: 2 }}
        >
          Welcome to My Store
        </Typography>

        <Box display="flex" justifyContent="center" gap={2}>
          <Button component={Link} to="/" variant="outlined">
            Home
          </Button>
          <Button component={Link} to="/cart" variant="outlined">
            Cart
          </Button>
          <Button component={Link} to="/orders" variant="outlined">
            Orders
          </Button>
          <Button component={Link} to="/categories" variant="outlined">
            Categories
          </Button>
        </Box>
      </div>
      <Divider sx={{ mb: 3, mt: 3 }} />
    </>
  );
};

export default Header;
