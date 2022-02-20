const express = require('express');
const mongoose = require('mongoose')
const path = require('path')
// 数据库的地址和名字
const dbConfig = require('./dbs/dbConfig')
// 引入seession
const expressSession = require('express-session');
// 获取post请求参数的
const bodyParser = require('body-parser');
// 连接数据库
mongoose.connect(dbConfig.dbs).then(() => {
    console.log('连接数据库成功');
}).catch(() => {
    console.log('连接数据失败');
})
const user = require('./interfaces/user')
const city = require('./interfaces/city')
const cart = require('./interfaces/cart')
const order = require('./interfaces/order')
const test = require('./interfaces/test')
const content = require('./interfaces/content')
const ss = require('./interfaces/alipay')
const prefe = require('./interfaces/prefe')
const app = express();
// 开放静态资源访问
app.use(express.static(path.join(__dirname, 'public')));
// 配置session的
app.use(expressSession({ secret: 'password', resave: false, saveUninitialized: false }));
// 配置获取post请求参数的
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.all('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Max-Age", 3600)
    next();
});
// 开启8000端口
// 将test挂载上去
app.use('/api/user', user)
app.use('/api', city)
app.use('/api', cart)
app.use('/api', order)
app.use('/api/test', test)
app.use('/api/content', content)
app.use('/api', ss)
app.use('/api/prefe', prefe)
app.listen('8888', () => {
    console.log('服务已经启动');
})