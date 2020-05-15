// 登录注册
const express = require('express');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys')
const passport = require('passport')
const router = express.Router();

// 引用users的model
const usersmodel = require('../../model/users');

// $route   Get api/users/test
// @desc    返回的请求的json数据
// @access  public 
router.get("/test", (req, res) => {
  res.json({msg: "Login!"})
})

// $route   post api/users/register
// @desc    返回的请求的json数据
// @access  public 
router.post("/register", (req, res) => {
  // 判断邮箱是否存在
  if (req.body.email && req.body.phone) {
    usersmodel.findOne({email: req.body.email})
      .then((email) => {
        if (email) {
          return res.json({message: "邮箱已经被注册!"})
        } else {
          usersmodel.findOne({phone: req.body.phone})
            .then((user) => {
              if (user) {
                return res.json({message: "手机号已经被注册!"})
              } else {
                const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
                // 创建user实体
                const newUser = new usersmodel({
                  email: req.body.email,
                  password: req.body.password,
                  nick: req.body.nick,
                  phone: req.body.phone,
                  avatar
                })
                // 给密码加密
                bcrypt.genSalt(10, (err, salt) => {
                  bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    // 添加数据到数据库
                    newUser.save()
                      .then(user => {res.json(user)})
                      .catch(err => console.log(err));
                  })
                })
              }
            })
        }
      })
    }
})

// $route   post api/users/login
// @desc    返回token
// @access  public
router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  var reg_email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  var reg_phone = /^1[3456789]\d{9}$/;
  if (reg_email.test(username)) { // 匹配到邮箱账户
    // 查询数据库
    usersmodel.findOne({email: username})
      .then(user => {
        if (!user) {
          return res.json({message: '当前用户名不存在！'});
        }
      // 密码匹配
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const rule = {id: user.id, name: user.nick};
            jwt.sign(rule, keys.secretOrKey, {expiresIn: 3600}, (err, token) => {
              if (err) throw err;
              // 修改上次登录时间
              usersmodel.updateOne({email: username}, {lastlogin: Date.now()}, (err) => {
                if (err) throw err;
              })
              res.json({
                success: true,
                token: "Bearer " + token
              });
            })
            // res.json({message: '登录成功！'});
          } else {
            return res.json({message: '密码错误！'});
          }
        })
    })
  } else if (reg_phone.test(username)) { // 匹配到手机号账户
    // 查询数据库
    usersmodel.findOne({phone: username})
      .then(user => {
        if (!user) {
          return res.json({message: '当前用户名不存在！'});
        }
      // 密码匹配
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const rule = {id: user.id, name: user.nick};
            jwt.sign(rule, keys.secretOrKey, {expiresIn: 3600}, (err, token) => {
              if (err) throw err;
              // 修改上次登录时间
              usersmodel.updateOne({phone: username}, {lastlogin: Date.now()}, (err) => {
                if (err) throw err;
              })
              res.json({
                success: true,
                token: "Bearer " + token
              });
            })
            // res.json({message: '登录成功！'});
          } else {
            return res.json({message: '密码错误！'});
          }
        })
    })
  } else {
    return res.json({message: '当前用户名不存在！'});
  }
})

// $route   get api/users/current
// @desc    retuen current user
// @access  private
router.get("/current", passport.authenticate("jwt", {session: false}), (req, res) => {
  res.json({
    id: req.user.id,
    nick: req.user.nick,
    email: req.user.email,
    phone: req.user.phone,
    avatar: req.user.avatar,
    status: req.user.status
  });
})

// $route   get api/users/getusers
// @desc    返回所有用户列表
// @access  public
router.get("/getusers", (req, res) => {
  usersmodel.find()
    .then(users => {
      res.json({users})
    })
})

// $route   post api/users/active
// @desc    返回是否激活成功的提示
// @access  public
router.post('/active', (req, res) => {
  usersmodel.updateOne({phone: req.body.phone}, {status: "未冻结"}, (err) => {
    if (err) throw err;
    res.json({message: "激活成功"})
  })
})

// $route   post api/users/freeze
// @desc    返回是否冻结成功的提示
// @access  public
router.post('/freeze', (req, res) => {
  usersmodel.updateOne({phone: req.body.phone}, {status: "冻结"}, (err) => {
    if (err) throw err;
    res.json({message: "冻结成功"})
  })
})

// $route   post api/users/del
// @desc    返回是否删除成功的提示
// @access  public
router.post('/del', (req, res) => {
  usersmodel.deleteOne({phone: req.body.phone}, (err, rawRespnse) => {
    if (err) throw err;
    res.json({message: "用户删除成功"})
  })
})

module.exports = router