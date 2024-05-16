import React, { useState } from "react";
import axios from "axios";
import "../css/CreatePost.css";

function CreatePost() {
	const [title, setTitle] = useState("");
	const [postText, setPostText] = useState("");
	const [username, setUsername] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newPost = {
			title,
			postText,
			username,
		};
		await axios.post("/posts", newPost);
		window.location.href = "/";
	};

	return (
		<div className="create-post-container">
			<form className="create-post-form" onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Titre"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="create-post-input"
					required
				/>
				<textarea
					placeholder="Texte du post"
					value={postText}
					onChange={(e) => setPostText(e.target.value)}
					className="create-post-textarea"
					required
				/>
				<input
					type="text"
					placeholder="Nom d'utilisateur"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className="create-post-input"
					required
				/>
				<button type="submit" className="create-post-button">
					Créer le post
				</button>
			</form>
		</div>
	);
}

export default CreatePost;
