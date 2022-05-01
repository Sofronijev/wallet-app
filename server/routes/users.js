const express = require("express");
const router = express.Router();
const { login, test } = require("../controller/users");

router.post("/login", login);
router.get("/", test);

module.exports = router;
