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
import { useState, useEffect } from "react";
import { getProduct, updateProduct } from "../utils/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { uploadImage } from "../utils/api_image";
import { API_URL } from "../utils/constants";
import { styled } from "@mui/material/styles";
import { getCategories } from "../utils/api_category";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ProductEdit = () => {
  // retrieve the id from the URL
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  // load the product data from the backend API, and assign it the state
  useEffect(() => {
    getProduct(id)
      .then((productData) => {
        // check if productData is empty or not
        if (productData) {
          // update the state with the productData
          setName(productData ? productData.name : "");
          setDescription(productData ? productData.description : "");
          setPrice(productData ? productData.price : 0);
          setCategory(productData ? productData.category : "");
          setImage(productData ? productData.image : null);
        } else {
          // if not available, set error message
          setError("Product not found");
        }
      })
      .catch((error) => {
        setError("Product not found");
      });
  }, [id]);

  // for the category
  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const handleFormSubmit = async () => {
    if (!name || !price || !category) {
      Swal.fire(
        "Missing Fields",
        "Please fill up the required fields",
        "warning"
      );
      return;
    }

    try {
      await updateProduct(id, name, description, price, category, image);

      await Swal.fire({
        title: "Success!",
        text: "Product has been updated successfully.",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });

      navigate("/");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  if (error) {
    return (
      <>
        <Header />
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          <Typography variant="h3" align="center" mb={2} color="error">
            {error}
          </Typography>
          <Button variant="contained" sx={{ mt: 2 }} component={Link} to="/">
            Back to Products
          </Button>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header />
      <Container>
        <Typography variant="h3" align="center" mb={2}>
          Edit Product
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
            onChange={(e) => setPrice(Number(e.target.value))}
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
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {categories.map((cat) => (
                <MenuItem key={cat._id} value={cat.label}>
                  {cat.label}
                </MenuItem>
              ))}
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
            Update
          </Button>
          <Button
            variant="contained"
            sx={{ mt: 4, backgroundColor: "gray" }}
            component={Link}
            to="/"
          >
            Back
          </Button>
        </Box>
        <Box mb={2} sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {image ? (
            <>
              <img src={API_URL + image} style={{ maxHeight: 80 }} />
              <Typography>Image uploaded</Typography>
              <Button
                color="info"
                variant="contained"
                size="small"
                onClick={() => setImage("")}
              >
                Remove
              </Button>
            </>
          ) : (
            <>
              <Button variant="contained" component="label">
                Upload image
                <VisuallyHiddenInput
                  type="file"
                  onChange={async (event) => {
                    if (event.target.files.length > 0) {
                      try {
                        const data = await uploadImage(event.target.files[0]);
                        setImage(data.image_url);
                      } catch (err) {
                        toast.error("Image upload failed");
                      }
                    }
                  }}
                  accept="image/*"
                />
              </Button>
            </>
          )}
        </Box>
      </Container>
    </>
  );
};

export default ProductEdit;
