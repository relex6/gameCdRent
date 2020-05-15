const express = require('express');
const router = express.Router();
const passport = require('passport');

const dealsmodel = require('../../model/deals');
const gamelistsmodel = require('../../model/gamelists');
const usersmodel = require('../../model/users');

// $route   Get api/deals/test
// @desc    返回的请求的json数据
// @access  public
router.get("/test", (req, res) => {
  res.json({msg: "deals is working!"})
})

// $route   Get api/deals/getdeals
// @desc    返回所有的交易结果
// @access  public
router.get("/getdeals", (req, res) => {
  dealsmodel.find({})
    .populate('userid', ["phone", "email", "nick", "status"])
    .populate('gameid', ["title", "rentPrice", "salePrice", "percent", "coverimg", "engtitle"])
    .then(deals => res.json(deals))
})

// $route   Get api/deals/adddeal
// @desc    返回添加交易成功与否的结果
// @access  public
router.post("/adddeal", passport.authenticate("jwt", {session: false}), (req, res) => {
  deal = new dealsmodel({
    type: req.body.type,
    userid: req.user.id,
    gameid: req.body.gameid
  });
  if (req.body.type === '租赁') {
    deal.status = '未归还'
  }
  deal.save()
    .then(res.json({message: '结算成功'}))
    .catch(err => {res.json(err)})
})

// $route   Post api/deals/addmany
// @desc    返回添加多个数据成功与否的结果
// @access  public
router.post("/addmany", (req, res) => {
  var newarr = []
  var addarr = req.body
  var newobj = {}
  addarr.forEach(element => {
    if (element.type === '租赁') {
      newobj = element
      newobj.status = '未归还'
      newarr.push(newobj)
    } else if (element.type === '购买') {
      newarr.push(element)
    }
  })
  dealsmodel.insertMany(newarr, (err) => {
    if (err) throw err;
    res.json({message: "结算所有成功"})
  })
})

// $route   Get api/deals/currentdeal
// @desc    返回交易结果
// @access  public
router.post("/currentdeal", (req, res) => {
  dealsmodel.find({userid: req.body.userid})
    .populate('userid', ["phone", "email", "nick", "status"])
    .populate('gameid', ["title", "rentPrice", "salePrice", "percent", "imgurl", "engtitle"])
    .then(deals => res.json(deals))
})

// $route   Get api/deals/returnback
// @desc    返回归还成功与否的结果
// @access  public
router.post("/returnback", (req, res) => {
  dealsmodel.updateOne({_id: req.body.dealid}, {status: "已归还", returndate: Date.now()}, (err) => {
    if (err) throw err;
    res.json({message: '归还成功'})
  })
})

// $route   Get api/deals/del
// @desc    返回删除成功与否的结果
// @access  public
router.post("/del", (req, res) => {
  dealsmodel.deleteOne({_id: req.body.dealid}, (err) => {
    if (err) throw err;
    res.json({message: "删除成功"})
  })
})

// $route   Get api/deals/edit
// @desc    返回编辑成功与否的结果
// @access  public
router.post("/edit", (req, res) => {
  dealsmodel.updateOne({_id: req.body.dealid}, req.body, (err) => {
    if (err) throw err;
    res.json({message: "编辑成功"})
  })
})

module.exports = router;