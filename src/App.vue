<template>
  <div id="app">
    <!-- <div class="header">header</div> -->
    <v-header :seller = "seller" @changes="showSeller" class="header" :class="{filterImg:showM}"></v-header>
    <div class="tab border-1px" :class="{filterImg:showM}">
      <div class="tab-item"><router-link to="goods">商品</router-link></div>
      <div class="tab-item"><router-link to="ratings">评价</router-link></div>
      <div class="tab-item"><router-link to="sellers">商家</router-link></div>
    </div>
    <div class="content" :class="{filterImg:showM}">
      <router-view :seller = "seller" :ratings = "ratings" :class="{filterImg:showM}"></router-view>
    </div>
    <div class="seller-wrapper" v-show="showM">
      <sellerM :seller="seller" @changing="hideSeller" :show="showM"></sellerM>
    </div>
  </div>
</template>

<script>
import header from './components/header'
import goods from './components/goods'
import sellermessage from './components/sellerMessage'
import axios from 'axios'
export default {
  name: 'App',
  data () {
    return {
      seller: {},
      ratings: [],
      showM: false
    }
  },
  components: {
    'v-header': header,
    goods,
    'sellerM': sellermessage
  },
  methods: {
    showSeller (val) {
      this.showM = val
    },
    hideSeller (val) {
      this.showM = val
    }
  },
  created () {
    axios.get('/good/seller').then(res => {
      if (res.data.code === 0) {
        this.seller = res.data.data
      }
    })
    axios.get('/good/ratings').then(res => {
      if (res.data.code === 0) {
        this.ratings = res.data.data
      }
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import 'assets/stylus/index.styl'
body,html
  width 100%
  height 100%
  #app
    position relative
    width 100%
    height 100%
    .header
      &.filterImg
        filter blur(5px)
    .tab
      display flex
      height 40px
      line-height 40px
      border-1px(rgba(240,20,20,0.1))
      &.filterImg
        filter blur(5px)
      .tab-item
        flex 1
        text-align center
        font-size 14px
        color rgb(77,85,93)
        &.filterImg
          filter blur(5px)
        a
          width 100%
          height 100%
          display block
          text-decoration none
        a.active
          color rgb(240,20,20) !important
    .content
      &.filterImg
        filter blur(5px)
    .seller-wrapper
      width 100%
      height 100%
      position absolute
      top 0
      left 0
</style>
