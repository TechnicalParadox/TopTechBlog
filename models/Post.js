// Dependenices
// ------------
// Sequelize
{ Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

// 'posts' table class Sequelize Model

class Post extends Model
{

}

Post.init(
{
  id: // PRIMARY KEY - unique String for Post ID, ex. 'post-x2l3nhb31j3ka'
  {
    type: DataTypes.STRING(32),
    allowNull: false,
    primaryKey: true
  },
  owner: // the User.id of the Post's creator
  {
    type: DataTypes.STRING(32),
    allowNull: false,
    references: { model: 'user', key: 'id' }
  },
  title: // the title of the Post
  {
    type: DataTypes.STRING(32),
    allowNull: false,
    validate: { len: [1] }
  },
  text: // the text of the Post
  {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: { len: [1] }
  }
},
{
  // Hooks
  hooks:
  {

  },
  sequelize,
  underscored: true,
  modelName: 'post'
});

module.exports = Post;
