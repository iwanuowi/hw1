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
import { addProduct } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { styled } from "@mui/material/styles";
import { uploadImage } from "../utils/api_image";
import { API_URL } from "../utils/constants";
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

const ProductAdd = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState([]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!name || price <= 0 || !category) {
      toast.error("Please fill up the required fields");
      return;
    }
    await addProduct(name, description, price, category, image);

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

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

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
