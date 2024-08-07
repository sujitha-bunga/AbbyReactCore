// src/components/UpdateProduct.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'

const UpdateProduct = () => {
    const [product, setProduct] = useState({ productName: '', ProductDescription: '',productCategory :''});
    const { id } = useParams();

    useEffect(() => {
        axios.get(`https://localhost:7044/api/Products/${id}`)
            .then(response => setProduct(response.data))
            .catch(error => console.error('Error fetching product:', error));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`https://localhost:7044/api/Products/UpdateProduct/${id}`, product)
            .then(response => console.log('Product updated:', response.data))
            .catch(error => console.error('Error updating product:', error));
    };

    return (
        <div className="update-product">
            <h2>Update Product</h2>
            <form onSubmit={handleSubmit} className="update-form">
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" value={product.productName} onChange={(e) => setProduct({ ...product, productName: e.target.value })} required />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <input type="text" value={product.ProductDescription} onChange={(e) => setProduct({ ...product, ProductDescription: e.target.value })} required />
                </div>
                <div className="form-group"> 
                    <label>Category:</label>
                    <input type="text" value={product.productCategory} onChange={(e) => setProduct({ ...product, productCategory: e.target.value })} required />
                </div>
                <button type="submit" className="btn btn-update btn-info">Update Product</button>
            </form>

            <a className="btn btn-update btn-primary" href="/products">Products</a>
        </div>
    );
};

export default UpdateProduct;
