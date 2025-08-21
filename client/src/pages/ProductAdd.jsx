import Header from "../components/Header";
import {
  Button,
  TextField,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Typography,
  Box,
  Container,
} from "@mui/material";
import { useState } from "react";
import { addProduct } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Swal from "sweetalert2";

const ProductAdd = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!name || !price || !category) {
      toast.error("Please fill up the required fields");
      return;
    }
    await addProduct(name, description, price, category);

    Swal.fire({
      icon: "success",
      title: "Product Added",
      text: "New product has been successfully added!",
      showConfirmButton: true,
      confirmButtonColor: "#1976d2",
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <>
      <Header />
      <Container>
        <Typography variant="h3" align="center" mb={2}>
          Add New Product
        </Typography>

        <Box mb={2}>
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>

        <Box mb={2}>
          <TextField
            label="Description"
            fullWidth
            value={description}
            multiline
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>

        <Box mb={2}>
          <TextField
            type="number"
            label="Price"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Box>

        <Box mb={2}>
          <FormControl fullWidth>
            <InputLabel
              id="category-label"
              sx={{ backgroundColor: "white", paddingRight: "5px" }}
            >
              Category
            </InputLabel>
            <Select
              labelId="category-label"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <MenuItem value={"Consoles"}>Consoles</MenuItem>
              <MenuItem value={"Games"}>Games</MenuItem>
              <MenuItem value={"Accessories"}>Accessories</MenuItem>
              <MenuItem value={"Subscriptions"}>Subscriptions</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box mb={2}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleFormSubmit}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 4, backgroundColor: "gray" }}
            component={Link}
            to="/"
          >
            Back
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default ProductAdd;
