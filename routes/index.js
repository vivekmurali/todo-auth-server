var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Note = require("../models/note");

router.use(
  session({
    secret: "randomstring",
    resave: false,
    saveUninitialized: false,
  })
);

// middleware function to check for logged-in users
// var sessionChecker = (req, res, next) => {
//   if (req.session.userId) {
//     res.status(200).send("User already logged in");
//   } else {
//     next();
//   }
// };

// route for Home-Page
// router.get("/", sessionChecker, (req, res) => {
//   res.status(401).send("Unauthorized");
// });

router.get("/notes", (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
  jwt.verify(token, "jsonkey", (err, user) => {
    if (err) {
      console.log(err);
      res.status(401).send("You are not authorized to access this page");
      return;
    }
    console.log("success");
    Note.find({ userId: user.user._id }, (err, notes) => {
      if (err) throw err;
      res.status(200).json(notes);
    });
  });
});

router.post("/notes/new", (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
  jwt.verify(token, "jsonkey", (err, user) => {
    if (err) {
      res.status(401).send("unauthorized");
      return;
    }
    const note = new Note({
      userId: user.user._id,
      title: req.body.title,
      content: req.body.content,
    });
    note
      .save()
      .then(() => res.status(201).send("Created"))
      .catch((err) => err.message);
  });
});

router.put("/notes/edit/:noteid", (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
  jwt.verify(token, "jsonkey", async (err, user) => {
    if (err) {
      res.status(401).send("not authorized");
      return;
    }
    await Note.findByIdAndUpdate(req.params.noteid, {
      title: req.body.title,
      content: req.body.content,
    });
    res.status(200).send("Updated successfully");
  });
});

router.delete("/notes/delete/:noteid", async (req, res) => {
  // console.log("delete test");
  // const token = req.headers["authorization"].split(" ")[1];
  // jwt.verify(token, "jsonkey", async (err, user) => {
  //   console.log('worked');
  //   console.log(req.params.noteId);
  //   if (err) {
  //     console.log('hit the if statement');
  //     res.status(401).send("not authorized");
  //     return;
  //   }
    await Note.findByIdAndDelete(req.params.noteid);
    res.status(200).send("Deleted successfully");
  // });
});

// route for user signup
router.route("/register").post((req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (user) {
      res.status(403).send("User already exists");
    } else {
      req.body.password = bcrypt.hashSync(req.body.password);
      const user = new User({
        email: req.body.email,
        password: req.body.password,
      });
      user
        .save()
        .then((user) => {
          req.session.userId = user._id;
          res.status(200).send("Registered successfully");
        })
        .catch((error) => {
          res.status(400).send("Could not register user");
        });
    }
  });
});

// route for user Login
router.route("/login").post((req, res) => {
  var email = req.body.email,
    password = req.body.password;

  User.findOne({ email: email }).then(function (user) {
    if (!user) {
      console.log("no user found");
      res.status(400).send("No user found");
    } else if (!bcrypt.compare(password, user.password)) {
      res.status(401).send("Wrong password");
      console.log("not same password");
    } else {
      const token = jwt.sign({ user }, "jsonkey");
      req.session.userId = user._id;
      res.status(200).json({ token: token });
    }
  });
});

router.post("/logout", function (req, res) {
  req.session.destroy(function () {
    res.clearCookie("session");
    console.log("user logged out.");
  });
  res.status(200).send("Logged out successfully");
});

module.exports = router;
