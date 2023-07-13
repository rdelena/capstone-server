const mysql = require("mysql2");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");

const getAllComments = (req, res) => {
  pool.query("SELECT * FROM comments", (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

// Get Comments by ID
const getCommentById = (req, res) => {
  const commentId = req.params.id;
  pool.query(
    "SELECT * FROM comments WHERE commentID = ?",
    [commentId],
    (err, rows) => {
      if (err) {
        return handleSQLError(res, err);
      }
      if (rows.length === 0) {
        return res.status(404).json({ error: "Comment not found" });
      }
      return res.json(rows[0]);
    }
  );
};

const postComment = (req, res) => {
  let sql =
    "INSERT INTO comments (commentText, userID, username, parent_commentID) VALUES (?, ?, (SELECT username FROM user WHERE id = ?), ?)";

  sql = mysql.format(sql, [
    req.body.commentText,
    req.body.userID,
    req.body.userID,
    null,
  ]);
  pool.query(sql, (err, results) => {
    if (err) {
      return handleSQLError(res, err);
    }
    return res.json({ commentID: results.insertId });
  });
  console.log(sql);
};

const postReply = (req, res) => {
  const { commentText, userID, parentCommentID } = req.body;

  // Fetch the username based on the userID
  const getUsernameQuery = "SELECT username FROM user WHERE id = ?";
  const usernameValues = [userID];

  pool.query(
    getUsernameQuery,
    usernameValues,
    (usernameErr, usernameResults) => {
      if (usernameErr) {
        return handleSQLError(res, usernameErr);
      }
      const username = usernameResults[0].username;
      const insertReplyQuery =
        "INSERT INTO comments (commentText, userID, username, parent_commentID) VALUES (?, ?, ?, ?)";
      const insertReplyValues = [
        commentText,
        userID,
        username,
        parentCommentID,
      ];

      pool.query(
        insertReplyQuery,
        insertReplyValues,
        (insertErr, insertResults) => {
          if (insertErr) {
            return handleSQLError(res, insertErr);
          }
          return res.status(201).json({ commentID: insertResults.insertId });
        }
      );
    }
  );
};

// UPDATE an existing comment
const updateCommentById = (req, res) => {
  let sql = "UPDATE comments SET commentText = ? WHERE commentID = ?";
  sql = mysql.format(sql, [req.body.commentText, req.params.id]);
  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.status(204).json();
  });
};

const deleteComment = (req, res) => {
  const commentId = req.params.id;
  pool.query(
    "DELETE FROM comments WHERE commentID = ?",
    [commentId],
    (err, results) => {
      if (err) {
        return handleSQLError(res, err);
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Comment not found" });
      }
      return res.status(200).json({ message: "Comment deleted successfully" });
    }
  );
};

module.exports = {
  getAllComments,
  getCommentById,
  postComment,
  postReply,
  updateCommentById,
  deleteComment,
};
