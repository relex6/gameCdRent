const express = require('express');
const router = express.Router();

const bannersmodel = require('../../model/banners');

// $route   Get api/banners/test
// @desc    返回测试成功的结果
// @access  public 
router.get("/test", (req, res) => {
  res.json({msg: "banner is doing!"})
})

// $route   Get api/banners/get
// @desc    返回轮播图的json数据
// @access  public
router.get('/get', (req, res) => {
  bannersmodel.find()
    .then(banner => {
      res.json({banner})
    })
})

// $route   Post api/banners/del
// @desc    返回轮播图是否删除成功的结果
// @access  public
router.post('/del', (req, res) => {
  bannersmodel.findByIdAndDelete(req.body.bannerid, (err) => {
    if (err) throw err;
    res.json({message: "轮播图删除成功"})
  })
})

// $route   Post api/banners/add
// @desc    返回轮播图是否添加成功的结果
// @access  public
router.post('/add', (req, res) => {
  const newbanner = new bannersmodel({
    bannerimg: req.body.bannerimg
  })
  newbanner.save()
    .then(res.json({message: "轮播图添加成功"}))
    .catch(err => res.json(err))
})

module.exports = router;