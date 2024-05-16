import React, { useState } from "react";
import axios from "axios";
import "../css/CreateComment.css";
import { ToastContainer, toast } from "react-toastify";

const CreateComment = ({ postId }) => {
	const [content, setContent] = useState("");
	const token = localStorage.getItem("token");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				`/comments/${postId}`,
				{ content },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			toast.success("Commentaire ajouté avec succès !");
			setContent("");
		} catch (error) {
			toast.error("Erreur lors de l'ajout du commentaire.");
		}
	};

	return (
		<>
			<ToastContainer />
			<form className="create-comment-form" onSubmit={handleSubmit}>
				<textarea
					rows="4"
					value={content}
					onChange={(e) => setContent(e.target.value)}
					placeholder="Écrivez votre commentaire..."
				/>
				<button type="submit">Envoyer le commentaire</button>
			</form>
		</>
	);
};

export default CreateComment;
