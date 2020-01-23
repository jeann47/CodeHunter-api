module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define("post", {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    mainImg: DataTypes.STRING,
    images: DataTypes.ARRAY(DataTypes.STRING),
    texts: DataTypes.ARRAY(DataTypes.STRING),
    videoLink: DataTypes.STRING,
    tags: DataTypes.ARRAY(DataTypes.STRING),
    type: DataTypes.STRING
  });
  return post;
};
