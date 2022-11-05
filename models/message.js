const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const messageSchema = new mongoose.Schema({
    authorFullName: { type: String, minLength: 6, maxLength: 200 },
    authorImage: String,
    title: { type: String, minLength: 4, maxLength: 50 },
    text: { type: String, minLength: 4, maxLength: 300 },
    timestamp: Date,
});

messageSchema.plugin(passportLocalMongoose);

const messageModel = mongoose.model("Message", messageSchema);

module.exports = messageModel;
