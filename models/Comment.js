// Dependencies
// ------------
// Sequelize
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

// 'comments' table class Sequelize Model

class Comment extends Model
{
  verifyOwner(userId) { return userId == this.owner; }
}

Comment.init(
{
  id: // PRIMARY KEY
  {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  owner: // id of the User who created the post
  {
    type: DataTypes.STRING(32),
    allowNull: false,
    references: { model: 'user', key: 'id' }
  },
  post: // id of the Post the Comment was made on
  {
    type: DataTypes.STRING(32),
    allowNull: false,
    references: { model: 'post', key: 'id' }
  },
  text: // the text of the Comment, max length of 500 chars
  {
    type: DataTypes.STRING(500),
    allowNull: false,
    validate: { len: [1] }
  }
},
{
  // Hooks
  hooks: {},
  sequelize,
  underscored: true,
  modelName: 'comment',
  freezeTableName: true
});

module.exports = Comment;
