import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "/api";

function App() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    quantity: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/products/`);
      setProducts(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Error fetching products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { name, price, quantity } = newProduct;

    if (!name || !price || !quantity) {
      alert("Please fill all fields");
      return;
    }

    const productData = {
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
    };

    try {
      if (editingId) {
        await axios.put(`${API_BASE}/products/${editingId}`, productData);
        setEditingId(null);
      } else {
        await axios.post(`${API_BASE}/products/`, productData);
      }

      setNewProduct({ name: "", price: "", quantity: "" });
      fetchProducts();
    } catch (err) {
      console.error("Submit error:", err.response?.data || err.message);
      alert(editingId ? "Error updating product" : "Error adding product");
    }
  };

  const handleEdit = (product) => {
    setNewProduct({
      name: product.name,
      price: product.price.toString(),
      quantity: product.quantity.toString(),
    });
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`${API_BASE}/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      alert("Error deleting product");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Inventory Products</h1>

      <div style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h3>{editingId ? "Edit Product" : "Add New Product"}</h3>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleInputChange}
            style={{ padding: "8px", flex: 1, minWidth: "180px" }}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleInputChange}
            step="0.01"
            style={{ padding: "8px", width: "120px" }}
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={newProduct.quantity}
            onChange={handleInputChange}
            min="0"
            style={{ padding: "8px", width: "120px" }}
          />
          <button
            onClick={handleSubmit}
            style={{
              padding: "8px 16px",
              background: editingId ? "#4CAF50" : "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {editingId ? "Update Product" : "Add Product"}
          </button>

          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setNewProduct({ name: "", price: "", quantity: "" });
              }}
              style={{
                padding: "8px 16px",
                background: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f5f5f5" }}>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.quantity}</td>
              <td>
                <button
                  onClick={() => handleEdit(p)}
                  style={{
                    marginRight: "8px",
                    padding: "6px 12px",
                    background: "#FFC107",
                    color: "black",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  style={{
                    padding: "6px 12px",
                    background: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {products.length === 0 && (
        <p style={{ textAlign: "center", color: "#777", marginTop: "20px" }}>
          No products yet. Add one above!
        </p>
      )}
    </div>
  );
}

export default App;