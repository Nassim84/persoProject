import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

function Register() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const handleRegister = async (e) => {
		e.preventDefault();

		try {
			await axios.post("/auth/register", { username, password });
			window.location.href = "/login";
		} catch (error) {
			if (error.response && error.response.status === 400) {
				error.response.data.errors.forEach((err) => toast.error(err.msg));
			} else {
				toast.error("Une erreur s'est produite lors de l'inscription.");
			}
		}
	};

	return (
		<>
			<ToastContainer />
			<Container maxWidth="sm">
				<Typography variant="h4" align="center" gutterBottom>
					Register
				</Typography>
				<form onSubmit={handleRegister}>
					<TextField
						label="Username"
						variant="outlined"
						fullWidth
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						margin="normal"
					/>
					<TextField
						label="Password"
						variant="outlined"
						fullWidth
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						margin="normal"
					/>
					<Button variant="contained" color="primary" type="submit" fullWidth>
						Register
					</Button>
				</form>
			</Container>
		</>
	);
}

export default Register;
