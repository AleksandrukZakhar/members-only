const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const messageSchema = new mongoose.Schema({
    authorUserName: String,
    authorImage: String,
    title: String,
    text: String,
});

messageSchema.plugin(passportLocalMongoose);

const messageModel = mongoose.model("Message", messageSchema);

module.exports = messageModel;
