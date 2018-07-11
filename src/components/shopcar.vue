<template>
  <div class="shopcar">
    <div class="content">
        <div class="chart-icon-wrapper">
            <div class="chart-icon icon-shopping_cart" :class="{noZChart: totalCount>0}" @click="fold=!fold"></div>
            <div class="total-count" v-show="totalCount != 0">{{totalCount}}</div>
        </div>
        <div class="deliver-fee">
            <div class="price border-1px-right" :class="{noZPrice:totalPrice > 0}">￥{{totalPrice}}</div>
            <div class="deliverPrice">另需配送费￥{{deliverPrice}}元</div>
        </div>
        <div class="deliver-base" :class="{ok:totalPrice>=minPrice}">{{inform}}</div>
    </div>
    <div class="car-list-wrapper" v-show="showList">
        <div class="car-gray" @click="fold=!fold"></div>
        <div class="car-list">
            <div class="car-list-header">
                <span class="car-title">购物车</span>
                <span class="clear" @click="clearAll()">清空</span>
            </div>
            <div class="food-item" v-for="food in selectFoods" :key="food.id" v-show="food.count!= 0">
                <span class="food-title">{{food.name}}</span>
                <span class="food-price">￥{{food.price*food.count}}</span>
                <carcontrol :foods="food" class="car-control"></carcontrol>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import carcontrol from './carcontrol'
export default {
  watch: {
    selectFoods () {
      this.$store.commit('changeVal', this.selectFoods)
    }
  },
  props: {
    deliverPrice: {
      type: Number
    },
    minPrice: {
      type: Number
    },
    selectFoods: {
      type: Array
    }
  },
  components: {
    carcontrol
  },
  computed: {
    totalCount () {
      let totalCount = 0
      this.selectFoods.forEach((food) => {
        totalCount += food.count
      })
      return totalCount
    },
    totalPrice () {
      let totalPrice = 0
      this.selectFoods.forEach((food) => {
        totalPrice += food.count * food.price
      })
      return totalPrice
    },
    inform () {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}起送`
      } else if (this.totalPrice > 0 && this.total < this.minPrice) {
        return `还差￥${this.minPrice - this.totalPrice}起送`
      } else {
        return `去结算`
      }
    },
    showList () {
      if (this.fold) {
        return true
      }
      return false
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      fold: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/index.styl'
    .shopcar
        position fixed
        width 100%
        height 48px
        bottom 0
        left 0
        z-index 300
        .content
            width 100%
            display flex
            background-color #141d27
            .chart-icon-wrapper
                flex 0 0 80px
                position relative
                .chart-icon
                    position relative
                    width 44px
                    height 44px
                    border-radius 44px
                    border 6px solid #141d27
                    background-color #2b333b
                    margin-left 18px
                    margin-top -10px
                    font-size 24px
                    color rgba(255,255,255,0.4)
                    line-height 44px
                    text-align center
                    &.noZChart
                        background-color #00a0dc
                        color #ffffff
                .total-count
                    position absolute
                    right 0px
                    top -6px
                    text-align center
                    background-color red
                    color #ffffff
                    width 24px
                    height 16px
                    font-size 8px
                    font-weight 600
                    line-height 16px
                    box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
                    border-radius 16px
            .deliver-fee
                flex 1
                padding 12px 0 12px 12px
                height 24px
                .price
                    display inline-block
                    line-height 24px
                    color rgba(255,255,255,0.2)
                    border-1px-right (rgba(255,255,255,0.4))
                    padding-right 10px
                    &.noZPrice
                        color #ffffff
                .deliverPrice
                    display inline-block
                    padding-left 12px
                    font-size 12px
                    color rgba(255,255,255,0.4)
                    line-height 20px
                    font-weight 700
            .deliver-base
                flex 0 0 105px
                padding 0 3px
                line-height 48px
                font-size 12px
                text-align center
                color rgba(255,255,255,0.1)
                font-weight 700
                background-color #2b333b
                &.ok
                    background-color green
                    color #ffffff
    .car-list-wrapper
        position fixed
        top 0
        bottom 48px
        width 100%
        display flex
        flex-direction column
        z-index -1
        .car-gray
            flex 1
            background-color rgba(7,17,27,0.6)
        .car-list
            width 100%
            position fixed
            bottom 48px
            left 0
            background-color #ffffff
            overflow auto
            max-height 217px
            .car-list-header
                height 40px
                line-height 40px
                padding 0 18px
                border-1px(rgba(7,17,27,0.1))
                background-color #f3f5f7
                .car-title
                    font-size 14px
                    font-weight 200
                    color rgb(7,17,27)
                .clear
                    position absolute
                    right 18px
                    font-size 12px
                    color rgb(0,160,220)
            .food-item
                width 100%
                height 48px
                line-height 48px
                margin 0 18px
                border-1px(rgba(7,17,27,0.1))
                .food-title
                    font-size 14px
                    color rgb(7,17,27)
                    line-height 24px
                    font-weight bolder
                .food-price
                    position absolute
                    right 120px
                    font-size 10px
                    color rgb(240,20,20)
                    font-weight 700
                .car-control
                    position absolute
                    right 18px
                    top 6px
                    display inline-block
</style>
