const faker = {
  username: "Kim Yun Hyeong",
  loggedIn: false,
};

export const showHomepage = (req, res) => {
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
  res.render("home", { pageTitle: "Home", faker: faker, videos });
};
export const search = (req, res) => res.render("watch");
export const watch = (req, res) => res.render("watch");
export const edit = (req, res) => res.render("Edit");
export const deleteVideo = (req, res) => {
  console.log(req.params);
  return res.send("delte Videos");
};
export const upload = (req, res) => res.send("upload Videos");
