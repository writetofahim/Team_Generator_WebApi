const deleteAuth = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Missing token",
    });
  }

  if (token === process.env.BEARER_TOKEN) {
    next();
  } else {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = deleteAuth;
