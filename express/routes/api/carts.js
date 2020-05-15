const express = require('express');
const router = express.Router();
const passport = require('passport');

const cartsmodel = require('../../model/carts');

// $route   Get api/carts/test
// @desc    返回的请求的json数据
// @access  public
router.get("/test", (req, res) => {
  res.json({msg: "carts is working!"})
})

// $route   Get api/carts/getcart
// @desc    返回当前用户的购物车数据
// @access  pravite
router.post("/getcart", passport.authenticate("jwt", {session: false}), (req, res) => {
  cartsmodel.find({userid: req.user.id})
    .populate('gameid', ["title", "rentPrice", "salePrice", "percent", "coverimg"])
    .then(deals => res.json(deals))
})

// $route   Get api/carts/addcart
// @desc    返回添加购物车成功与否的结果
// @access  pravite
router.post("/addcart", passport.authenticate("jwt", {session: false}), (req, res) => {
  cart = new cartsmodel({
    type: req.body.type,
    userid: req.user.id,
    gameid: req.body.gameid
  });
  cart.save()
    .then(cart => {res.json(cart)})
    .catch(err => {res.json(err)})
})

// $route   Get api/carts/del
// @desc    返回删除购物车成功与否的结果
// @access  pravite
router.post("/del", passport.authenticate("jwt", {session: false}), (req, res) => {
  cartsmodel.deleteOne({_id: req.body.cartid}, (err) => {
    if (err) throw err;
    res.json({message: "删除当前购物车成功"})
  })
})

// $route   Post api/carts/delmany
// @desc    返回删除多个数据成功与否的结果
// @access  pravite
router.get("/delmany", passport.authenticate("jwt", {session: false}), (req, res) => {
  cartsmodel.deleteMany({userid: req.user._id}, (err) => {
    if (err) throw err;
    res.json({message: "下单——>删除购物车成功"})
  })
})

// $route   Get api/carts/changetype
// @desc    返回修改交易类型的结果
// @access  pravite
router.post("/changetype", passport.authenticate("jwt", {session: false}), (req, res) => {
  cartsmodel.updateOne(req.body.cartid, {type: req.body.type}, (err) => {
    if (err) throw err;
    res.json({message: "当前购物车类型修改成功"})
  })
})

module.exports = router;