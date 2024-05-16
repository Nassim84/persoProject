import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

function Navbar() {
	return (
		<nav className="navbar">
			<div className="logo">Logo</div>
			<ul>
				<li>
					<Link to="/">Accueil</Link>
				</li>
				<li>
					<Link to="/create-post">Créer un post</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
