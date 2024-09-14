import express from "express";

const PORT = 4000;

const app = express();

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

const privateMiddleware = (req, res, next) => {
  const url = req.url;
  if (url === "/protected") {
    return res.send("NOT ALLOWED");
  }
  console.log("Allowed. You may continue");
  next();
};

const handleHome = (req, res) => {
  return res.end();
};

const handleProtected = (req, res) => {
  return res.send("Welcome to the private lounge");
};

app.use(logger); //글로벌한 미들웨어를 만들어줌. 어떠한 유알엘에서도 사용 가능
app.use(privateMiddleware);
app.get("/", handleHome);
app.get("/protected", handleProtected);

app.listen(
  PORT,
  console.log(`Server listening on port http://localhost:${PORT}`)
);
