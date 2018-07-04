<template>
  <div id="ratings" ref="ratingWrapper">
    <div>
      <div class="score-wrapper">
        <div class="score-word">
          <div class="word-wrapper">
            <div class="seller-score">{{seller.score}}</div>
            <div class="general-score">综合评分</div>
            <div class="rankRate">高于周边商家{{seller.rankRate}}%</div>
          </div>
        </div>
        <div class="score-image">
          <div class="image-wrapper">
            <div class="seller-sevice">
              <span>服务态度</span>
              <span class="image-star">
                <span :style="transHeight"></span>
              </span>
              <span class="service-score">{{seller.serviceScore}}</span>
            </div>
            <div class="seller-sevice">
              <span>服务态度</span>
              <span class="image-star">
                <span :style="transFood"></span>
              </span>
              <span class="food-score">{{seller.foodScore}}</span>
            </div>
            <div class="delivering">送达时间<span class="seller-deliverTime">{{seller.deliveryTime}}分钟</span></div>
          </div>
        </div>
      </div>
      <div class="divide"></div>
      <div class="ratingCount">
        <div class="rating-btn">
          <button class="btn-all" @click="satisfy = 0">全部<span>{{seller.ratingCount}}</span></button>
          <button class="btn-good" @click="satisfy = 1">满意<span>{{seller.goodCount}}</span></button>
          <button class="btn-bad" @click="satisfy = 2">不满意<span>{{seller.badCount}}</span></button>
        </div>
        <div class="rating-tip">
          <span class="icon-check_circle" @click="rateShow=!rateShow" :class="{'bg-or':rateShow}"></span>
          <span class="tip">只看有内容的评价</span>
        </div>
        <div class="rating-message" ref="ratingMessage" v-if="rateShow == false && satisfy == 0">
          <ul>
            <li v-for="(rates,index) in rate" :key="index" class="rate-content-wrapper">
              <div class="ratingAvatar">
                <div class="avatarImage">
                  <img :src="rates.avatar">
                </div>
              </div>
              <div class="mainRating">
                <div class="rating-head">
                  <span class="rating-username">{{rates.username}}</span>
                  <span class="rating-time">{{rates.rateTime}}</span>
                </div>
                <div class="rating-deliveryTime">
                <span class="people-ratingScore">
                  <span :style="transPeople(rates.score)"></span>
                </span>
                <span class="delivery-time" v-show="rates.deliveryTime">{{rates.deliveryTime}}分钟送达</span>
                </div>
                <div v-if="rates.text !=''" class="rating-text">{{rates.text}}</div>
                <div v-else class="rating-text">该用户没有做出评价，系统默认好评</div>
                <div v-show="rates.recommend != ''" class="rating-recommend">
                  <span class="icon-thumb_up"></span>
                  <span v-for="it in rates.recommend" :key="it.id" class="item-good"><span>{{it}}</span></span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="rating-message" ref="ratingMessage" v-else-if="rateShow == true && satisfy == 0">
          <ul>
            <li v-for="(rates,index) in rate" :key="index" class="rate-content-wrapper" v-show="rates.text != ''">
              <div class="ratingAvatar">
                <div class="avatarImage">
                  <img :src="rates.avatar">
                </div>
              </div>
              <div class="mainRating">
                <div class="rating-head">
                  <span class="rating-username">{{rates.username}}</span>
                  <span class="rating-time">{{rates.rateTime}}</span>
                </div>
                <div class="rating-deliveryTime">
                <span class="people-ratingScore">
                  <span :style="transPeople(rates.score)"></span>
                </span>
                <span class="delivery-time" v-show="rates.deliveryTime">{{rates.deliveryTime}}分钟送达</span>
                </div>
                <div v-if="rates.text !=''" class="rating-text">{{rates.text}}</div>
                <div v-else class="rating-text">该用户没有做出评价，系统默认好评</div>
                <div v-show="rates.recommend != ''" class="rating-recommend">
                  <span class="icon-thumb_up"></span>
                  <span v-for="it in rates.recommend" :key="it.id" class="item-good"><span>{{it}}</span></span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="rating-message" ref="ratingMessage" v-else-if="rateShow == true && satisfy == 1">
          <ul>
            <li v-for="(rates,index) in rate" :key="index" class="rate-content-wrapper" v-show="rates.text != '' && rates.score > 3">
              <div class="ratingAvatar">
                <div class="avatarImage">
                  <img :src="rates.avatar">
                </div>
              </div>
              <div class="mainRating">
                <div class="rating-head">
                  <span class="rating-username">{{rates.username}}</span>
                  <span class="rating-time">{{rates.rateTime}}</span>
                </div>
                <div class="rating-deliveryTime">
                <span class="people-ratingScore">
                  <span :style="transPeople(rates.score)"></span>
                </span>
                <span class="delivery-time" v-show="rates.deliveryTime">{{rates.deliveryTime}}分钟送达</span>
                </div>
                <div v-if="rates.text !=''" class="rating-text">{{rates.text}}</div>
                <div v-else class="rating-text">该用户没有做出评价，系统默认好评</div>
                <div v-show="rates.recommend != ''" class="rating-recommend">
                  <span class="icon-thumb_up"></span>
                  <span v-for="it in rates.recommend" :key="it.id" class="item-good"><span>{{it}}</span></span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="rating-message" ref="ratingMessage" v-else-if="rateShow == true && satisfy == 2">
          <ul>
            <li v-for="(rates,index) in rate" :key="index" class="rate-content-wrapper" v-show="rates.text != '' && rates.score <= 3">
              <div class="ratingAvatar">
                <div class="avatarImage">
                  <img :src="rates.avatar">
                </div>
              </div>
              <div class="mainRating">
                <div class="rating-head">
                  <span class="rating-username">{{rates.username}}</span>
                  <span class="rating-time">{{rates.rateTime}}</span>
                </div>
                <div class="rating-deliveryTime">
                <span class="people-ratingScore">
                  <span :style="transPeople(rates.score)"></span>
                </span>
                <span class="delivery-time" v-show="rates.deliveryTime">{{rates.deliveryTime}}分钟送达</span>
                </div>
                <div v-if="rates.text !=''" class="rating-text">{{rates.text}}</div>
                <div v-else class="rating-text">该用户没有做出评价，系统默认好评</div>
                <div v-show="rates.recommend != ''" class="rating-recommend">
                  <span class="icon-thumb_up"></span>
                  <span v-for="it in rates.recommend" :key="it.id" class="item-good"><span>{{it}}</span></span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="rating-message" ref="ratingMessage" v-else-if="rateShow == false && satisfy == 1">
          <ul>
            <li v-for="(rates,index) in rate" :key="index" class="rate-content-wrapper" v-show="rates.score > 3">
              <div class="ratingAvatar">
                <div class="avatarImage">
                  <img :src="rates.avatar">
                </div>
              </div>
              <div class="mainRating">
                <div class="rating-head">
                  <span class="rating-username">{{rates.username}}</span>
                  <span class="rating-time">{{rates.rateTime}}</span>
                </div>
                <div class="rating-deliveryTime">
                <span class="people-ratingScore">
                  <span :style="transPeople(rates.score)"></span>
                </span>
                <span class="delivery-time" v-show="rates.deliveryTime">{{rates.deliveryTime}}分钟送达</span>
                </div>
                <div v-if="rates.text !=''" class="rating-text">{{rates.text}}</div>
                <div v-else class="rating-text">该用户没有做出评价，系统默认好评</div>
                <div v-show="rates.recommend != ''" class="rating-recommend">
                  <span class="icon-thumb_up"></span>
                  <span v-for="it in rates.recommend" :key="it.id" class="item-good"><span>{{it}}</span></span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="rating-message" ref="ratingMessage" v-else-if="rateShow == false && satisfy == 2">
          <ul>
            <li v-for="(rates,index) in rate" :key="index" class="rate-content-wrapper" v-show="rates.score <= 3">
              <div class="ratingAvatar">
                <div class="avatarImage">
                  <img :src="rates.avatar">
                </div>
              </div>
              <div class="mainRating">
                <div class="rating-head">
                  <span class="rating-username">{{rates.username}}</span>
                  <span class="rating-time">{{rates.rateTime}}</span>
                </div>
                <div class="rating-deliveryTime">
                <span class="people-ratingScore">
                  <span :style="transPeople(rates.score)"></span>
                </span>
                <span class="delivery-time" v-show="rates.deliveryTime">{{rates.deliveryTime}}分钟送达</span>
                </div>
                <div v-if="rates.text !=''" class="rating-text">{{rates.text}}</div>
                <div v-else class="rating-text">该用户没有做出评价，系统默认好评</div>
                <div v-show="rates.recommend != ''" class="rating-recommend">
                  <span class="icon-thumb_up"></span>
                  <span v-for="it in rates.recommend" :key="it.id" class="item-good"><span>{{it}}</span></span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <shopcar :selectFoods="selectFoods" :deliverPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcar>
  </div>
</template>

<script>
import shopcar from './shopcar'
import Vue from 'vue'
import BScroll from 'better-scroll'
import axios from 'axios'
export default {
  props: {
    seller: {
      type: Object
    },
    ratings: {
      type: Array
    }
  },
  components: {
    shopcar
  },
  data () {
    return {
      goods: [],
      rate: [],
      rateShow: false,
      satisfy: 0,
      msg: 'Welcome to Your Vue.js App',
      selectFoods: this.$store.state.val
    }
  },
  computed: {
    transHeight () {
      var num = (Math.round(5 - this.seller.serviceScore)) * (-28)
      return {
        'transform': 'translateY(' + num + 'px)'
      }
    },
    transFood () {
      var num = (Math.round(5 - this.seller.foodScore)) * (-28)
      return {
        'transform': 'translateY(' + num + 'px)'
      }
    }
  },
  created () {
    axios.get('/good/goods').then(res => {
      if (res.data.code === 0) {
        this.goods = res.data.data
      }
    })
    axios.get('/good/ratings').then(res => {
      if (res.data.code === 0) {
        this.rate = res.data.data
        Vue.nextTick(() => {
          this._initscroll()
        })
      }
    })
  },
  methods: {
    transPeople (index) {
      var num = (Math.round(5 - index)) * (-28)
      return {
        'transform': 'translateY(' + num + 'px)'
      }
    },
    _initscroll () {
      this.ratingScroll = new BScroll(this.$refs.ratingWrapper, {
        probeType: 3,
        click: true
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/index.styl'
  #ratings
    position absolute
    top 174px
    bottom 48px
    left 0
    right 0
    width 100%
    overflow hidden
    .score-wrapper
      display flex
      width 100%
      height 106px
      box-sizing border-box
      padding 18px 24px
      .score-word
        display inline-block
        width 30%
        height 100%
        padding-right 24px
        border-1px-right(rgba(7,17,27,0.1))
        .word-wrapper
          width 100%
          height 70px
          .seller-score
            text-align center
            font-size 24px
            color rgb(255,153,0)
            line-height 28px
            margin-bottom 6px
          .general-score
            text-align center
            font-size 12px
            color rgb(7,17,27)
            line-height 12px
            margin-bottom 8px
          .rankRate
            text-align center
            font-size 10px
            color rgb(147,153,159)
            line-height 10px
      .score-image
        display inline-block
        flex 1
        padding 0 0 0 24px
        height 100%
        vertical-align top
        .image-wrapper
          position relative
          right 0
          .seller-sevice
            margin-bottom 8px
            .image-star
              display inline-block
              width 70px
              height 14px
              overflow hidden
              span
                display inline-block
                width 100%
                height 140px
                background-image url(../assets/images/rating@2x.png)
                background-size 100%
            .service-score,.food-score
              font-size 12px
              color rgb(255,153,0)
              line-height 18px
          .delivering
            .seller-deliverTime
              margin 12px
              font-size 12px
              color rgb(147,153,159)
              line-height 18px
    .divide
      position relative
      width 100%
      height 18px
      background-color rgba(7,17,27,0.05)
    .ratingCount
      width 100%
      .rating-btn
        width 100%
        height 72px
        border-1px(rgba(7,17,27,0.05))
        button
          margin-top 18px
          padding 7px 15px
          border none
          font-weight bolder
          span
            font-size 10px
            margin-left 5px
        .btn-all
          margin-left 18px
          background-color rgb(0,160,220)
          color #ffffff
        .btn-good
          background-color skyblue
    .rating-tip
      width 100%
      height 54px
      border-1px(rgba(7,17,27,0.05))
      span
        line-height 54px
        font-size 15px
        color rgba(7,17,27,0.3)
      .icon-check_circle
        width 34px
        height 34px
        padding 6px
        font-size 20px
        color rgba(7,17,27,0.3)
        margin-left 18px
        &.bg-or
          color orange
      .tip
        vertical-align top
        font-weight bolder
    .rating-message
      display inline-block
      width 100%
      overflow hidden
      box-sizing border-box
      padding 0 18px 0 18px
      .rate-content-wrapper
        display flex
        border-1px(rgba(7,17,27,0.1))
        width 100%
        padding 18px 0
        .ratingAvatar
          display inline-block
          width 28px
          padding-right 12px
          .avatarImage
            display inline-block
            width 28px
            height 28px
            border-radius 50%
            overflow hidden
            img
              width 100%
              height 100%
        .mainRating
          display inline-block
          flex 1
          .rating-head
            font-size 10px
            margin-bottom 4px
            .rating-username
              color rgb(7,17,27)
              line-height 12px
              margin-left 0
            .rating-time
              font-weight 200
              color rgb(143,153,159)
              line-height 12px
              float right
          .rating-deliveryTime
            font-size 10px
            font-weight 200
            color rgb(143,153,159)
            line-height 12px
            margin-bottom 6px
            .people-ratingScore
              display inline-block
              width 70px
              height 14px
              overflow hidden
              span
                display inline-block
                width 100%
                height 140px
                background-image url(../assets/images/rating@2x.png)
                background-size 100%
            .delivery-time
              margin-left 6px
          .rating-text
            font-size 12px
            color rgb(7,17,27)
            line-height 18px
            margin-bottom 8px
          .rating-recommend
            span
              margin-right 8px
              background-color #ffffff
            .item-good
              border 1px solid rgba(7,17,27,0.1)
              border-radius 2px
              span
                width 30px
                display inline-block
                font-size 9px
                color rgb(147,153,159)
                line-height 16px
                margin-left 6px
                white-space nowrap
                overflow hidden
            .icon-thumb_up
              font-size 12px
              color rgb(0,160,220)
              line-height 16px
</style>
