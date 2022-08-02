const createError = require("http-errors");
const jwt = require("jsonwebtoken");

exports.authRequired = (req, res, next) => {
  const bearerToken = req.headers["authorization"];
  if (!bearerToken) return next(createError(403));

  const token = bearerToken.split("Bearer ")[1];
  if (!token) return next(createError(403));

  jwt.verify(token, process.env.JWT_SECRET, function (err, payload) {
    if (err) return next(createError(403));
    req.userId = payload.id;
  });
  next();
};
