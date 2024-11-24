export const localMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggeIn);
  res.locals.siteName = "Wetube";
  res.locals.loggedInUser = req.session.user;
  next();
};
