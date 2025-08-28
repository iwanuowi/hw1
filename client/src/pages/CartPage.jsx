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
import { API_URL } from "../utils/constants";

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
          sx={{ marginBottom: 2, marginTop: 2 }}
        >
          Cart
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
        </Box>
      </div>

      {/* The Cart */}
      <Divider sx={{ mt: 3 }} />
      <Container maxWidth="lg" sx={{ textAlign: "center", mt: 4 }}>
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
              {cartItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      {/* Product image */}
                      <img
                        src={
                          item.image
                            ? API_URL + item.image
                            : API_URL + "uploads/default_image.png"
                        }
                        alt={item.name}
                        style={{
                          objectFit: "cover",
                          borderRadius: 8,
                        }}
                      />

                      {/* Product name */}
                      <Typography>{item.name}</Typography>
                    </Box>
                  </TableCell>
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
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/checkout"
            disabled={cartItems.length === 0}
          >
            Checkout
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default CartPage;
