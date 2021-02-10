// Import Models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Define Model Associations

// A User can have many Posts
User.hasMany(Post, { foreignKey: 'owner' });
// A Post belongs to a User
Post.belongsTo(User, { foreignKey: 'owner' });

// A User can have many Comments
User.hasMany(Comment, { foreignKey: 'owner' });
// A Comment belongs to a User
Comment.belongsTo(User, { foreignKey: 'owner' });

// A Post can have many Comments
Post.hasMany(Comment, { foreignKey: 'post' });
// A Comment belongs to a Post
Comment.belongsTo(Post, { foreignKey: 'post' });

// Export Models
module.exports = { User, Post, Comment };
