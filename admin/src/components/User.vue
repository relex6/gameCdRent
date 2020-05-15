<template>
  <div>
    <el-card id="box-card">
      <img id="titleIcon" src="@/assets/user.png">
      <span id="title">用户管理</span>
      <el-input
        placeholder="输入手机/邮箱查询"
        style="width: 230px;position: absolute;right: 20px;top: 80px"
        size="mini"
        v-model="search">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <div class="usertable">
        <el-table
        :data="tableData.filter(data => !search || data.email.toLowerCase().includes(search.toLowerCase()) || data.phone.includes(search))"
        border
        height="486"
        style="width: 960px;margin: 100px auto;">
          <!-- 头像 -->
          <el-table-column
            prop="avatar"
            label="头像"
            width="62">
            <template slot-scope="scope">
              <el-avatar size="large" :src="scope.row.avatar"></el-avatar>
            </template>
          </el-table-column>
          <!-- 用户名 -->
          <el-table-column
            prop="nick"
            label="用户名"
            width="90">
          </el-table-column>
          <!-- 手机号 -->
          <el-table-column
            prop="phone"
            label="手机号"
            width="120">
          </el-table-column>
          <!-- 邮箱 -->
          <el-table-column
            prop="email"
            label="邮箱"
            width="180">
          </el-table-column>
          <!-- 创建日期 -->
          <el-table-column
            label="创建日期"
            sortable
            width="110">
            <template slot-scope="scope">
              {{scope.row.date | filtDate}}
            </template>
          </el-table-column>
          <!-- 上次登录 -->
          <el-table-column
            prop="lastlogin"
            label="上次登录"
            sortable
            width="170">
            <template slot-scope="scope">
              {{scope.row.lastlogin | filtLastLogin}}
            </template>
          </el-table-column>
          <!-- 状态 -->
          <el-table-column
            prop="status"
            label="状态"
            :filters="[{ text: '活跃', value: '活跃' }, { text: '冻结', value: '冻结' }]"
            :filter-method="filterStatus"
            filter-placement="bottom-end"
            width="70">
          </el-table-column>
          <!-- 操作 -->
          <el-table-column
          label="操作"
          width="140">
            <template slot-scope="scope">
              <el-button @click="freeze(scope.row)" type="text" size="small" :disabled="scope.row.status === '冻结' ? true : false">冻结</el-button>
              <el-button @click="active(scope.row)" type="text" size="small" :disabled="scope.row.status === '冻结' ? false : true">解冻</el-button>
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
  methods: {
    freeze (row) {
      this.$axios.post('http://127.0.0.1:8888/api/users/freeze', {phone: row.phone})
        .then(res => {
          console.log(res.data.message)
        })
      this.$axios.get('http://127.0.0.1:8888/api/users/getusers')
        .then(res => {
          this.tableData = res.data.users
        })
    },
    active (row) {
      this.$axios.post('http://127.0.0.1:8888/api/users/active', {phone: row.phone})
        .then(res => {
          console.log(res.data.message)
        })
      this.$axios.get('http://127.0.0.1:8888/api/users/getusers')
        .then(res => {
          this.tableData = res.data.users
        })
    },
    del (row) {
      this.$axios.post('http://127.0.0.1:8888/api/users/del', {phone: row.phone})
        .then(res => {
          console.log(res.data.message)
        })
      this.$axios.get('http://127.0.0.1:8888/api/users/getusers')
        .then(res => {
          this.tableData = res.data.users
        })
    },
    filterStatus (value, row) {
      return row.status === value
    },
    fresh () {
      window.location.reload()
      // this.reload = false
      // this.$nextTick(() => (this.reload = true))
    }
  },
  data () {
    return {
      border: true,
      search: '',
      tableData: [],
      reload: true
    }
  },
  created () {
    this.$axios.get('http://127.0.0.1:8888/api/users/getusers')
      .then(res => {
        this.tableData = res.data.users
      })
  },
  mounted () {
    document.getElementById('box-card').style.height = document.body.clientHeight + 'px'
  },
  filters: {
    filtDate (value) {
      return value.slice(0, 10)
    },
    filtLastLogin (value) {
      return value.slice(0, 19).replace('T', ' ')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
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
</style>
