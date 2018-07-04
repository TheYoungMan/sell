<template>
  <div id="sellers" ref="sellerWrapper">
    <div class="wrapper">
      <div class="seller-summary">
        <div class="summary-top">
          <div class="summary-name">{{seller.name}}</div>
          <div class="summary-rate">
            <span class="sellers-score">
              <span :style="translating()"></span>
            </span>
            <span>({{seller.ratingCount}})</span>
            <span>月售{{seller.sellCount}}单</span>
          </div>
          <div class="summary-like">
            <div class="icon-favorite" @click="seller.collect = !seller.collect" :class="{'icon-red':seller.collect}"></div>
            <div class="collected">{{isCollect}}</div>
          </div>
        </div>
        <div class="summary-bottom">
          <div class="min-price">
            <div class="bottom-head">起送价</div>
            <div class="bottom-foot">
              <span class="prices">{{seller.minPrice}}</span><span class="unit">元</span>
           </div>
          </div>
          <div class="deliver-price">
            <div class="bottom-head">商家配送</div>
            <div class="bottom-foot">
              <span class="prices">{{seller.deliveryPrice}}</span><span class="unit">元</span>
            </div>
          </div>
          <div class="deliver-time">
            <div class="bottom-head">平均配送时间</div>
            <div class="bottom-foot">
              <span class="prices">{{seller.deliveryTime}}</span><span class="unit">分钟</span>
            </div>
          </div>
        </div>
      </div>
      <div class="divide"></div>
      <div class="seller-activity">
        <div class="header">公告与活动</div>
        <div class="activity-bulletin">{{seller.bulletin}}</div>
        <div class="favourable">
          <ul>
            <li v-for="(item,index) in seller.supports" :key="index" class="favourable-item">
              <div>
                <span class="iconM" :class="classMap[item.type]"></span>
                <span class="favourable-description">{{item.description}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="divide"></div>
      <div class="seller-image">
        <div class="seller-real">商家实景</div>
        <div class="image-description" ref="imageWrapper">
          <div>
            <ul>
              <li v-for="item3 in seller.pics" :key="item3.id" class="item-image">
                <img :src="item3">
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="divide"></div>
      <div class="seller-message">
        <div class="message-head">商家信息</div>
        <div class="message-wrapper">
          <ul>
            <li class="seller-infos" v-for="item4 in seller.infos" :key="item4.id">{{item4}}</li>
          </ul>
        </div>
      </div>
    </div>
    <shopcar :selectFoods="selectFoods" :deliverPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcar>
  </div>
</template>

<script>
import Vue from 'vue'
import shopcar from './shopcar'
import BScroll from 'better-scroll'
export default {
  props: {
    seller: {
      type: Object
    }
  },
  created () {
    Vue.nextTick(() => {
      this._initscroll()
    })
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  data () {
    return {
      goods: [],
      msg: 'Welcome to Your Vue.js App',
      selectFoods: this.$store.state.val
    }
  },
  computed: {
    isCollect: function () {
      if (this.seller.collect) {
        return '已收藏'
      }
      return ''
    }
  },
  components: {
    shopcar
  },
  methods: {
    translating () {
      var num = (Math.round(5 - this.seller.score)) * (-28)
      return {
        'transform': 'translateY(' + num + 'px)'
      }
    },
    _initscroll () {
      this.ratingScroll = new BScroll(this.$refs.sellerWrapper, {
        probeType: 3,
        click: true
      })
      this.imageScroll = new BScroll(this.$refs.imageWrapper, {
        scrollX: true,
        click: true
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/index.styl'
#sellers
  position absolute
  top 174px
  bottom 48px
  left 0
  right 0
  width 100%
  overflow hidden
  .wrapper
    .seller-summary
      width 100%
      box-sizing border-box
      padding 18px 18px 0 18px
      .summary-top
        height 58px
        padding-bottom 18px
        border-1px(rgba(7,17,27,0.05))
        .summary-name
          font-size 14px
          font-weight 700
          color rgb(7,17,27)
          line-height 14px
          margin-bottom 8px
        .summary-rate
          font-size 10px
          color rgb(77,85,93)
          line-height 14px
          span
            vertical-align top
            margin-left 8px
          .sellers-score
            display inline-block
            width 70px
            height 14px
            overflow hidden
            margin-left 0
            span
              display inline-block
              width 100%
              height 55px
              background-image url(../assets/images/rating@2x.png)
              background-size 100%
              margin-left 0
        .summary-like
          position absolute
          right 18px
          top 0
          text-align center
          .icon-favorite
            font-size 24px
            color rgba(7,17,27,0.1)
            line-height 24px
            &.icon-red
              color red
          .collected
            font-size 10px
            color rgb(77,85,93)
            line-height 10px
      .summary-bottom
        height 74px
        box-sizing border-box
        padding 18px
        display flex
        .min-price,.deliver-price
          border-1px-right(rgba(7,17,27,0.1))
        .min-price,.deliver-price,.deliver-time
          flex 1
          padding 0 17px 0 17px
          text-align center
          .bottom-head
            font-size 10px
            color rgb(147,153,159)
            line-height 10px
            margin-bottom 4px
          .bottom-foot
            font-weight 200
            color rgb(7,17,27)
            line-height 24px
            .prices
              font-size 24px
            .unit
              font-size 10px
    .divide
      width 100%
      height 18px
      background-color rgba(7,17,27,0.05)
    .seller-activity
      box-sizing border-box
      padding 18px 18px 0 18px
      .header
        font-size 15px
        font-weight 600
        margin-bottom 8px
      .activity-bulletin
        margin-left 12px
        font-size 12px
        font-weight 200
        color rgb(240,20,20)
        line-height 24px
        padding 0 0 18px 0
        border-1px(rgba(7,17,27,0.05))
      .favourable
        width 100%
        .favourable-item
          width 100%
          height 48px
          box-sizing border-box
          padding 16px 12px
          border-1px(rgba(7,17,27,0.05))
          .iconM
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
            color rgb(7,17,27)
            line-height 16px
    .seller-image
      width 100%
      box-sizing border-box
      padding 18px
      font-weight 600
      .seller-real
        margin-bottom 12px
      .image-description
        position relative
        width 100%
        height 120px
        overflow hidden
        div
          width 630px
          height 120px
          ul
            float left
            width 630px
            height 120px
            .item-image
              display inline-block
              width 150px
              height 120px
              margin-right 6px
              img
                width 100%
                height 100%
    .seller-message
      width 100%
      box-sizing border-box
      padding 18px 18px 0 18px
      .message-head
        font-weight 600
        padding-bottom 12px
        border-1px(rgba(7,17,27,0.05))
      .message-wrapper
        width 100%
        .seller-infos
          padding 16px 12px
          font-size 12px
          font-weight 200
          color rgb(7,17,27)
          line-height 16px
          border-1px(rgba(7,17,27,0.05))
</style>
