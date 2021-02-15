// Dependencies
// ------------
// dotENV config ./.env environment variables file
require('dotenv').config(); // for process.env.DEFAULT_PORT
// express server
const express = require('express');
// express handlebars templating engine
const exphbs  = require('express-handlebars');
// body parser
const bodyParser = require('body-parser');
// path
const path = require('path');
// // TODO: delete if unneeded const mysql = require('mysql2');
// sequelize MySQL database
const sequelize = require('./config/connection');
// our API/HTML routes
const routes = require('./controllers');
// Session
const session = require('express-session');
// Sequelize Store
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Create an instance of the express app.
const app = express();
// Set port for connection
const PORT = process.env.PORT || process.env.DEFAULT_PORT || 3001; // deployment environment || local environment .env || default 3001

// Start/Use Session
const sess =
{
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUnitialized: true,
  store: new SequelizeStore(
  {
    db: sequelize
  })
};
app.use(session(sess));

// Added so body parser can handle post requests.
// If we didn't have this the body would come back as undefined
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Host static Asset files so Public css and js files can be retrieved by client
app.use(express.static(path.join(__dirname, '/public')));


// Set Handlebars as the default templating engine
app.engine("handlebars", exphbs({ deafaultLayout: "main" }));
app.set("view engine", "handlebars");

// Use our routes defined in ./controllers
app.use(routes);

// sync sequelize models to the database, then turn on the server
// If we want to hard reset the database, set "RESET_DB"="1" in <installationDirectory>/.env
if (process.env.RESET_DB === "1")
{
  sequelize.query("SET FOREIGN_KEY_CHECKS = 0")
  .then(() =>
  {
    sequelize.sync({ force: true }).then(() =>
    {
      app.listen(PORT, () => console.log(`Reset DB\n Server listening on port ${PORT}!`));
    });
  })
  .catch((err) => { console.log(err); });
}
// Otherwise just start the server
else
{
  sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
  });
}
