import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Divider,
  Select,
  MenuItem,
} from "@mui/material";
import { getProducts } from "../utils/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Category");

  useEffect(() => {
    getProducts().then((data) => setProducts(data));
  }, []);

  if (products.length === 0) {
    return (
      <Typography variant="h6" align="center" mt={5}>
        No products available.
      </Typography>
    );
  }

  // generate unique categories from products
  const categories = [
    "All Category",
    ...new Set(products.map((p) => p.category)),
  ];

  // filter products by category
  const filteredProducts =
    selectedCategory === "All Category"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <>
      <Box
        sx={{
          p: 2,
        }}
      >
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
          Welcome to My Store
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" fontWeight="bold">
            Products
          </Typography>
          <Button variant="contained" color="success">
            Add New
          </Button>
        </Box>

        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          size="small"
        >
          {categories.map((cat, i) => (
            <MenuItem key={i} value={cat}>
              {cat.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box
        sx={{
          p: 9,
          pt: 0,
        }}
      >
        <Grid
          container
          spacing={3}
          sx={{
            justifyContent: "center",
            alignContent: "center",
            display: "flex",
          }}
        >
          {filteredProducts.map((product, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card
                sx={{
                  height: "300px",
                  width: "500px",
                  boxShadow: 3,
                  borderRadius: 2,
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
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
                        backgroundColor: "#d1fae5",
                        color: "#0eca3a",
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
                      backgroundColor: "#2563eb",
                      mb: 2,
                      "&:hover": { backgroundColor: "#1d4ed8" },
                    }}
                    fullWidth
                  >
                    Add To Cart
                  </Button>

                  <Box display="flex" justifyContent="space-between">
                    <Button
                      variant="contained"
                      sx={{
                        borderRadius: "20px",
                        backgroundColor: "#3b82f6",
                        "&:hover": { backgroundColor: "#2563eb" },
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        borderRadius: "20px",
                        backgroundColor: "#ef4444",
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
      </Box>
    </>
  );
}

export default Products;
