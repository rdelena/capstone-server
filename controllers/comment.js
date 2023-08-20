const mysql = require("mysql2");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");

const getAllComments = (req, res) => {
  pool.query("SELECT * FROM comments", (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const postComment = (req, res) => {
  const { commentText, userID } = req.body;

  let sql =
    "INSERT INTO comments (commentText, userID, username, parent_commentID) VALUES (?, ?, (SELECT username FROM user WHERE id = ?), ?)";

  sql = mysql.format(sql, [commentText, userID, userID, null]);
  pool.query(sql, (err, results) => {
    if (err) {
      return handleSQLError(res, err);
    }
    return res.json({ commentID: results.insertId });
  });
  console.log(sql);
};

module.exports = {
  getAllComments,
  postComment,
};
