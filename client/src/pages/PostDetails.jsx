import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentList from "../components/CommentList";
import CreateComment from "../components/CreateComment";

import "../css/PostDetails.css";

import axios from "axios";

const PostDetails = () => {
	const [post, setPost] = useState(null);
	const { id } = useParams();

	useEffect(() => {
		const fetchPost = async () => {
			const response = await axios.get(`/posts/${id}`);
			setPost(response.data);
		};

		fetchPost();
	}, [id]);

	if (!post) {
		return <div>Chargement...</div>;
	}

	return (
		<>
			<div className="post-details">
				<h2>{post.title}</h2>
				<p>{post.postText}</p>
				<p className="username">Par {post.username}</p>
			</div>
			<div>
				<CommentList postId={post.id} />
			</div>
			<div>
				<CreateComment postId={post.id} />
			</div>
		</>
	);
};

export default PostDetails;
