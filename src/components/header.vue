<template>
  <div id="header">
      <div class="all">
        <div class="avatar">
          <img :src="seller.avatar" alt="" class="set-img">
        </div>
        <div class="right-content">
          <div class="title">
            <span class="brand bg-img"></span>
            <span class="name">{{seller.name}}</span>
          </div>
          <div class="description">
            {{seller.description}}/{{seller.deliveryTime}}分送达
          </div>
          <div v-if="seller.supports" class="supports">
            <span class="icon bg-image" :class="classMap[seller.supports[0].type]"></span>
            <span>{{seller.supports[0].description}}</span>
          </div>
          <div class="num" v-if="seller.supports">
            <span class="number" @click="showing()">{{seller.supports.length}}个</span>
            <span class="icon-keyboard_arrow_right more"></span>
          </div>
        </div>
      </div>
      <div class="message-bull">
        <span class="bulletin-icon"></span>
        <span class="bulletin">{{seller.bulletin}}</span>
        <span class="icon-keyboard_arrow_right more"></span>
      </div>
      <div class="background">
        <img :src="seller.avatar" alt="">
      </div>
  </div>
</template>

<script>
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      showM: false,
      showed: false
    }
  },
  methods: {
    showing () {
      this.showed = this.showM
      this.$store.state.showSeller = true
      this.showed = this.$store.state.showSeller
      this.$emit('changes', this.showed)
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice_1', 'guarantee']
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">

@import '../assets/stylus/index.styl'

#header
  position relative
  overflow hidden
  .all
    position relative
    padding 24px 24px 18px
    background rgba(7,17,27,0.5)
    .avatar
      float left
    img
      border-radius 2px
      set-img(64px)
    .right-content
      margin-left 64px
      padding-left 16px
      color rgb(255,255,255)
      .title
        .brand
          display inline-block
          bg-image('brand')
          width 30px
          height 18px
          background-size 30px 18px
          vertical-align top
        .name
          font-size 16px
          font-weight bold
      .description
        margin-top 8px
        font-size 12px
        line-height 12px
      .supports
        margin-top 10px
        font-size 12px
        span
          display inline-block
        .icon
          display inline-block
          vertical-align top
          width 16px
          height 16px
          background-size 16px 16px
          &.decrease
            bg-image('decrease_2')
          &.discount
            bg-image('discount_2')
          &.guarantee
            bg-image('guarantee_2')
          &.invoice
            bg-image('invoice_1')
          &.special
            bg-image('special_1')
      .num
        color rgb(255,255,255)
        position absolute
        right 12px
        bottom 14px
        padding 7px 8px
        font-size 10px
        border-radius 12px
        background-color rgba(0,0,0,0.2)
        height 12px
        line-height 12px
        .number
        .more
          width 2px
          vertical-align middle
  .message-bull
    position relative
    height 28px
    background-color rgba(7,17,27,0.2)
    padding 0 12px 0 12px
    line-height 28px
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    color rgb(255,255,255)
    font-size 10px
    .bulletin-icon
      display inline-block
      vertical-align middle
      width 22px
      height 12px
      bg-image('bulletin')
      background-size 22px 12px
    .bulletin
      margin-left 4px
      margin-right 4px
      vertical-align middle
    .icon-keyboard_arrow_right
      position absolute
      right 12px
      bottom 8px
  .background
    position absolute
    top 0
    left 0
    z-index -1
    width 100%
    filter blur(10px)
    img
      background-size cover
      width 100%
</style>
