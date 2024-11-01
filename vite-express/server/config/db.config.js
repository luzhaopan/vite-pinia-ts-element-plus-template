/**
 * 数据库连接配置
 */

const mongoose = require("mongoose");

// 连接数据库lzp_pro，如果不存在则自动创建
mongoose.connect(`mongodb://127.0.0.1:27017/lzp_pro`);