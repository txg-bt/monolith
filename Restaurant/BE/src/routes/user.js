const router = require("express").Router();
const bcrypt = require("bcrypt");
const { pool } = require("../database/database");
const jwtGenerator = require("../utils/jwtGenerator");
const validator = require("../middleware/validator");

const logWritter = require("../utils/logWritter");

router.post("/register", validator, async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length > 0) {
      logWritter("user", "register", null, null, "fail");

      return res.status(400).send("User already exists");
    }

    const saltRounds = 10;
    const genSalt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, genSalt);

    const newUser = await pool.query(
      "INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING *",
      [email, hash, username]
    );

    const token = jwtGenerator(
      newUser.rows[0].user_id,
      newUser.rows[0].username,
      newUser.rows[0].email
    );

    logWritter("user", "register", newUser.rows[0].user_id, null, "success");

    const output = {
      user_id: newUser.rows[0].user_id,
      username: newUser.rows[0].username,
      email: newUser.rows[0].email,
    };

    return res.status(201).json({ token, ...output });
  } catch (err) {
    logWritter(err.message);

    return res.status(500).send(err.message);
  }
});
// login route

router.post("/login", validator, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      logWritter("user", "login", null, null, "fail");

      return res.status(400).send("User does not exist");
    }

    const validPass = await bcrypt.compare(password, user.rows[0].password);

    if (!validPass) {
      return res.status(400).json("Incorrect password");
    }

    const token = jwtGenerator(
      user.rows[0].user_id,
      user.rows[0].username,
      user.rows[0].email
    );

    output = {
      userId: user.rows[0].userid,
      username: user.rows[0].username,
      email: user.rows[0].email,
    };

    logWritter("performed register");

    return res.status(201).json({ token, ...output });
  } catch (err) {
    logWritter(err.message);

    return res.status(500).send(err.message);
  }
});

module.exports = router;
