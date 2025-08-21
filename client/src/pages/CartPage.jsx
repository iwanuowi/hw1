import { useEffect, useState } from "react";
import {
  Container,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Divider,
} from "@mui/material";
import { getCart, deleteItemFromCart } from "../utils/cart";
import { Link } from "react-router";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const handleDelete = (id) => {
    const updatedCart = deleteItemFromCart(id);
    setCartItems(updatedCart);
  };

  const getTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <>
      {/* Header */}
      <div>
        <Typography
          variant="h3"
          align="center"
          fontWeight="bold"
          sx={{ marginBottom: 3, marginTop: 3 }}
        >
          Cart
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

      {/* The Cart  */}
      <Divider sx={{ mt: 3 }} />
      <Container maxWidth="lg" sx={{ textAlign: "center", mt: 4 }}>
        {cartItems.length === 0 ? (
          <>
            <Typography>Your cart is empty.</Typography>
            <Button
              component={Link}
              to="/"
              sx={{ backgroundColor: "blue", color: "white", mt: 4 }}
            >
              Add your Cart!
            </Button>
          </>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Product</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Quantity</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        ${(item.price * item.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDelete(item.id)}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}

                  {/* Footer Row for Total */}
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      align="right"
                      sx={{ fontWeight: "bold" }}
                    >
                      Total:
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      ${getTotal().toFixed(2)}
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            {/* Checkout Button */}
            <Box textAlign="right" mt={3}>
              <Button variant="contained" color="primary">
                Checkout
              </Button>
            </Box>
          </>
        )}
      </Container>
    </>
  );
};

export default CartPage;
