const pool = require("../config/database");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const { createAccessToken, createRefreshToken } = require("../auth/signToken");

const handleLoginError = (res) => res.status(401).send("Wrong email or password");

exports.login = (req, res) => {
  const selectQuery =
    "SELECT id, name, password, email FROM users WHERE email=?";
  const formatQuery = mysql.format(selectQuery, [req.body.email]);

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

      return res.status(200).send({ data, token: { refreshToken, accessToken } });
    } else {
      return handleLoginError(res);
    }
  });
};

