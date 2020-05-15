<template>
  <div>
    <el-card id="box-card">
      <img id="titleIcon" src="@/assets/sale.png">
      <span id="title">出售订单</span>
      <el-input
        placeholder="输入游戏名称查询"
        style="width: 230px;position: absolute;right: 20px;top: 80px"
        size="mini"
        v-model="search">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <!-- 游戏列表 -->
      <div class="gametable">
        <el-table
        :data="tableData.filter(data => (!search || data.gameid.title.includes(search)) && (data.type === '购买'))"
        border
        height="486"
        style="width: 960px;margin: 100px auto;">
          <!-- 客户昵称 -->
          <el-table-column
            prop="userid.nick"
            label="客户昵称"
            width="142">
          </el-table-column>
          <!-- 客户邮箱 -->
          <el-table-column
            prop="userid.email"
            label="客户邮箱"
            width="200">
          </el-table-column>
          <!-- 客户手机号 -->
          <el-table-column
            prop="userid.phone"
            label="客户手机号"
            width="170">
          </el-table-column>
          <!-- 游戏标题 -->
          <el-table-column
            prop="gameid.title"
            label="游戏标题"
            width="170">
          </el-table-column>
          <!-- 购买日期 -->
          <el-table-column
            prop="date"
            label="购买日期"
            sortable
            width="120">
            <template slot-scope="scope">
              {{(scope.row.date || '') | filtdate}}
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column
            label="操作"
            width="140">
            <template slot-scope="scope">
              <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <i id="fresh" class="el-icon-refresh" @click="fresh()"></i>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      border: true,
      search: '',
      tableData: [],
      newrent: {},
      newgame: {
        language: [],
        percent: 20
      }
    }
  },
  methods: {
    // 删除订单
    del (row) {
      this.$axios.post('http://127.0.0.1:8888/api/deals/del', {dealid: row._id})
        .then(res => {
          console.log(res.data.message)
        })
        .catch(err => console.log(err))
      this.$axios.get('http://127.0.0.1:8888/api/deals/getdeals')
        .then(res => {
          this.tableData = res.data
        })
    },
    // 刷新页面
    fresh () {
      window.location.reload()
      // this.reload = false
      // this.$nextTick(() => (this.reload = true))
    },
    returnback (row) {
      this.$axios.post('http://127.0.0.1:8888/api/deals/returnback', {dealid: row._id})
        .then(res => {
          console.log(res.data.message)
        })
    }
  },
  created () {
    this.$axios.get('http://127.0.0.1:8888/api/deals/getdeals')
      .then(res => {
        this.tableData = res.data
        console.log('成功获取数据(sale)')
      })
  },
  mounted () {
    document.getElementById('box-card').style.height = document.body.clientHeight + 'px'
  },
  filters: {
    filtdate (value) {
      return value.slice(0, 10)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
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
  width 957px
  margin 100 auto
  border 1px solid #ebeef5
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
</style>
