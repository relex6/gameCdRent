<template>
  <div id="wrapper">
    <el-card id="box-card">
      <img id="titleIcon" src="@/assets/user.png">
      <span id="title">攻略管理</span>
      <img src="@/assets/add.png" id="add" @click="add()">
      <el-input
        placeholder="输入手机/邮箱查询"
        style="width: 230px;position: absolute;right: 20px;top: 80px"
        size="mini"
        v-model="search">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <!-- 攻略列表 -->
      <!-- :data="tableData.filter(data => !search || data.title.includes(search))" -->
      <div class="table" v-if="!isadd">
        <el-table
        :data="tableData"
        border
        height="486"
        style="width: 960px;margin: 100px auto;">
          <!-- 封面 -->
          <el-table-column
            prop="imgurl"
            label="封面"
            width="200px">
            <template slot-scope="scope">
              <img style="width: 170px;height: 100px;" size="large" :src="scope.row.imgurl"/>
            </template>
          </el-table-column>
          <!-- 标题 -->
          <el-table-column
            prop="title"
            label="标题"
            width="300px">
          </el-table-column>
          <!-- 创建日期 -->
          <el-table-column
            label="创建日期"
            sortable
            width="200px">
            <template slot-scope="scope">
              {{scope.row.date | filtDate}}
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column
          label="操作"
          width="200px">
            <template slot-scope="scope">
              <el-button @click="edit(scope.row)" type="text" size="small">查看</el-button>
              <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加列表 -->
      <div class="addtable" v-if="isadd">
        <el-form :model="newstrategy" ref="newstrategy" label-width="80px" :rules="rules" size="mini">
          <!-- 上传图片 -->
          <el-form-item label="游戏封面" id="gameimg" style="" prop="imgurl">
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
          <el-form-item class="item" label="标题" prop="title">
            <el-col :span="10">
              <el-input v-model="newstrategy.title"></el-input>
            </el-col>
          </el-form-item>
          <!-- 富文本 -->
          <el-form-item prop="content">
            <div class="editor">
              <editor v-model="detail" :isClear="isClear" @change="change"></editor>
            </div>
          </el-form-item>
          <!-- 按钮 -->
          <div id="buttonBox" style="margin-bottom: 50px;">
            <el-button type="primary" size="mini" v-if="addbutton" @click="addtodb('newstrategy')">添加</el-button>
            <el-button type="primary" size="mini" v-if="editbutton" @click="editdb('newstrategy')">编辑</el-button>
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
import editor from '../Editor'
export default {
  name: 'Strategy',
  components: { editor },
  data () {
    return {
      isClear: false,
      detail: '', // 富文本编辑器里自动填充的内容
      search: '',
      tableData: [],
      newstrategy: {},
      rules: {},
      isadd: false,
      imageUrl: '',
      editbutton: Boolean,
      addbutton: Boolean
    }
  },
  methods: {
    change (val) {
    },
    edit (row) {
      this.isadd = true
      this.newstrategy = row
      this.detail = row.content
      this.imageUrl = row.imgurl
      this.editbutton = true
      this.addbutton = false
    },
    del (row) {
      this.$axios.post('http://127.0.0.1:8888/api/strategys/del', {title: row.title})
        .then(res => {
          console.log(res.data.message)
          this.$axios.get('http://127.0.0.1:8888/api/strategys/get')
            .then(res => {
              this.tableData = res.data
            })
        })
    },
    add () {
      this.isadd = true
      this.editbutton = false
      this.addbutton = true
      this.newstrategy = {}
      this.detail = ''
      this.imageUrl = ''
    },
    cancel () {
      this.isadd = false
    },
    editdb (newstrategy) {
      this.$refs[newstrategy].validate((valid) => {
        if (valid) {
          this.newstrategy.content = this.detail
          this.$axios.post('http://127.0.0.1:8888/api/strategys/edit', this.newstrategy)
            .then(res => {
              console.log(this.newstrategy)
              return console.log(res.data.message)
            })
            .catch(err => console.log(err))
        } else {
          console.log('提交失败')
        }
      })
    },
    addtodb (newstrategy) {
      this.$refs[newstrategy].validate((valid) => {
        if (valid) {
          this.newstrategy.content = this.detail
          this.$axios.post('http://127.0.0.1:8888/api/strategys/add', this.newstrategy)
            .then(res => {
              console.log(this.newstrategy)
              return console.log(res.data.message)
            })
            .catch(err => console.log(err))
        } else {
          console.log('提交失败')
        }
      })
      this.$axios.get('http://127.0.0.1:8888/api/strategys/get')
        .then(res => {
          this.tableData = res.data
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
        this.newstrategy.imgurl = imgFile
      }
    }
  },
  filters: {
    filtDate (value) {
      return value.slice(0, 10)
    }
  },
  created () {
    this.$axios.get('http://127.0.0.1:8888/api/strategys/get')
      .then(res => {
        this.tableData = res.data
        console.log('成功获取数据(strategy)')
      })
  },
  mounted () {
    document.getElementById('box-card').style.height = document.body.clientHeight + 'px'
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
  width: 178px;
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
.editor {
  width: 660px;
  position absolute
  top 15px
  left -20px
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
  box-shadow 0 0 30px gray
  position relative
#fresh
  position absolute
  bottom 20px
  right 25px
  cursor pointer
.gametable
  width: 100%
#add
  position absolute
  width 30px
  right 270px
  top 78px
  cursor pointer
.table
  width 100%
  height 486px
.addtable
  width 959px
  height 486px
  border 1px solid #ebeef5
  margin 100px auto
  position relative
  padding 20px 0 0 0
#buttonBox
  position absolute
  bottom -40px
  left 40px
</style>
