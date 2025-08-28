import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
} from "@mui/material";
import { Link } from "react-router";
import {
  getCategories,
  addCategory,
  deleteCategory,
  updateCategory,
} from "../utils/api_category";
import Swal from "sweetalert2";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const handleAdd = async () => {
    if (!newCategory.trim()) return;
    await addCategory(newCategory);
    setNewCategory("");
    fetchCategories();
  };

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
        await deleteCategory(id);
        setCategories((cat) => cat.filter((c) => c._id !== id));

        Swal.fire("Deleted!", "The category has been deleted.", "success");
        fetchCategories();
      } catch (error) {
        Swal.fire("Error!", "Failed to delete category.", "error");
      }
    }
  };

  const handleEdit = async (id, currentLabel) => {
    const { value: newLabel } = await Swal.fire({
      title: "Edit Category",
      input: "text",
      inputLabel: "Category name",
      inputValue: currentLabel,
      showCancelButton: true,
      confirmButtonText: "Update",
      confirmButtonColor: "#1976d2",
      cancelButtonColor: "#6b7280",
    });
    if (newLabel) {
      try {
        await updateCategory(id, newLabel);
        Swal.fire("Updated!", "The category has been updated.", "success");
        fetchCategories();
      } catch (error) {
        Swal.fire("Error!", "Failed to update category.", "error");
      }
    }
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
          Categories
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
          <Button component={Link} to="/categories" variant="outlined">
            Categories
          </Button>
        </Box>
      </div>
      <Divider sx={{ mt: 3, mb: 3 }} />
      <Container>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Categories
        </Typography>
        {/* add categories */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={2}
          sx={{ mb: 3 }}
        >
          <TextField
            label="Category Name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={handleAdd}>
            Add
          </Button>
        </Box>
        <TableContainer variant={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((cat, index) => (
                <TableRow key={index}>
                  <TableCell>{cat.label}</TableCell>
                  <TableCell>
                    <Box display="flex" gap={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEdit(cat._id, cat.label)}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(cat._id)}
                      >
                        Delete
                      </Button>
                    </Box>
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

export default CategoriesPage;
