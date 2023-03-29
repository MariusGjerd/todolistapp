const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "Complete12@@@",
  host: "localhost",
  database: "todo",
  post: "5432",
});

module.exports = pool;
