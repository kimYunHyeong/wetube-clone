import { application } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import fetch from "node-fetch";

export const getJoin = (req, res) =>
  res.render("user/join", { pageTitle: "Create Account" });

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
      username,
      email,
      password,
      name,
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
  res.render("user/login", { pageTitle: "Log in" });

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "Log in";
  const user = await User.findOne({ username, socialOnly: false });
  if (!user) {
    return res.status(400).render("user/login", {
      pageTitle,
      errorMessage: "An account doesn't exists ",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res
      .status(400)
      .render("user/login", { pageTitle, errorMessage: "Wrong password" });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const startGithubLogin = (req, res) => {
  const baseUrl = `https://github.com/login/oauth/authorize`;
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const urlParams = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${urlParams}`;
  return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
  const baseUrl = `https://github.com/login/oauth/access_token`;
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const urlParams = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${urlParams}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";

    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified == true
    );
    if (!emailObj) {
      return res.redirect("/login");
    }
    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
      user = await User.create({
        name: userData.name,
        avatarUrl: userData.avatarurl,
        username: userData.login,
        socialOnly: true,
        email: emailObj.email,
        password: "",
        location: userData.location,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    console.log("err");
    return res.redirect("/login");
  }
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const getEdit = (req, res) => {
  return res.render("user/edit-profile", { pageTitle: "Edit Profile" });
};

export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id, avatarUrl },
    },
    body: { name, email, username, location },
    file,
  } = req;

  const currentUser = req.session.user;

  if (currentUser.email !== email && (await User.exists({ email }))) {
    return res.status(400).render("user/edit-profile", {
      pageTitle: "Edit Profile",
      errorMessage: "This email is already taken.",
    });
  }

  if (currentUser.username !== username && (await User.exists({ username }))) {
    return res.status(400).render("user/edit-profile", {
      pageTitle: "Edit Profile",
      errorMessage: "This username is already taken.",
    });
  }
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      avatarUrl: file ? file.path : avatarUrl,
      name,
      email,
      username,
      location,
    },
    { new: true }
  );

  req.session.user = updatedUser;
  return res.redirect("/user/edit");
};

export const getChangePassword = (req, res) => {
  return res.render("user/change-password", { pageTitle: "change Password" });
};

export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id, password },
    },
    body: { oldPassword, newPassword, newPasswordConfirmation },
  } = req;

  const ok = await bcrypt.compare(oldPassword, password);
  if (!ok) {
    return res.status(400).render("user/change-password", {
      pageTitle: "change Password",
      errorMessage: "not correct current password",
    });
  }
  if (newPassword !== newPasswordConfirmation) {
    return res.status(400).render("user/change-password", {
      pageTitle: "change Password",
      errorMessage: "new password are not same",
    });
  }

  const user = await User.findById(_id);
  user.password = newPassword;
  await user.save();
  req.session.user.password = user.password;
  return res.redirect("/user/logout");
};

export const getUserProfile = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).render("404", { pageTitle: "User not Found" });
  }
  return res.render("user/user-profile", {
    pageTitle: `${user.name}의 profile`,
    user,
  });
};
