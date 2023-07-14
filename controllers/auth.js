const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");

const saltRounds = 10;

const signup = (req, res) => {
  const { username, password } = req.body;
  let sql = "INSERT INTO user (username, pwd) VALUES (?, ?)";

  bcrypt.hash(password, saltRounds, function (err, hash) {
    sql = mysql.format(sql, [username, hash]);

    pool.query(sql, (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY")
          return res.status(409).send("Username is taken");
        return handleSQLError(res, err);
      }
      console.log(result);
      let token = jwt.sign(
        {
          username: username,
          userID: result.insertId,
        },
        process.env.JWTSECRET
      );
      console.log(token);
      return res.send("Sign-up successful");
    });
  });
};

const login = (req, res) => {
  const { username, password } = req.body;
  let sql = "SELECT * FROM user WHERE username = ?";
  sql = mysql.format(sql, [username]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    if (!rows.length) return res.status(404).send("No matching users");

    const hashPwd = rows[0].pwd;
    bcrypt.compare(password, hashPwd).then((result) => {
      if (!result) return res.status(400).send("Invalid password");

      const { pwd, ...userData } = rows[0];

      bcrypt.compare(password, pwd).then((result) => {
        if (!result) return res.status(400).send("Invalid password");

        const token = jwt.sign({ username }, process.env.JWTSECRET);
        res.json({
          msg: "Login successful",
          token,
          username: userData.username,
        });
      });
    });
  });
};

module.exports = {
  signup,
  login,
};
