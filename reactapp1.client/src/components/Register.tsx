// RegistrationForm.js

import axios from 'axios';
import { useForm } from 'react-hook-form';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css'
 

const RegistrationForm = () => {
   
    return (

        <div className="registration-form Container">
            <h1>Register</h1>
            <form onSubmit={RegisterHandler}>
                <div className="form-group">
                    <label htmlFor="username">Full Name</label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div className="form-group">
                    <label htmlFor="firstname">Full Name</label>
                    <input type="text" id="firstname" name="firstname" required />
                </div>
                <div className="form-group">
                    <label htmlFor="lastname">Full Name</label>
                    <input type="text" id="lastname" name="lastname" required />
                </div>
                <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <select id="role" name="role" required>
                        <option value="" disabled selected>Select your role</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="moderator">Moderator</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <div className="form-group">
                    <label htmlFor="confirm_password">Confirm Password</label>
                    <input type="password" id="confirm_password" name="confirm_password" required />
                </div>
                <button type="submit">Register</button>
            </form>
            <div className="message">
                <p>Already have an account? <a href="/login">Login here</a></p>
            </div>
        </div>
    );

    async function RegisterHandler(e) {
        e.preventDefault();
        const form_ = e.target, submitter = document.querySelector("input.login");

        const formData = new FormData(form_, submitter), dataToSend = {};

        for (const [key, value] of formData) {
            dataToSend[key] = value;
        }

        if (dataToSend.Remember === "on") {
            dataToSend.Remember = true;
        }

        console.log("login data before send: ", dataToSend);
        const response = await fetch("https://localhost:7044/api/User/register", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(dataToSend),
            headers: {
                "content-type": "Application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": '*'
            }
        });
        console.log("register data before send: ", dataToSend);
        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("user", dataToSend.username);
            document.location = "/login";
        }

        const messageEl = document.querySelector(".message");
        if (data.message) {
            messageEl.innerHTML = data.message;
        } else {
            messageEl.innerHTML = "Something went wrong, please try again";
        }

        console.log("registration error: ", data);
    }
};

export default RegistrationForm;
