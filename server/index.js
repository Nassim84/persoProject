const express = require("express");
const { sequelize } = require("./models");
const postRouter = require("./routes/Post");
const CommentsRouter = require("./routes/Comments");
const UserRouter = require("./routes/Users");

const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/posts", postRouter);
app.use("/comments", CommentsRouter);
app.use("/auth", UserRouter);

sequelize
	.sync({ force: true })
	.then(() => {
		console.log("Database synchronized!");
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	})
	.catch((error) => {
		console.error("Error synchronizing database:", error);
	});
