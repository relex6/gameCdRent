import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 最新折扣
    newest_discount_game: [
      {
        img: 'https://img12.360buyimg.com/n5/s450x450_jfs/t5956/92/4679982782/557421/271f9589/596596d5N5a3683ef.jpg',
        title: '塞尔达传说',
        score: 97,
        engtitle: 'The Legend of Zelda: Breath of the Wild',
        language: ['全区中文', '动作', '冒险'],
        price: 408,
        price_second: 321,
        percent: 0.1
      },
      {
        img: 'https://img10.360buyimg.com/n5/s450x450_jfs/t5536/248/1405772689/562425/12fdd904/590ff257N1baf4fab.jpg',
        title: '马里奥赛车8',
        score: 92,
        engtitle: 'Mario Kart 8',
        language: ['全区中文'],
        price: 381.61,
        price_second: 274,
        percent: 0
      },
      {
        img: 'https://img11.360buyimg.com/n5/s450x450_jfs/t1/25843/6/2134/781488/5c19f52fE20e961a4/09d7e7b0163b170e.png',
        title: '火影忍者',
        score: 69,
        engtitle: 'NARUTO',
        language: ['日区中文'],
        price: 274,
        price_second: 201,
        percent: 0.2
      },
      {
        img: 'https://img14.360buyimg.com/n5/s450x450_jfs/t5386/228/1747936756/552883/abafa2ce/5913d872Na471a042.jpg',
        title: '喷射战士2',
        score: 83,
        engtitle: 'Splatoon 2',
        language: '',
        price: 332,
        price_second: 277,
        percent: 0.2
      },
      {
        img: 'https://img11.360buyimg.com/n5/s450x450_jfs/t5644/154/285404334/506814/6bf5ca0c/591e6f1aN1be0ff1b.jpg',
        title: '神臂斗士 强力拳击',
        score: 84,
        engtitle: 'ARMS',
        language: ['全区中文'],
        price: 332,
        price_second: 277,
        percent: 0.1
      },
      {
        img: 'https://img10.360buyimg.com/n5/s450x450_jfs/t1/29963/1/5717/887753/5c41afc8E44cef1ae/9f6a2e2116eec841.png',
        title: '暗黑破坏神3',
        score: 87,
        engtitle: 'Diablo III: Eternal Collection',
        language: ['全区中文', '动作', '冒险', '角色扮演', '聚会'],
        price: 382,
        price_second: 277,
        percent: 0.1
      },
      {
        img: 'https://img14.360buyimg.com/n5/s450x450_jfs/t20425/17/465265734/151561/8cb261d/5b0e1e65Naea75cc5.jpg',
        title: '精灵宝可梦 去吧伊布 口袋妖怪',
        score: 84,
        engtitle: 'Pokemon: Let\'s Go, Eevee',
        language: ['全区中文', '冒险', '角色扮演'],
        price: 381,
        price_second: 295,
        percent: 0.2
      },
      {
        img: 'https://img13.360buyimg.com/n5/s450x450_jfs/t10630/65/1621077096/566055/500d9c6f/59e4500fN1acb7695.jpg',
        title: '异度之刃2',
        score: 89,
        engtitle: 'Xenoblade Chronicles 2',
        language: ['日区中文', '港区中文'],
        price: 421.85,
        price_second: 348,
        percent: 0.3
      },
      {
        img: 'https://img12.360buyimg.com/n5/s450x450_jfs/t22222/230/466996050/144209/71e7f4d1/5b0e2225Nfd18b55f.jpg',
        title: '精灵宝可梦 去吧皮卡丘 口袋妖怪',
        score: 84,
        engtitle: 'Pokemon: Let\'s Go, Pikachu',
        language: ['全区中文'],
        price: 381,
        price_second: 295,
        percent: 0.2
      },
      {
        img: 'https://img11.360buyimg.com/n5/s450x450_jfs/t26944/365/344385016/886498/5b3cb9e1/5b8f471aNb3e0b159.png',
        title: '明星大乱斗',
        score: 93,
        engtitle: 'Super Smash Bros',
        language: ['全区中文'],
        price: 385.6,
        price_second: 321,
        percent: 0.2
      },
      {
        img: 'https://img10.360buyimg.com/n5/s450x450_jfs/t1/22998/26/4956/752483/5c36d2baE2239b2d3/3b339e0794eb293b.png',
        title: '超级马里奥兄弟U DX豪华版',
        score: 80,
        engtitle: 'New Super Mario Bros.U Deluxe',
        language: ['全区中文'],
        price: 381.61,
        price_second: 299,
        percent: 0.1
      },
      {
        img: 'https://img13.360buyimg.com/n5/s450x450_jfs/t1/47282/2/9796/1046705/5d70c277Ed360baf4/102652c049ec5b03.png',
        title: '侍魂 晓',
        score: 78,
        engtitle: 'SAMURAI SPIRITS',
        language: ['全区中文', '港区中文'],
        price: 358.64,
        price_second: 287,
        percent: 0.4
      },
      {
        img: 'https://img12.360buyimg.com/n5/s450x450_jfs/t5743/207/6851284048/517328/ed5e244/596c70baN8ae234e1.jpg',
        title: '马里奥+疯狂兔子 疯兔 王国之战',
        score: 85,
        engtitle: 'Mario + Rabbids Kingdom Battle',
        language: ['全区中文'],
        price: 242.71,
        price_second: 145,
        percent: 0.6
      },
      {
        img: 'https://img11.360buyimg.com/n5/s450x450_jfs/t26206/186/335441469/1042019/1077cf09/5b8f37ebN4b288400.png',
        title: '异度之刃2外传 黄金之国伊拉',
        score: 80,
        engtitle: 'Xenoblade Chronicles 2: Torna The Golden Country',
        language: '',
        price: 277.87,
        price_second: 207,
        percent: 0.3
      },
      {
        img: 'https://img11.360buyimg.com/n5/s450x450_jfs/t5785/319/6825406703/363898/b3007d1f/596c71e4N78422ca6.jpg',
        title: '超级马里奥 奥德赛',
        score: 97,
        engtitle: 'Super Mario Odyssey',
        language: ['全区中文'],
        price: 381,
        price_second: 212,
        percent: 0.5
      },
      {
        img: 'https://img13.360buyimg.com/n5/s450x450_jfs/t25570/129/1135971888/815806/bcf53b57/5b88fedbNeb76cb85.png',
        title: '怪物猎人GU MHGU',
        score: 80,
        engtitle: 'Monster Hunter GU',
        language: ['全区中文'],
        price: 263,
        price_second: 178,
        percent: 0.7
      },
      {
        img: 'https://img14.360buyimg.com/n5/s450x450_jfs/t1/63487/6/5268/759241/5d366e81E81190ff6/a5afa1b971db2354.png',
        title: '火焰纹章 风花雪月',
        score: 89,
        engtitle: 'Fire Emblem: Three House',
        language: ['全区中文'],
        price: 382,
        price_second: 321,
        percent: 0.1
      },
      {
        img: 'https://img12.360buyimg.com/n5/s450x450_jfs/t19369/192/934675902/146411/96b9df54/5ab1c9daNb6ced8c8.jpg',
        title: '马里奥网球ACE',
        score: 76,
        engtitle: 'Mario Tennis Aces',
        language: ['全区中文'],
        price: 381.61,
        price_second: 321,
        percent: 0.2
      }

    ],
    // 所有游戏
    gamelists: [],
    // 今日推荐数据
    today_game: [
      {
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573318728642&di=95ff8220ea89ea5c3131919dfaee3251&imgtype=0&src=http%3A%2F%2Fpic2.52pk.com%2Ffiles%2F130913%2F1283314_151520_1_lit.jpg',
        title: '逃生2',
        content: '就冲这一村的村民极力的热情相拥，必须感动，就算一次吃灰，也必须玩一次',
        recommender_name: '三'
      },
      {
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573319137736&di=9fb0d2459b25902e461e2f8c5668f18a&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20181231%2Fb1dbf9a2b273478e9b1e24dbc4314977.jpeg',
        title: '勇者斗恶龙：建造者2',
        content2: '一个月150小时剧情通关 每天都是5小时的平均时长',
        content: '一个月150小时剧情通关 每天都是5小时的平均时长 塞尔达世界第一的话 这款游戏在我心中能世界第一',
        recommender_name: 'Mr.Terrible'
      }
    ],
    // 必读攻略
    strategy: [
      {
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573360906401&di=74d5c72bb4cf46dd5023d94079a954fc&imgtype=0&src=http%3A%2F%2Fpic.k73.com%2Fup%2Farticle%2F2017%2F0309%2F123651_94779268.jpg',
        title: 'Switch10大必玩佳作'
      },
      {
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573361542692&di=e3664f0773fc040d8a9bd0f4cca5ec14&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Ftranslate%2Fw1280h720%2F20180307%2FB3SH-fxipenp2123427.jpg',
        title: '如何在eShop购买游戏'
      }
    ],
    // 购物车
    baskets: [],
    // 租赁
    rent: [],
    // 订单
    order: [],
    // 登录状态
    isLogin: 'false',
    // 账号信息
    userinfo: {},
    // 当前登录的账户名
    username: '',
    token: ''
  },
  getters: {
    getDiscountGame (state) {
      return state.newest_discount_game
    },
    getGameLists (state) {
      return state.gamelists
    },
    getTodayGame (state) {
      return state.today_game
    },
    getStrategy (state) {
      return state.strategy
    },
    getBaskets (state) {
      return state.baskets
    },
    getRent (state) {
      return state.rent
    },
    getOrder (state) {
      return state.order
    },
    getIsLogin (state) {
      return state.isLogin
    },
    getUserInfo (state) {
      return state.userinfo
    },
    getUserName (state) {
      return state.username
    },
    getToken (state) {
      return state.token
    }
  },
  mutations: {
    setGameLists (state, data) {
      state.gamelists = data
    },
    setBaskets (state, data) {
      state.baskets = data
    },
    pushToBaskets (state, data) {
      state.baskets.push(data)
    },
    setRent (state, data) {
      state.rent = data
    },
    pushToRent (state, data) {
      state.rent.push(data)
    },
    setOrder (state, data) {
      state.order = data
    },
    pushToOrder (state, data) {
      state.order.push(data)
    },
    setIsLogin (state, data) {
      state.isLogin = data
    },
    setUserInfo (state, data) {
      state.userinfo = data
    },
    setUserName (state, data) {
      state.username = data
    },
    setToken (state, data) {
      state.token = data
    }
  },
  actions: {
    setGameLists ({commit}, data) {
      commit('setGameLists', data)
    },
    setBaskets ({commit}, data) {
      commit('setBaskets', data)
    },
    pushToBaskets ({commit}, data) {
      commit('pushToBaskets', data)
    },
    setRent ({commit}, data) {
      commit('setRent', data)
    },
    pushToRent ({commit}, data) {
      commit('pushToRent', data)
    },
    setOrder ({commit}, data) {
      commit('setOrder', data)
    },
    pushToOrder ({commit}, data) {
      commit('pushToOrder', data)
    },
    setIsLogin ({commit}, data) {
      commit('setIsLogin', data)
    },
    setUserInfo ({commit}, data) {
      commit('setUserInfo', data)
    },
    setUserName ({commit}, data) {
      commit('setUserName', data)
    },
    setToken ({commit}, data) {
      commit('setToken', data)
    }
  }
})
