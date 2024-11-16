const faker = {
  username: "Kim Yun Hyeong",
  loggedIn: false,
};

let videos = [
  {
    title: "hello1",
    rating: 5,
    comments: 2,
    cratedAt: "2 minutes ago",
    views: 59,
    id: 1,
  },
  {
    title: "hello2",
    rating: 5,
    comments: 2,
    cratedAt: "2 minutes ago",
    views: 59,
    id: 2,
  },
  {
    title: "hello3",
    rating: 5,
    comments: 2,
    cratedAt: "2 minutes ago",
    views: 59,
    id: 3,
  },
  {
    title: "hello4",
    rating: 5,
    comments: 2,
    cratedAt: "2 minutes ago",
    views: 59,
    id: 4,
  },
  {
    title: "hello5",
    rating: 5,
    comments: 2,
    cratedAt: "2 minutes ago",
    views: 59,
    id: 5,
  },
];

export const showHomepage = (req, res) =>
  res.render("home", { pageTitle: "Home", videos });

export const watch = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];

  res.render("watch", {
    pageTitle: `watching ${video.title}`,

    video,
  });
};

export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  res.render("edit", {
    pageTitle: `editing ${video.title}`,
    video,
  });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  videos[id - 1].title = title;
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = (req, res) => {
  //add video
  const { title } = req.body;
  const newVideo = {
    title,
    rating: 5,
    comments: 2,
    cratedAt: "2 minutes ago",
    views: 59,
    id: videos.length + 1,
  };
  videos.push(newVideo);
  res.redirect("/");
};
