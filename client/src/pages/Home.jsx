import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
	const [post, setPost] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("/posts")
			.then((data) => data.json())
			.then((r) => {
				setPost(r);
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!post) {
		return <div>No post found</div>;
	}

	return (
		<>
			<div className="App">
				{post.map((value, key) => {
					return (
						<Link to={`/posts/${value.id}`} key={key}>
							<div className="post">
								<div className="title">{value.title}</div>
								<div className="body">{value.postText}</div>
								<div className="footer">{value.username}</div>
							</div>
						</Link>
					);
				})}
			</div>
		</>
	);
}

export default Home;
