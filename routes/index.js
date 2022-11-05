const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const Message = require("../models/message.js");
const passport = require("passport");

router.get("/", async (req, res) => {
    const messages = await Message.find();

    res.render("index", { title: "Members Only", messages, user: req.user });
});

router.get("/sign-up", (req, res) => {
    res.render("sign-up", { title: "Members Only" });
});

router.post("/sign-up", (req, res) => {
    const { username, password } = req.body;

    User.register(
        new User({ username }),
        password,

        (err) => {
            if (err) return res.redirect("/sign-up");

            passport.authenticate("local")(req, res, () => {
                res.redirect("/");
            });
        }
    );
});

router
    .route("/log-in")
    .get((req, res) => {
        res.render("log-in", { title: "Members Only" });
    })
    .post(passport.authenticate("local"), (req, res) => {
        res.redirect("/");
    });

router.post("/new", (req, res, next) => {
    const { username } = req.user;
    const { title, text } = req.body;

    console.log(req.user);

    const nMessage = new Message({
        authorUserName: username,
        title,
        text,
    });
    nMessage.save((err) => (err ? next(err) : res.redirect("/")));
});

module.exports = router;
