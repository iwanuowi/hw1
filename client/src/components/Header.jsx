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
          sx={{ marginBottom: 3, marginTop: 3 }}
        >
          Welcome to My Store
        </Typography>

        <Box display="flex" justifyContent="center" gap={2}>
          <Button
            component={Link}
            to="/"
            variant="outlined"
            sx={{ backgroundColor: "#E7F5FF", border: "0" }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/cart"
            variant="outlined"
            sx={{ backgroundColor: "#238BE6", border: "0", color: "white" }}
          >
            Cart
          </Button>
        </Box>
      </div>
      <Divider sx={{ mb: 3, mt: 3 }} />
    </>
  );
};

export default Header;
