/**
 * 数据库连接配置
 */

const mongoose = require("mongoose");

// 连接数据库users
mongoose.connect(`mongodb://127.0.0.1:27017/lzp_pro`);