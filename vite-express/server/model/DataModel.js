const mongoose = require('mongoose');

const DataType = {
    id: Number,
    date: String,
    name: String,
    state: String,
    city: String,
    address: String,
    zip: String,
    tag: String
}

const DataModel = new mongoose.model("Data", new mongoose.Schema(DataType));

// 模型data将会对应data集合
module.exports = DataModel;