const mongoose = require('mongoose');

const UserType = {
    username: String,
    password: String
}

const UserModel = new mongoose.model("User", new mongoose.Schema(UserType));

// 模型user将会对应users集合
module.exports = UserModel;