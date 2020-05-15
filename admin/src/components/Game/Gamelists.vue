<template>
  <div>
    <el-card id="box-card">
      <img id="titleIcon" src="@/assets/game.png">
      <span id="title">游戏列表</span>
      <img src="@/assets/add.png" id="add" @click="add()">
      <el-input
        placeholder="输入游戏名称查询"
        style="width: 230px;position: absolute;right: 20px;top: 80px"
        size="mini"
        v-model="search">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <!-- 游戏列表 -->
      <div v-if="!isadd && !istoday" class="gametable">
        <el-table
        :data="tableData.filter(data => !search || data.title.includes(search))"
        border
        height="486"
        style="width: 960px;margin: 100px auto;">
          <!-- 封面 -->
          <el-table-column
            prop="imgurl"
            label="封面"
            width="122">
            <template slot-scope="scope">
              <img :src="scope.row.coverimg" id="cover">
            </template>
          </el-table-column>
          <!-- 中文名称 -->
          <el-table-column
            prop="title"
            label="中文名称"
            width="130">
          </el-table-column>
          <!-- 英文名称 -->
          <el-table-column
            prop="engtitle"
            label="英文名称"
            width="130">
          </el-table-column>
          <!-- 出售价格 -->
          <el-table-column
            prop="salePrice"
            label="出售价格"
            sortable
            width="110">
          </el-table-column>
          <!-- 租赁价格 -->
          <el-table-column
            prop="rentPrice"
            label="租赁价格"
            sortable
            width="110">
          </el-table-column>
          <!-- 评分 -->
          <el-table-column
            prop="score"
            label="评分"
            sortable
            width="80">
          </el-table-column>
          <!-- 语言 -->
          <el-table-column
            prop="language"
            label="语言"
            width="80">
          </el-table-column>
          <!-- 正在推荐 -->
          <el-table-column
            prop="isrecommend"
            label="正在推荐"
            width="80">
            <template slot-scope="scope">
              <span>{{scope.row.isrecommend}}</span>
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column
          label="操作"
          width="100">
            <template slot-scope="scope">
              &nbsp;&nbsp;<el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="opentoday(scope.row)" type="text" size="small">列为今日推荐</el-button>
              <el-button @click="canceltoday(scope.row)" type="text" size="small">取消今日推荐</el-button>
              <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加列表 -->
      <div v-if="isadd" class="addtable">
        <el-form id="addform" :model="newgame" ref="newgame" label-width="80px" :rules="rules" size="mini">
          <!-- 上传图片 -->
          <el-form-item label="游戏封面" id="gameimg" style="" prop="coverimg">
            <el-upload
              class="avatar-uploader"
              action='#'
              :http-request="add_img"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <!-- 中文名称 -->
          <el-row class="item-row">
            <el-col :span="8">
              <el-form-item class="item" label="中文名称" prop="title">
                <el-input v-model="newgame.title" style="width: 135px;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item class="item" label="容量" prop="size">
                <el-input v-model="newgame.size" style="width: 115px;"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 英文名称 -->
          <el-row class="item-row">
            <el-col :span="9">
              <el-form-item class="item" label="英文名称" prop="engtitle">
                <el-input v-model="newgame.engtitle" style="width: 135px;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item class="item" label="玩家人数" prop="gamer">
                <el-input v-model="newgame.gamer" style="width: 115px;"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 出售价格 -->
          <el-row class="item-row">
            <el-col :span="9">
              <el-form-item class="item" label="出售价格" prop="salePrice">
                <el-input v-model="newgame.salePrice" style="width: 100px;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="item" label="实体卡带" prop="entity">
                <el-radio v-model="newgame.entity" label="无">无</el-radio>
                <el-radio v-model="newgame.entity" label="有">有</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 租赁价格 -->
          <el-row class="item-row">
            <el-col :span="8">
              <el-form-item class="item" label="租赁价格" prop="rentPrice">
                <el-input v-model="newgame.rentPrice" style="width: 100px;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="item" label="试玩" prop="try">
                <el-radio v-model="newgame.try" label="无">无</el-radio>
                <el-radio v-model="newgame.try" label="有">有</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 语言 -->
          <el-form-item label="语言" prop="language">
            <el-checkbox-group v-model="newgame.language">
              <el-checkbox-button label="全区中文" name="language"></el-checkbox-button>
              <el-checkbox-button label="欧区中文" name="language"></el-checkbox-button>
              <el-checkbox-button label="美区中文" name="language"></el-checkbox-button>
              <el-checkbox-button label="港区中文" name="language"></el-checkbox-button>
              <el-checkbox-button label="日区中文" name="language"></el-checkbox-button>
              <el-checkbox-button label="全区英文" name="language"></el-checkbox-button>
              <el-checkbox-button label="史低" name="language"></el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
          <!-- 折扣 -->
          <el-col>
            <el-form-item label="折扣" prop="percent">
                <el-slider
                  style="width: 500px;"
                  v-model="newgame.percent"
                  show-input>
                </el-slider>
            </el-form-item>
          </el-col>
          <!-- 评分 -->
          <el-col style="margin-bottom: 120px;">
            <el-form-item label="评分" prop="score">
              <el-input style="width: 50px" v-model="newgame.score"></el-input>
            </el-form-item>
          </el-col>
          <!-- 游戏图片 -->
          <el-col>
            <el-form-item label="游戏图片" id="gameimg" prop="gameimg" style="position: absolute;left: 5px;top: 380px;">
              <el-upload
                action="#"
                list-type="picture-card"
                :http-request="add_gameimg"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload"
                :file-list="gameimg"
                style="position: absolute;left: 0px;bottom: -22px;">
                <i class="el-icon-plus" style="position: relative;bottom: 35px;"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl">
              </el-dialog>
            </el-form-item>
          </el-col>
          <!-- 简介 -->
          <el-col>
            <el-form-item label="简介" prop="content">
              <el-input style="width: 300px" v-model="newgame.content"></el-input>
            </el-form-item>
          </el-col>
          <!-- 详细介绍 -->
          <el-col>
            <el-form-item label="详细介绍" prop="detailcontent">
              <el-input
                type="textarea"
                style="width: 300px;"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="newgame.detailcontent">
              </el-input>
            </el-form-item>
          </el-col>
          <!-- 按钮 -->
          <div id="buttonBox" style="margin-bottom: 50px;">
            <el-button type="primary" size="mini" v-if="addbutton" @click="addtodb('newgame')">添加</el-button>
            <el-button type="primary" size="mini" v-if="editbutton" @click="editdb('newgame')">编辑</el-button>
            <el-button size="mini" @click="cancel()">取消</el-button>
            <!-- <el-button type="danger" size="mini" @click="resetForm('newgame')">重置</el-button> -->
          </div>
        </el-form>
      </div>
      <!-- 推荐列表 -->
      <div v-if="istoday" class="today">
        <el-form id="addform" :model="today" ref="today" label-width="80px" size="mini">
          <!-- 上传图片 -->
          <el-form-item label="推荐封面" id="gameimg" style="" prop="recommendimg">
            <el-upload
              class="avatar-uploader"
              action='#'
              :http-request="add_recommendimg"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <!-- 推荐内容 -->
          <el-form-item label="推荐内容" style="width: 500px">
            <el-input
              type="textarea"
              :autosize="{ minRows: 9, maxRows: 9}"
              placeholder="请输入推荐内容"
              v-model="newgame.recommendcontent">
            </el-input>
          </el-form-item>
          <div id="buttonBox" style="margin-bottom: 50px;">
            <el-button type="primary" size="mini" v-if="addbutton" @click="recommend('today')">推荐</el-button>
            <el-button size="mini" @click="cancel()">取消</el-button>
            <!-- <el-button type="danger" size="mini" @click="resetForm('newgame')">重置</el-button> -->
          </div>
        </el-form>
      </div>
      <i id="fresh" class="el-icon-refresh" @click="fresh()"></i>
    </el-card>
  </div>
</template>

<script>
var checkimgurl = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请上传图片'))
  } else {
    callback()
  }
}
export default {
  name: 'User',
  data () {
    return {
      border: true,
      search: '',
      tableData: [],
      imageUrl: '',
      gameimg: [],
      isadd: false,
      isedit: false,
      dialogImageUrl: '',
      dialogVisible: false,
      editbutton: Boolean,
      addbutton: Boolean,
      istoday: false,
      today: {},
      newgame: {
        language: [],
        percent: 20
      },
      rules: {
        title: [
          {required: true, message: '请输入游戏名称', trigger: 'blur'}
        ],
        engtitle: [
          {required: true, message: '请输入英文名称', trigger: 'blur'}
        ],
        salePrice: [
          {required: true, message: '请确定售卖价格', trigger: 'blur'}
        ],
        rentPrice: [
          {required: true, message: '请确定租赁价格', trigger: 'blur'}
        ],
        percent: [
          {required: true, message: '请选择折扣', trigger: 'blur'}
        ],
        score: [
          {required: true, message: '请填写游戏评分', trigger: 'blur'}
        ],
        size: [
          {required: true, message: '请填写游戏容量', trigger: 'blur'}
        ],
        coverimg: [
          {required: true, validator: checkimgurl, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 删除游戏
    del (row) {
      this.$axios.post('http://127.0.0.1:8888/api/gamelists/del', {title: row.title})
        .then(res => {
          console.log(res.data.message)
        })
        .catch(err => console.log(err))
      this.$axios.get('http://127.0.0.1:8888/api/gamelists/getgame')
        .then(res => {
          this.tableData = res.data.game
        })
    },
    // 打开推荐列表
    opentoday (row) {
      this.istoday = true
      this.newgame = row
      this.imageUrl = row.recommendimg
    },
    // 取消今日推荐
    canceltoday (row) {
      this.$axios.post('http://127.0.0.1:8888/api/gamelists/canceltoday', row)
        .then(res => {
          console.log(row)
        })
    },
    // 打开游戏添加列表
    add () {
      if (this.isadd === false) {
        this.newgame = {
          language: [],
          percent: 20
        }
        this.isadd = true
      }
      this.addbutton = true
      this.editbutton = false
    },
    // 关闭游戏添加列表
    cancel () {
      this.isadd = false
      this.istoday = false
    },
    // 打开编辑列表
    edit (row) {
      this.isadd = true
      this.newgame = row
      this.imageUrl = row.coverimg
      this.addbutton = false
      this.editbutton = true
      this.gameimg = row.gameimg
    },
    // 关闭编辑列表
    canceledit () {
      this.isedit = false
    },
    // 重置添加列表
    resetForm (newgame) {
      this.$refs[newgame].resetFields()
    },
    // 添加游戏至数据库
    addtodb (newgame) {
      this.$refs[newgame].validate((valid) => {
        if (valid) {
          this.$axios.post('http://127.0.0.1:8888/api/gamelists/upgame', this.newgame)
            .then(res => {
              console.log(this.newgame)
              return console.log(res.data.message)
            })
            .catch(err => console.log(err))
        } else {
          console.log('提交失败')
        }
      })
    },
    editdb (newgame) {
      this.$refs[newgame].validate((valid) => {
        if (valid) {
          this.$axios.post('http://127.0.0.1:8888/api/gamelists/edit', this.newgame)
            .then(res => {
              console.log(this.newgame)
              return console.log(res.data.message)
            })
            .catch(err => console.log(err))
        } else {
          console.log('编辑失败')
        }
      })
    },
    recommend (newgame) {
      this.$refs[newgame].validate((valid) => {
        if (valid) {
          this.$axios.post('http://127.0.0.1:8888/api/gamelists/today', this.newgame)
            .then(res => {
              console.log(this.newgame)
              return console.log(res.data.message)
            })
            .catch(err => console.log(err))
        } else {
          console.log('推荐失败')
        }
      })
    },
    // 上传文件前的钩子函数
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 5
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/png 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
      }
      return isJPG && isLt2M
    },
    // 上传图片
    add_img (data) {
      let reader = new FileReader()
      let file = data.file
      reader.readAsDataURL(file)
      reader.onload = e => {
        let imgFile = e.target.result
        this.imageUrl = imgFile
        this.newgame.coverimg = imgFile
      }
    },
    add_recommendimg (data) {
      let reader = new FileReader()
      let file = data.file
      reader.readAsDataURL(file)
      reader.onload = e => {
        let imgFile = e.target.result
        this.imageUrl = imgFile
        this.newgame.recommendimg = imgFile
      }
    },
    add_gameimg (data) {
      let reader = new FileReader()
      let file = data.file
      reader.readAsDataURL(file)
      reader.onload = e => {
        let imgFile = e.target.result
        var arr = {'url': imgFile}
        this.gameimg.push(arr)
        this.newgame.gameimg = this.gameimg
        console.log(this.newgame.gameimg)
      }
    },
    handleRemove (file, fileList) {
      this.gameimg = fileList
      this.newgame.gameimg = this.gameimg
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 刷新页面
    fresh () {
      // window.location.reload()
      console.log(this.gameimg)
    }
  },
  created () {
    this.$axios.get('http://127.0.0.1:8888/api/gamelists/getgame')
      .then(res => {
        this.tableData = res.data.game
        console.log('成功获取数据(gamelists)')
      })
  },
  mounted () {
    document.getElementById('box-card').style.height = document.body.clientHeight + 'px'
  },
  filters: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
>>> .el-upload-list--picture-card .el-upload-list__item {
  width: 70px
  height: 70px
}
>>> .el-upload--picture-card {
  width: 70px
  height: 70px
  position relative
  left 0
  top 0
}
#gameimg {
  position absolute
  right 20px
}
.avatar-uploader {
  border: 1px dashed #d9d9d9
}
.avatar-uploader:hover {
  border-color: #409EFF
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
#titleIcon
  position absolute
  width 30px
  height 30px
  margin-top 33px
#title
  font-family font_one
  font-weight bold
  font-size 34px
  position absolute
  top 50px
  left 70px
#box-card
  width 100%
  height 650px
  box-shadow 0 0 30px gray
  position relative
#fresh
  position absolute
  bottom 20px
  right 25px
  cursor pointer
#add
  position absolute
  width 30px
  right 270px
  top 78px
  cursor pointer
.addtable
  height 484px
  width 900px
  margin 100 auto
  border 1px solid #ebeef5
  overflow-y scroll
  overflow-x hidden
  position absolute
  top 119px
.today
  height 484px
  width 900px
  margin 100 auto
  border 1px solid #ebeef5
  overflow-x hidden
  position absolute
  top 119px
#addform
  position absolute
  top 20px
  width 100%
.item
  width 600px
#buttonBox
  position absolute
  bottom -100px
  left 40px
#cover
  width 100px
  height 111px
.gametable
  width: 100%
.item-row
  width 600px
  overflow hidden
</style>
