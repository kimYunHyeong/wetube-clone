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
  res.render("home", { pageTitle: "Home", faker: faker, videos });

export const search = (req, res) =>
  res.render("watch", { pageTitle: "Home", faker: faker, videos });

export const watch = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];

  res.render("watch", {
    pageTitle: `watching ${video.title}`,
    faker: faker,
    video,
  });
};

export const edit = (req, res) =>
  res.render("Edit", { pageTitle: "Home", faker: faker, videos });

export const deleteVideo = (req, res) => {
  console.log(req.params);
  return res.send("delte Videos");
};
export const upload = (req, res) => res.send("upload Videos");
