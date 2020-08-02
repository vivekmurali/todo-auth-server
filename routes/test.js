var express = require("express");
var router = express.Router();
let data = [
  {
    date: "2020-07-27T16:17:38.016Z",
    _id: "5f1efe7a46300b3ba867cf40",
    userId: "5f1b23c1f1615e100c432521",
    title: "Hello",
    content: "wooohooo",
    __v: 0,
  },
  {
    date: "2020-07-27T16:17:38.016Z",
    _id: "5f1efe8046300b3ba867cf41",
    userId: "5f1b23c1f1615e100c432521",
    title: "3",
    content: "4",
    __v: 0,
  },
  {
    date: "2020-07-27T16:17:38.016Z",
    _id: "5f1efe8646300b3ba867cf42",
    userId: "5f1b23c1f1615e100c432521",
    title: "dsa",
    content: "dasd",
    __v: 0,
  },
  {
    date: "2020-07-27T16:17:38.016Z",
    _id: "5f1efe8e46300b3ba867cf43",
    userId: "5f1b23c1f1615e100c432521",
    title: "vagadsas",
    content: "dsadfsdf",
    __v: 0,
  },
  {
    date: "2020-07-27T16:17:38.016Z",
    _id: "5f1efe9246300b3ba867cf44",
    userId: "5f1b23c1f1615e100c432521",
    title: "ddssseee",
    content: "dsadfsdf",
    __v: 0,
  },
  {
    date: "2020-07-27T16:17:38.016Z",
    _id: "5f1efe9946300b3ba867cf45",
    userId: "5f1b23c1f1615e100c432521",
    title: "hjgj",
    content: "hgfyujh",
    __v: 0,
  },
  {
    date: "2020-07-27T16:17:38.016Z",
    _id: "5f1efea246300b3ba867cf46",
    userId: "5f1b23c1f1615e100c432521",
    title: "34533",
    content: "bjkkkk",
    __v: 0,
  },
];
router.get("/", (req, res) => {
  res.json(data);
});
router.post("/new", (req, res) => {
  data.push({
    title: req.body.title,
  });
  if (req.body.title) {
    res.status(200).send("Posted successfully");
  } else {
    res.status(400).send("Could not post");
  }
});

module.exports = router;
