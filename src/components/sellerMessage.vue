<template>
    <div class="wrapper">
        <div class="sellerName">{{seller.name}}</div>
        <div class="sellerStar">
            <span :style="translating()"></span>
        </div>
        <div class="favourable">
            <span class="line line1"></span>
            <span class="line-word">优惠信息</span>
            <span class="line line2"></span>
        </div>
        <div class="favourable-message">
            <ul>
                <li v-for="(item,index) in seller.supports" :key="index">
                    <span class="icon" :class="classMap[item.type]"></span>
                    <span class="favourable-description">{{item.description}}</span>
                </li>
            </ul>
        </div>
        <div class="sellerMessage">
            <span class="line line1"></span>
            <span class="line-word">商家公告</span>
            <span class="line line2"></span>
        </div>
        <div class="messages">{{seller.bulletin}}</div>
        <div class="close icon-close" @click="hideSeller()"></div>
    </div>
</template>

<script>
export default {
  props: {
    seller: {
      type: Object
    }
  },
  methods: {
    translating () {
      var num = (Math.round(5 - this.seller.score)) * (-59)
      return {
        'transform': 'translateY(' + num + 'px)'
      }
    },
    hideSeller () {
      this.showed = this.showM
      this.$store.state.showSeller = false
      this.showed = this.$store.state.showSeller
      this.$emit('changing', this.showed)
    }
  },
  data () {
    return {
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      showM: true,
      showed: true
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../assets/stylus/index.styl'
.wrapper
    position relative
    width 100%
    height 100%
    background-color rgba(7,17,27,0.7)
    box-sizing border-box
    padding 64px 36px 32px 36px
    .sellerName
        text-align center
        font-size 16px
        fonnt-weight 700
        color #ffffff
        line-height 16px
    .sellerStar
        margin-top 16px
        display inline-block
        width 145px
        height 29px
        overflow hidden
        position relative
        left 50%
        transform translateX(-50%)
        span
            display inline-block
            width 100%
            height 148px
            background-image url(../assets/images/rating@2x.png)
            background-size 100%
            margin-left 0
    .favourable
        position relative
        display flex
        width 100%
        margin-top 28px
        .line
            position absolute
            display inline-block
            width 112px
            height 2px
            top 50%
            transform translateY(-50%)
            background-color rgba(255,255,255,0.2)
        .line1
            left 0
            margin-right 12px
        .line2
            right 0
            margin-left 12px
        .line-word
            flex 1
            display inline-block
            text-align center
            font-size 16px
            fonnt-weight 700
            color #ffffff
            line-height 16px
    .favourable-message
        margin-top 24px
        margin-left 12px
        margin-bottom 16px
        li
            margin-bottom 12px
        .icon
            display inline-block
            vertical-align top
            width 16px
            height 16px
            background-size 16px 16px
            &.decrease
              bg-image('decrease_3')
            &.discount
              bg-image('discount_3')
            &.guarantee
              bg-image('guarantee_3')
            &.invoice
              bg-image('invoice_3')
            &.special
              bg-image('special_3')
        .favourable-description
            font-size 12px
            font-weight 200
            color #ffffff
            line-height 16px
    .sellerMessage
        position relative
        display flex
        width 100%
        margin-top 28px
        .line
            position absolute
            display inline-block
            width 112px
            height 2px
            top 50%
            transform translateY(-50%)
            background-color rgba(255,255,255,0.2)
        .line1
            left 0
            margin-right 12px
        .line2
            right 0
            margin-left 12px
        .line-word
            flex 1
            display inline-block
            text-align center
            font-size 16px
            fonnt-weight 700
            color #ffffff
            line-height 16px
    .messages
        box-sizing border-box
        margin-top 24px
        padding 0 12px
        font-size 12px
        font-weight 200
        color #ffffff
        line-height 24px
    .icon-close
        position absolute
        left 50%
        bottom 50px
        transform translateX(-50%)
        font-size 32px
        color rgba(255,255,255,0.5)
</style>
