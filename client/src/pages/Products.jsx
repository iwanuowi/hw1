import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Select,
  MenuItem,
} from "@mui/material";
import { getProducts, deleteProduct } from "../utils/api";
import { AddToCart } from "../utils/cart";
import Header from "../components/Header";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { toast, Toaster } from "sonner";

function Products() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [page, setPage] = useState(1);

  // fetch whenever page or category changes
  useEffect(() => {
    getProducts(selectedCategory, page).then((data) => setProducts(data));
  }, [page, selectedCategory]);

  // filter products (in case your API doesn’t handle category)
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleDelete = async (id) => {
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
        await deleteProduct(id);
        setProducts((prev) => prev.filter((p) => p._id !== id));

        Swal.fire("Deleted!", "The product has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting product:", error);
        Swal.fire("Error!", "Failed to delete product.", "error");
      }
    }
  };

  // handle the add to cart
  const handleAddToCart = (product) => {
    AddToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      category: product.category,
    });
    toast.success("Added to Cart successfully");
  };

  return (
    <>
      <Header />
      <Toaster />
      <Box sx={{ p: 2, pt: 0 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h5" fontWeight="bold">
            Products
          </Typography>
          <Button
            variant="contained"
            to="/products/new"
            component={Link}
            sx={{ backgroundColor: "#40C058" }}
          >
            Add New
          </Button>
        </Box>

        {/* Category Selector */}
        <Select
          value={selectedCategory}
          onChange={(event) => {
            setSelectedCategory(event.target.value);
            setPage(1); // reset page when category changes
          }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="Consoles">Consoles</MenuItem>
          <MenuItem value="Games">Games</MenuItem>
          <MenuItem value="Accessories">Accessories</MenuItem>
          <MenuItem value="Subscriptions">Subscriptions</MenuItem>
        </Select>
      </Box>
      <Box sx={{ p: 9, pt: 0 }}>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignContent="center"
        >
          {filteredProducts.map((product, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card
                sx={{
                  height: "250px",
                  width: "500px",
                  boxShadow: 3,
                  borderRadius: 2,
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {product.name}
                  </Typography>

                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                  >
                    <Chip
                      label={`$${product.price}`}
                      sx={{
                        backgroundColor: "#6CCF80",
                        color: "#EBFBEE",
                        fontWeight: "bold",
                      }}
                    />
                    <Chip
                      label={product.category?.toUpperCase()}
                      sx={{
                        backgroundColor: "#ffedd5",
                        color: "#d97706",
                        fontWeight: "bold",
                      }}
                    />
                  </Box>

                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#218BE6",
                      mb: 2,
                      "&:hover": { backgroundColor: "#1d4ed8" },
                    }}
                    fullWidth
                    onClick={() => handleAddToCart(product)}
                  >
                    Add To Cart
                  </Button>

                  <Box display="flex" justifyContent="space-between">
                    <Button
                      variant="contained"
                      component={Link}
                      to={`/products/${product._id}/edit`}
                    >
                      Edit
                    </Button>

                    <Button
                      onClick={() => handleDelete(product._id)}
                      variant="contained"
                      sx={{
                        backgroundColor: "#FA5252",
                        "&:hover": { backgroundColor: "#dc2626" },
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredProducts.length === 0 && (
          <Typography variant="h5" align="center" py={3}>
            No more products found.
          </Typography>
        )}

        {/* Pagination Controls */}
        <Box
          sx={{
            pt: 2,
            pb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>
          <span>Page: {page}</span>
          <Button
            variant="contained"
            disabled={filteredProducts.length === 0}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Products;
