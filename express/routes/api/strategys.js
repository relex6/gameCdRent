const express = require('express');
const router = express.Router();

const strategysmodel = require('../../model/strategys');

// $route   Get api/strategys/test
// @desc    返回测试成功的结果
// @access  public
router.get("/test", (req, res) => {
  res.json({msg: "strategys is doing!"})
})

// $route   Get api/strategys/get
// @desc    返回获取的攻略的json数据
// @access  public
router.get('/get', (req, res) => {
  strategysmodel.find()
    .then(strategy => res.json(strategy))
})

// $route   Post api/strategys/getdetail
// @desc    返回获取的攻略的json数据
// @access  public
router.post('/getdetail', (req, res) => {
  strategysmodel.findById(req.body.strategyid)
    .then(strategy => {
      res.json({strategy})
    })
})

// $route   Post api/strategys/add
// @desc    返回添加成功与否的结果
// @access  public
router.post('/add', (req, res) => {
  const newstrategy = new strategysmodel({
    title: req.body.title,
    imgurl: req.body.imgurl,
    content: req.body.content
  })
  newstrategy.save()
    .then(res.json({message: "攻略添加成功"}))
    .catch(err => res.json(err))
})

// $route   Post api/strategys/del
// @desc    返回删除成功与否的结果
// @access  public
router.post('/del', (req, res) => {
  strategysmodel.deleteOne({title: req.body.title}, (err) => {
    if (err) throw err;
    res.json({message: "攻略删除成功"});
  })
})

// $route   Post api/strategys/edit
// @desc    返回编辑成功的结果
// @access  public
router.post('/edit', (req, res) => {
  strategysmodel.updateOne({_id: req.body._id}, req.body, (err) => {
    console.log(req.body.title)
    if (err) throw err;
    res.json({message: "攻略编辑成功"});
  })
})

module.exports = router;