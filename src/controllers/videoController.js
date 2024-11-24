import { render } from "pug";
import Video from "../models/Video";

const faker = {
  username: "Kim Yun Hyeong",
  loggedIn: false,
};

export const showHomepage = async (req, res) => {
  const videos = await Video.find({});
  res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);

  return res.render("watch", {
    pageTitle: `watching ${video.title}`,
    video,
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

export const postUpload = async (req, res) => {
  //add video
  const { title, descripttion, hashtags } = req.body;
  await Video.create({
    title,
    descripttion,
    createdAt: Date.now(),
    hashTags: hashtags.split(",").map((word) => `${word}`),
    meta: {
      views: 0,
      rating: 0,
    },
  });

  return res.redirect("/");
};
