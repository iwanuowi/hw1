import {
  Container,
  Grid,
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Paper,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { getCart } from "../utils/cart";
import { toast } from "sonner";
import validator from "email-validator";
import Header from "../components/Header";
import { createOrder } from "../utils/api_orders";

const CheckoutPage = () => {
  // load the cart items from local storage
  const [cart, setCart] = useState(getCart());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const getCartTotal = () => {
    return cart.reduce(
      (total, product) => total + product.quantity * product.price,
      0
    );
  };

  const handleCheckout = async () => {
    if (!name || !email) {
      toast.error("Please fill up all the fields");
    } else if (!validator.validate(email)) {
      toast.error("Please use a valid email address");
    } else {
      try {
        // open loading backdrop
        setLoading(true);
        // 3.1 get total price
        const totalPrice = getCartTotal();
        // 3.2 create order
        const response = await createOrder(name, email, cart, totalPrice);
        // 3.3 get the billplz url from the response
        const billplz_url = response.billplz_url;
        // 3.4 redirect the user to billplz payment page
        window.location.href = billplz_url;
      } catch (error) {
        console.log(error);
        toast.error(error.message);
        // close th eloading backdrop
        setLoading(false);
      }
    }
  };

  return (
    <>
      {/* Header */}
      <Header title="Check Out" />
      <Container maxWidth="lg" sx={{ textAlign: "center", mt: 4 }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item size={{ xs: 12, md: 6, lg: 6 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>
              Contact Information
            </Typography>
            <Box mb={2}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box mb={2}>
              <Button
                fullWidth
                variant="contained"
                disabled={cart.length === 0}
                onClick={handleCheckout}
              >
                Pay ${getCartTotal().toFixed(2)}
              </Button>
            </Box>
          </Grid>

          <Grid item size={{ xs: 12, md: 6, lg: 6 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>
              Your Order Summary
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Product</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Qty</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>
                        ${(item.price * item.quantity).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      align="right"
                      sx={{ fontWeight: "bold" }}
                    >
                      Total:
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      ${getCartTotal().toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default CheckoutPage;
