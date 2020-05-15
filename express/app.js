const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();

// 引用路由模块
const users = require('./routes/api/users');
const gamelists = require('./routes/api/gamelists');
const deals = require('./routes/api/deals');
const carts = require('./routes/api/carts');
const banners = require('./routes/api/banners');
const strategys = require('./routes/api/strategys');

app.use(require('cors')())

// 使用bodyparser中间件
// app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.json());
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb',extended:false}));

// 连接DB
const db = require('./config/keys').mongodburl;
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('DB is connected'))
  .catch((err) => console.log(err));

// passport初始化
app.use(passport.initialize());
require('./config/passport')(passport);

// 使用路由
app.use('/api/users', users);
app.use('/api/gamelists', gamelists);
app.use('/api/deals', deals);
app.use('/api/carts', carts);
app.use('/api/banners', banners);
app.use('/api/strategys', strategys);

// 设置服务器端口
app.listen(8888);