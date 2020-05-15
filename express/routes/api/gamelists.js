const express = require('express');
const router = express.Router();

const gamelistsmodel = require('../../model/gamelists');

// $route   Get api/gamelists/test
// @desc    返回的请求的json数据
// @access  public 
router.get("/test", (req, res) => {
  res.json({msg: "Login!"});
})

// $route   Post api/gamelists/getgame
// @desc    返回所查找的游戏的数据
// @access  public 
router.post("/getdetail", (req, res) => {
  gamelistsmodel.findById(req.body.gameid)
    .then(game => {
      res.json({game})
    })
})

// $route   Post api/gamelists/upgame
// @desc    返回上传游戏成功与否的结果
// @access  public
router.post("/upgame", (req, res) => {
  gamelistsmodel.findOne({title: req.body.title})
    .then(isMatch => {
      if (isMatch) {
        return res.json({message: "该游戏已存在，请勿重复添加"});
      } else {
        const newGame = new gamelistsmodel(req.body)
        newGame.save()
          .then(gamelists => {res.json(gamelists)})
          .catch(err => console.log(err));
      }
    })
})

// $route   get api/gamelists/getgame
// @desc    返回游戏列表
// @access  public
router.get("/getgame", (req, res) => {
  gamelistsmodel.find()
    .then(game => {
      res.json({game});
    })
})

// $route   post api/gamelists/del
// @desc    返回是否删除成功的提示
// @access  public
router.post('/del', (req, res) => {
  gamelistsmodel.deleteOne({title: req.body.title}, (err, rawRespnse) => {
    if (err) throw err;
    res.json({message: "删除成功"});
  })
})

// $route   post api/gamelists/edit
// @desc    返回是否编辑成功的提示
// @access  public
router.post('/edit', (req, res) => {
  gamelistsmodel.updateOne({_id: req.body._id}, req.body, (err) => {
    if (err) throw err;
    res.json({message: "编辑成功"});
  })
})

// $route   post api/gamelists/today
// @desc    返回添加到推荐游戏的成功与否的结果
// @access  public
router.post('/today', (req, res) => {
  gamelistsmodel.updateOne({_id: req.body._id}, {
    isrecommend: true,
    recommendimg: req.body.recommendimg,
    recommendcontent: req.body.recommendcontent
  }, (err) => {
    if (err) throw err;
    res.json({message: "推荐成功"});
  })
})

// $route   post api/gamelists/canceltoday
// @desc    返回添加到推荐游戏的成功与否的结果
// @access  public
router.post('/canceltoday', (req, res) => {
  gamelistsmodel.updateOne({_id: req.body._id}, {
    isrecommend: false
  }, (err) => {
    if (err) throw err;
    res.json({message: "取消推荐成功"});
  })
})

module.exports = router