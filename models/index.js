// Import Models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Define Model Associations

// A User can have many Posts
User.hasMany(Post, { foreignKey: 'owner', as: 'users_posts' });
// A Post belongs to a User
Post.belongsTo(User, { foreignKey: 'owner', as: 'post_owner' });

// A User can have many Comments
User.hasMany(Comment, { foreignKey: 'owner', as: 'users_comments' });
// A Comment belongs to a User
Comment.belongsTo(User, { foreignKey: 'owner', as: 'comment_owner' });

// A Post can have many Comments
Post.hasMany(Comment, { foreignKey: 'post', as: 'post_comments' });
// A Comment belongs to a Post
Comment.belongsTo(Post, { foreignKey: 'post', as: 'commented_on' });

// Export Models
module.exports = { User, Post, Comment };
