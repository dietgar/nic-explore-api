module.exports = {
  port: process.env.PORT || 8000,
  db: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'database',
    port: process.env.DB_PORT || 3306
  }
};