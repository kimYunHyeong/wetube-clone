export const showHomepage = (req, res) => res.render("home");
export const search = (res, req) => res.render("see");
export const see = (req, res) => res.render("see");
export const edit = (req, res) => {
  console.log(req.params);
  return res.send("Edit Videos");
};
export const deleteVideo = (req, res) => {
  console.log(req.params);
  return res.send("delte Videos");
};
export const upload = (req, res) => res.send("upload Videos");
