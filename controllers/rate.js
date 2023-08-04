const mysql = require("mysql2");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");

const getAllRatings = (req, res) => {
  pool.query("SELECT * FROM gamerating", (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

// GET a specific rating by ID
const getRatingById = (req, res) => {
  const ratingId = req.params.id;
  pool.query(
    "SELECT * FROM gamerating WHERE ratingID = ?",
    [ratingId],
    (err, rows) => {
      if (err) return handleSQLError(res, err);
      if (rows.length === 0)
        return res.status(404).json({ error: "Rating not found" });
      return res.json(rows[0]);
    }
  );
};

// createRating
const createRating = async (req, res) => {
  let sql = "INSERT INTO gamerating (userID, vote) VALUES (?, ?)";
  sql = mysql.format(sql, [req.body.userID, req.body.vote]);
  pool.query(sql, (err, results) => {
    if (err) {
      // if (results === 0) {
      //   return res.status(400).json({ error: "User has already voted" });
      // }
      return handleSQLError(res, err);
    }
    return res.json({ newId: results.insertId });
  });
  console.log(sql);
};

// updateRatingByID
const updateRatingByID = (req, res) => {
  let sql = "UPDATE gamerating SET vote = ? WHERE userID = ?";
  sql = mysql.format(sql, [req.body.vote, req.body.userID]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.status(204).json();
  });
  console.log(sql);
};

// DELETE a rating
const deleteRating = (req, res) => {
  let sql = "DELETE FROM gamerating WHERE userID = ?";
  sql = mysql.format(sql, [req.params.userID]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  });
};

module.exports = {
  getAllRatings,
  getRatingById,
  createRating,
  updateRatingByID,
  deleteRating,
};
