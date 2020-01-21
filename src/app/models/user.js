const {post} = require('./index')

module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        name: DataTypes.STRING,
        login: DataTypes.STRING,
        password: DataTypes.STRING,
        pic: DataTypes.STRING,
        bio: DataTypes.STRING,
        email: DataTypes.STRING,
        gitHub: DataTypes.STRING,
        stackOverflow: DataTypes.STRING,
        linkedIn: DataTypes.STRING,
        instagram: DataTypes.STRING,
        techs: DataTypes.ARRAY(DataTypes.STRING),
        notes: DataTypes.ARRAY(DataTypes.STRING),
        type: DataTypes.BOOLEAN,
    })
    return user
}