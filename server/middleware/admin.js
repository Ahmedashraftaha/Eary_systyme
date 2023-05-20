// const user = require("../models/user");
const authModel = require("../models/authModel");

const admin = async (req, res, next) => {
  const { token } = req.headers;
  try {
    const user = await authModel.getUserByToken(token);
    req.creatorId=user.id;
    console.log(user);
    req.userId = user.id;
    if (user.role === 1) { // role admin 1 user 0 
      next();
    } else {
      console.log(user);
      res.status(401).json({ err: "Unauthorized access" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message, message: "Unauthorized access" });
  }
};

module.exports = admin;
