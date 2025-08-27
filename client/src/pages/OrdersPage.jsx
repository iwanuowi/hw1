import {
  Container,
  Box,
  Typography,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getOrders, updateOrder, deleteOrder } from "../utils/api_orders";
import Swal from "sweetalert2";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("Pending");

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await updateOrder(orderId, newStatus);

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  };

  const handleDelete = async (orderId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteOrder(orderId);
        setOrders((orders) => orders.filter((order) => order._id !== orderId));

        Swal.fire("Deleted!", "The order has been deleted.", "success");
      } catch (error) {
        console.error("Failed to delete order:", error);
        Swal.fire("Error", "Failed to delete order.", "error");
      }
    }
  };
  useEffect(() => {
    getOrders()
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
          My Orders
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
      <Divider sx={{ mt: 3, mb: 3 }} />

      {/* Orders Table */}
      <Container maxWidth="lg">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Customer</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Products</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Total Amount</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Payment Date</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Box display="flex" flexDirection="column">
                      <Typography variant="body1" fontWeight="bold">
                        {item.customerName}
                      </Typography>
                      <Typography variant="body2">
                        ({item.customerEmail})
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex" }}>
                      <Box sx={{ mr: 1 }}>
                        <div>Image</div>
                        <div>Image</div>
                        <div>Image</div>
                      </Box>
                      <Box>
                        {item.products.map((product) => (
                          <div
                            key={product.id || product.name}
                            sx={{ mt: "2px" }}
                          >
                            {product.name}
                          </div>
                        ))}
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>
                    {item.products.reduce(
                      (sum, product) => sum + product.price,
                      0
                    )}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={item.status}
                      size="small"
                      fullWidth
                      onChange={(e) =>
                        handleUpdateStatus(item._id, e.target.value)
                      }
                      disabled={item.status === "pending"}
                    >
                      {item.status === "pending" && (
                        <MenuItem value="pending">Pending</MenuItem>
                      )}

                      <MenuItem value="paid">Paid</MenuItem>
                      <MenuItem value="failed">Failed</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                    </Select>
                  </TableCell>

                  <TableCell>
                    {item.status !== "pending" && item.paid_at
                      ? new Date(item.paid_at).toLocaleString()
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {item.status === "pending" && (
                      <Button
                        color="error"
                        variant="outlined"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default OrdersPage;
