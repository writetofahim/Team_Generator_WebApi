const deleteAuth = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.split(" ")[1];

  if (token === process.env.BEARER_TOKEN) {
    next();
  } else {
    //   res.status(401).json({
    //     message: "unauthorized access",
    //   });
    next("authorization fail!");
  }
};

module.exports = deleteAuth;
