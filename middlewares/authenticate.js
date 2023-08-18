// const jwt = require("jsonwebtoken");
// const { User } = require("../models/user");
// const { HttpError } = require("../helpers");
// const { SECRET_KEY } = process.env;

// const authenticate = async (req, res, next) => {
//   const { autorization = "" } = req.headers;
//   const [bearer, token] = autorization.split(" ");
//   if (bearer !== "Bearer ") {
//     next(HttpError(401, "Not authorized"));
//   }
//   try {
//     const { id } = jwt.verify(token, SECRET_KEY);
//     const user = await User.findById(id);
//     if (!user || user.token !== token || !user.token) {
//       next(HttpError(401, "Not authorized"));
//     }
//     req.user = user;
//     next();
//   } catch {
//     next(HttpError(401, "Not authorized"));
//   }
// };

// module.exports = authenticate;

const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { HttpError } = require("../helpers");
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(HttpError(401, "Not authorized"));
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || user.token !== token) {
      return next(HttpError(401, "Not authorized"));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(HttpError(401, "Not authorized"));
  }
};

module.exports = authenticate;
