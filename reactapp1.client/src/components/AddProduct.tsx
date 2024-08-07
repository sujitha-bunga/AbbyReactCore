// src/components/AddProduct.js
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'

const AddProduct = () => {
    const [productName, setName] = useState('');
    const [ProductDescription, setDescription] = useState('');
    const [productCategory, setCategory] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://localhost:7044/api/products/AddProduct', { productName, ProductDescription, productCategory })
            .then(response => {
                console.log('Product added:', response.data);
                setName('');
                setDescription('');
                setCategory('');
            })
            .catch(error => console.error('Error adding product:', error));
    };

    return (
        <div className="update-product">
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" value={productName} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <input type="text" value={ProductDescription} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Price:</label>
                    <input type="text" value={productCategory} onChange={(e) => setCategory(e.target.value)} required />
                </div>
                <button type="submit">Add Product</button>
            </form>
            <a className="btn btn-update btn-primary" href="/products">Products</a>
        </div>
    );
};

export default AddProduct;
