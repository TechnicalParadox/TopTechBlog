// Dependencies
// ------------
// Sequelize
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// BCrypt
const bcrypt = require('bcrypt');

// 'users' table class Sequelize Model

class User extends Model
{
  /**
   * checks if the passed password matches the User's encrypted password
   * @param  {String}  pass the password we want to verify
   * @return {Promise}      return boolean, true if pass matches User's pass
   */
  async checkPassword(pass)
  {
    const match = await bcrypt.compare(pass, this.passhash);
    return match;
  }
}

User.init(
{
  id: // PRIMARY KEY - unique String for user ID, ex. 'user-s34m23kxsd2'
  {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  email: // the User's email address
  {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  username: // the User's username
  {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { len: [3] }
  },
  passhash: // the User's password, hashed with bcrypt
  {
    type: DataTypes.STRING,
    allowNull: false
  },
  level: // the User's authorization level
  {
    type: DataTypes.INTEGER,
    allowNull: false,
    default: 0
  }
},
{
  // Hooks
  hooks:
  {
    // to be done before we INSERT the User into the database
    async beforeCreate(newUserData)
    {
      // hash the password with bcrypt
      newUserData.password = await bcrypt.hash(newUserData.password, 10);
      return newUserData;
    },
    // to be done before we UPDATE the existing User in the database
    async beforeUpdate(updatedUserData)
    {
      // hash the updated password with bcrypt
      updatedUserData.password = await bcrypt.hash(newUserData.password, 10);
      return updatedUserData;
    }
  },
  sequelize,
  underscored: true,
  modelName: 'user'
});
