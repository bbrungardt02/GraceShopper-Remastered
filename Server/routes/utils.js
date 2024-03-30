const jwt = require("jsonwebtoken");

const authRequired = (req, res, next) => {
  try {
    const token = req.signedCookies.token;
    // console.log("token in authRequired:", token);
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Req.user: ", req.user);
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "YOU are not authorized!",
    });
    return;
  }
  next();
};

const checkForAdmin = async (req, res, next) => {
  const token = req.signedCookies.token;
  // console.log("token in authRequired:", token);
  req.user = jwt.verify(token, process.env.JWT_SECRET);
  console.log("USER INSIDE OF DB-------", req.user);
  try {
    // console.log(req.user);
    // console.log(req.user.adm);
    if (req.user.adm) {
      next();
    }
  } catch (error) {
    res.status(403).json({
      error: "YOU are not authorized",
    });
  }
};

module.exports = { authRequired, checkForAdmin };
