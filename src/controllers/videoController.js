import Video from "../models/Video";

export const showHomepage = async (req, res) => {
  const videos = await Video.find({}).sort({ createdAt: "descending" });
  res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: "Video Not Found" });
  }
  return res.render("video/watch", {
    pageTitle: `watching ${video.title}`,
    video,
  });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: "Video Not Found" });
  }
  return res.render("video/edit", {
    pageTitle: `Editing ${video.title}`,
    video,
  });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashTags } = req.body;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.render("404", { pageTitle: "Video Not Found" });
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashTags: Video.formatHashTags2(hashTags),
  });

  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("video/upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const { title, description, hashTags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashTags: Video.formatHashTags(hashTags),
    });
    return res.redirect("/");
  } catch (error) {
    return res.render("video/upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const delteVideo = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const getSearch = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: { $regex: new RegExp(keyword, "i") },
    });
  }
  return res.render("video/search", { pageTitle: "Search", videos });
};
