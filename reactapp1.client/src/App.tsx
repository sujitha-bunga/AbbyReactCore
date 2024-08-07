import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import Products from "./components/Product"
import AddProduct from "./components/AddProduct"
import DeleteProduct from "./components/DeleteProduct"
import UpdateProduct from "./components/UpdateProduct"
//import About from "./components/about"
//import ProtectedRoute from "./components/ProtectedRoute"
/*import { AuthProvider } from './components/AuthContext';*/
import './App.css';



const App = () => {
    return (
       <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/products" element={<Products />} />
                <Route path="/updateproduct/:id" element={<UpdateProduct />} />
                <Route path="/deleteproduct/:id" element={<DeleteProduct />} />
                <Route path="/addproduct" element={<AddProduct />} />
            </Routes>
        </>
    );
};

export default App;