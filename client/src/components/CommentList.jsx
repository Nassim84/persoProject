import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/CommentList.css";
import moment from "moment";

const CommentList = ({ postId }) => {
	const [comments, setComments] = useState([]);

	useEffect(() => {
		const fetchComments = async () => {
			try {
				const response = await axios.get(`/comments/${postId}`);
				setComments(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchComments();
	}, [postId]);

	return (
		<div className="comment-list">
			{comments.map((comment) => (
				<div className="comment-item" key={comment.id}>
					<h3 className="comment-content">{comment.content}</h3>
					<p className="comment-date">
						{moment(comment.createdAt).format("DD MMMM YYYY, HH:mm")}
					</p>
					{comment.updatedAt !== comment.createdAt && (
						<p className="comment-updated">
							Modifié le :{" "}
							{moment(comment.updatedAt).format("DD MMMM YYYY, HH:mm")}
						</p>
					)}
				</div>
			))}
		</div>
	);
};

export default CommentList;
