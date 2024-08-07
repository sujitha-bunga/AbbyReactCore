// src/components/DeleteProduct.js
import React, { useState } from 'react';
import axios from 'axios';

const DeleteProduct = () => {
    const [id, setId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.delete(`https://localhost:7044/api/products/DeleteProduct/${id}`)
            .then(response => console.log('Product deleted:', response.data))
            .catch(error => console.error('Error deleting product:', error));
    };

    return (
        <div className="update-product">
            <h2>Delete Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>ID:</label>
                    <input type="number" value={id} onChange={(e) => setId(e.target.value)} required />
                </div>
                <button type="submit">Delete Product</button>
            </form>
            <a className="btn btn-update btn-primary" href="/products">Products</a>
        </div>
    );
};

export default DeleteProduct;
