const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
const jwt = require("jsonwebtoken");
const { JWT_SECRET, COOKIE_SECRET } = process.env;
require("dotenv").config();
const {
  createUser,
  getAllUsers,
  getUserByUsername,
  getUserByUserid,
  updateuser,
  deleteUser,
} = require("../db/adapters/users");
const { authRequired, checkForAdmin } = require("./utils");
const { updateShoppingCart } = require("../db/adapters/shoppingcart");

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    next(error);
  }
});
usersRouter.get("/test/:id", async (req, res, next) => {
  try {
    const user = await getUserByUserid(+req.params.id);
    res.send({ success: true, message: "user found", user });
  } catch (error) {
    next(error);
  }
});
usersRouter.post("/register", async (req, res, next) => {
  try {
    const { username, email, password, adm } = req.body.username;
    console.log("username", username);
    console.log("email", email);
    console.log("password", password);
    console.log("admin", adm);
    console.log("req.body in backend routes", req.body.username);
    const _user = await getUserByUsername(username);
    if (_user) {
      next({
        message: "That user already exists!",
        name: " Auth Error",
      });
      return;
    }
    //we need to refactor the admin bool.... everything up to createuser worked...
    //but after it disapears
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    console.log("hashed password:", hashedPassword);
    const user = await createUser({
      username,
      email,
      password: hashedPassword,
      adm: false,
    });
    console.log("user:", user);
    delete user.password;
    const token = jwt.sign(user, JWT_SECRET);

    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });

    res.send({
      success: true,
      message: "Thank you for registering",
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log("req.boody", req.body);

    const user = await getUserByUsername(username);
    console.log("password:", password);
    console.log("userpassword:", user.password);
    const checkedpassword = await bcrypt.compare(password, user.password);
    console.log("checkedpassword:", checkedpassword);
    if (checkedpassword) {
      delete user.password;
      const token = jwt.sign(user, JWT_SECRET);
      res.cookie("token", token, {
        sameSite: "strict",
        httpOnly: true,
        signed: true,
      });
      res.send({ success: true, message: "login success", data: user });
    } else {
      next({ message: "invalid login credentials" });
      return;
    }
  } catch (error) {
    next(error);
  }
});
usersRouter.get("/logout", async (req, res, next) => {
  try {
    res.clearCookie("token", {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    res.send({
      success: true,
      message: "Logged Out!",
    });
  } catch (error) {
    next(error);
  }
});
usersRouter.patch("/update/:id", async (req, res, next) => {
  try {
    console.log("req.body", req.body);
    let userid = req.params.id;
    const updateduser = await updateuser(+userid, req.body);
    const { success, message, updatedUser } = updateduser;

    res.send({ success, message, updatedUser });
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/me", authRequired, async (req, res, next) => {
  // console.log("REQ USER: ", req.user);
  // query the db and get the cartid via userid (req.user.id)
  res.send({ success: true, message: "you are authorized", user: req.user });
});
// // write a /me route! that sends the req.use....

usersRouter.delete("/delete/:id", authRequired, async (req, res, next) => {
  let userid = +req.params.id;
  console.log("userid", userid);
  updateObj = { user_id: null };
  const nullshopper = await updateShoppingCart({ userid, updateObj });
  const deleteuser = await deleteUser(+userid);
  const { success, message } = deleteuser;
  res.send({ success, message });
});

module.exports = usersRouter;
