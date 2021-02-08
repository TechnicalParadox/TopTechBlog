# Sequelize Server Template
Featuring ability to switch between locally using local database or a live database, or deployed using JawsDB environment variables

Template .env
```
DEFAULT_PORT='3001' // Set default port for server to listen on
USE_LIVE='0' // Set = 0 if you want to use your local database, set = 1 if you want to use live database
RESET_DB='0' // Set = 0 if you want to start the server normally, set = 1 if you want to reset the database

LOCAL_DB_NAME='my_db' // Set to name of local MySQL database
LOCAL_DB_USER='root' // Set to name of local MySQL database user
LOCAL_DB_PW='toor' // Set to password of local MySQL database

LIVE_DB_HOST='' // Set to host of live database
LIVE_DB_NAME='' // Set to name of live database
LIVE_DB_USER='' // Set to name of live database user
LIVE_DB_PW='' // Set to password of live database user
LIVE_DB_PORT='' // Set to port of live database
```
