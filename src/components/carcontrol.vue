<template>
    <div id="car-control">
        <span class="decrease icon-remove_circle_outline" v-show="foods.count > 0" @click="remove"></span>
        <span class="count" v-show="foods.count > 0">{{foods.count}}</span>
        <span class="increase icon-add_circle" @click="add"></span>
    </div>
</template>
<script>
import Vue from 'vue'
export default {
  props: {
    foods: {
      type: Object
    }
  },
  data () {
    return {
      selectFoods: this.$store.state.val
    }
  },
  methods: {
    add (event) {
      if (event._constructed) {
        if (!this.foods.count) {
          Vue.set(this.foods, 'count')
          this.foods.count = 1
        } else {
          this.foods.count++
        }
      }
    },
    remove (event) {
      if (event._constructed) {
        if (this.foods.count === 0) {
          return this.foods.count
        } else {
          this.foods.count--
        }
      }
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/index.styl'
    #car-control
        font-size 0
        .icon-remove_circle_outline,.icon-add_circle
            display inline-block
            width 24px
            height 24px
            line-height 24px
            font-size 24px
        .decrease,.increase
            padding 6px
            display inline-block
            line-height 24px
            color #00a0dc
            font-size 24px
        .count
            display inline-block
            text-align center
            width 12px
            font-size 10px
            color rgb(147,153,159)
            line-height 35px
            vertical-align top
</style>
