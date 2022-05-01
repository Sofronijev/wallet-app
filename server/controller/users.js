const pool = require("../config/database");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const { createAccessToken, createRefreshToken } = require("../auth/signToken");

const handleLoginError = (res) =>
  res.status(401).send({ ok: false, data: [], message: "Wrong username or password" });

exports.login = (req, res) => {
  const selectQuery =
    "SELECT id, name, surname, password, username, email FROM users WHERE username=?";
  const formatQuery = mysql.format(selectQuery, [req.body.username]);

  pool.query(formatQuery, async (error, results) => {
    if (error) return handleLoginError(res);

    if (!results.length) {
      return handleLoginError(res);
    }

    const match = await bcrypt.compare(req.body.password, results[0]?.password);

    if (match) {
      const { password, ...data } = results[0];
      const refreshToken = createRefreshToken(data);
      const accessToken = createAccessToken(data);

      return res.status(200).send({
        ok: true,
        data: { ...data, refreshToken, accessToken },
        message: "Successful login",
      });
    } else {
      return handleLoginError(res);
    }
  });
};

exports.test = (req, res) => {
  const selectQuery = "SELECT * FROM users";

  pool.query(selectQuery, async (error, results) => {
    if (error) return handleLoginError(res);

    return res.status(200).send({
      ok: true,
      data: results,
      message: "Success",
    });
  });
};
