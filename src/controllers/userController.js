import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) =>
  res.render("join", { pageTitle: "Create Account" });

export const postJoin = async (req, res) => {
  const { name, username, email, password, checkPassword, location } = req.body;
  if (password !== checkPassword) {
    return res.status(400).render("join", {
      pageTitle: "Create Account",
      errorMessage: "your password are not same",
    });
  }
  const checkExists = await User.exists({ $or: [{ username }, { email }] });
  if (checkExists) {
    return res.status(400).render("join", {
      pageTitle: "Create Account",
      errorMessage: "email or user name are already exists",
    });
  }
  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
    });
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle: "Create Account",
      errorMessage: "error",
    });
  }

  return res.redirect("/login");
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Log in" });

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "Log in";
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "An account doesn't exists ",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res
      .status(400)
      .render("login", { pageTitle, errorMessage: "Wrong password" });
  }
  req.session.loggeIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const edit = (req, res) => res.send("Edit Users");
export const remove = (req, res) => res.send("remove Users");
export const logout = (req, res) => res.send("logout Users");
export const see = (req, res) => res.send("see Users");
