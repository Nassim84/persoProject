module.exports = (sequelize, DataTypes) => {
	const Comment = sequelize.define("Comment", {
		content: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		postId: {
			type: DataTypes.INTEGER,
			references: {
				model: "Posts",
				key: "id",
			},
		},
		userId: {
			type: DataTypes.INTEGER,
			references: {
				model: "Users",
				key: "id",
			},
		},
	});

	Comment.associate = (models) => {
		Comment.belongsTo(models.Users, {
			foreignKey: "userId",
			as: "user",
		});
		Comment.belongsTo(models.Post, { foreignKey: "postId", as: "post" });
	};

	return Comment;
};
