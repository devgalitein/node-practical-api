const jwt = require("jsonwebtoken");
const connection = require("../Model/config");
module.exports.checkAuthentication = async (req, res, next) => {
  let AuthorizedToken = req.headers.authorization;
  let token = AuthorizedToken.split(" ")[1];

  if (!token) {
    return res.status(209).json({
      status: false,
      message: "You are not authenticated user, pls Login to Access resources!",
    });
  }

  const isVerified = jwt.verify(token, process.env.SECRET_KEY);

  if (!isVerified) {
    return res.status(209).json({
      status: false,
      message: "You are not authenticated user, pls Login to Access resources!",
    });
  }

  connection.query(
    "SELECT * FROM userIdentity WHERE id = ? ",
    [isVerified.id],
    (err, verifiedUser) => {
      if (err) {
        return res.status(209).json({ status: false, message: err.message });
      } else {
        req.token = token;
        req.user = verifiedUser;
        next();
      }
    }
  );
};
