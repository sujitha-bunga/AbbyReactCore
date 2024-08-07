import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../App.css"
import 'bootstrap/dist/css/bootstrap.css'
import { Link } from 'react-router-dom';

const ListProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:7044/api/Products/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <h2>Products List</h2>
            <table className="table  table-striped table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Category</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.productName}</td>
                            <td>{product.productDescription}</td>
                            <td>{product.productCategory}</td>
                            <td>
                                <Link to={`/UpdateProduct/${product.id}`} className="btn btn-edit">Edit</Link>
                                <Link to={`/DeleteProduct/${product.id}`} className="btn btn-delete">Delete</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <a className="btn btn-primary" type="button" href="/addproduct">Add New Product</a>
        </div>
    );
};

export default ListProducts;
