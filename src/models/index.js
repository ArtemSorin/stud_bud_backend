const sequelize = require('../config/db');

const User = require('./user.model');
const Post = require('./post.model');
const Like = require('./like.model');
const Chat = require('./chat.model');
const Message = require('./message.model');
const Interest = require('./interest.model');


const initModels = async () => {
    Post.belongsTo(User, { foreignKey: 'user_id', as: 'author' });
    User.hasMany(Post, { foreignKey: 'user_id' });

    Like.belongsTo(User, { foreignKey: 'user_id' });
    User.hasMany(Like, { foreignKey: 'user_id' });

    Like.belongsTo(Post, { foreignKey: 'post_id' });
    Post.hasMany(Like, { foreignKey: 'post_id' });

    User.belongsToMany(Interest, { through: 'UserInterest', foreignKey: 'user_id' });
    Interest.belongsToMany(User, { through: 'UserInterest', foreignKey: 'interest_id' });

    User.belongsToMany(Post, { through: Like, foreignKey: 'user_id', as: 'LikedPosts' });
    Post.belongsToMany(User, { through: Like, foreignKey: 'post_id', as: 'LikedBy' });

    await sequelize.sync({ alter: true });
};

module.exports = {
    sequelize,
    User,
    Post,
    Like,
    Chat,
    Message,
    initModels,
};
