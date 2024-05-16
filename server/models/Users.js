module.exports = (sequelize, DataTypes) => {
	const Users = sequelize.define("Users", {
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});

	Users.associate = (models) => {
		// User.hasMany(models.Post, {
		// 	foreignKey: "userId",
		// 	as: "posts",
		// });
		Users.hasMany(models.Comment, {
			foreignKey: "userId",
			as: "comments",
		});
	};

	return Users;
};
