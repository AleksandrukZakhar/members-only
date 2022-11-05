const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");

router.get("/", (req, res, next) => {
    res.render("index", { title: "Members Only", user: req.user });
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

module.exports = router;
