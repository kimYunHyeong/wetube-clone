import Video from "../models/Video";

const faker = {
  username: "Kim Yun Hyeong",
  loggedIn: false,
};

export const showHomepage = (req, res) => {
  Video.find({})
    .then((videos) => {
      console.log("videos", videos);
      return res.render("home", { pageTitle: "Home", videos: videos });
    })
    .catch((error) => {
      console.log("errors", error);
    });
  //res.render("home", { pageTitle: "Home", videos: [] });
};

export const watch = (req, res) => {
  const { id } = req.params;

  res.render("watch", {
    pageTitle: `watching ${video.title}`,
  });
};

export const getEdit = (req, res) => {
  const { id } = req.params;
  res.render("edit", {
    pageTitle: `editing ${video.title}`,
  });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = (req, res) => {
  //add video
  const { title } = req.body;
  res.redirect("/");
};
