const mysql = require("mysql2");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");
const getAllUsers = (req, res) => {
  pool.query("SELECT * FROM user", (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};
const getUserByUsername = (req, res) => {
  const { username } = req.params;
  let sql = "SELECT id FROM user WHERE username = ?";
  sql = mysql.format(sql, [username]);
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const user = rows[0];
    return res.json(user);
  });
};
module.exports = {
  getAllUsers,
  getUserByUsername,
};
