module.exports = (req, res, next) => {
  const { email, password, username } = req.body;

  function validateEmail(userEmail) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(userEmail).toLowerCase());
  }

  if (!email || !password || (req.path === "/register" && !username)) {
    return res.status(400).send("Please fill out all fields");
  }

  if (!validateEmail(email)) {
    return res.status(400).send("Please enter a valid email");
  }

  if (req.path === "/register" && password.length < 8) {
    return res.status(400).send("Password must be at least 8 characters");
  }

  return next();
};
