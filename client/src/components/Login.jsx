import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post("/auth/login", { username, password });
			localStorage.setItem("token", response.data.token);
			window.location.href = "/";
		} catch (error) {
			if (error.response && error.response.status === 400) {
				error.response.data.errors.forEach((err) => toast.error(err.msg));
			} else {
				toast.error("Une erreur s'est produite lors de la connexion.");
			}
		}
	};

	return (
		<>
			<ToastContainer />

			<form onSubmit={handleSubmit}>
				<TextField
					label="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					margin="normal"
					fullWidth
				/>
				<TextField
					label="Password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					margin="normal"
					fullWidth
				/>
				<Button type="submit" variant="contained" color="primary">
					Register
				</Button>
			</form>
		</>
	);
}

export default Login;
