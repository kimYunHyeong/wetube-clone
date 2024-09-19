export const showHomepage = (req, res) =>
  res.render("home", { pageTitle: "Home", potato: "sdfgsdfg" });
export const search = (res, req) => res.render("watch");
export const watch = (req, res) => res.render("watch");
export const edit = (req, res) => res.render("Edit");
export const deleteVideo = (req, res) => {
  console.log(req.params);
  return res.send("delte Videos");
};
export const upload = (req, res) => res.send("upload Videos");
