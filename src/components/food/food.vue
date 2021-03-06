<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click.prevent="hide"><i class="icon-arrow_lift"></i></div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">¥{{food.price}}</span><span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food"></cartcontrol>
          </div>
          <transition name="fade">
            <div @click.stop="addFirst" class="buy" v-show="!food.count || food.count===0 ">加入购物车</div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect :father="self" :active-options="activeOptions" :desc="desc" :ratings="food.ratings"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType,rating.text)" class="rating-item border-1px" v-for="rating in food.ratings">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" width="12" height="12" :src="rating.avatar">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { formatDate } from 'common/js/date';
  import BScroll from 'better-scroll';
  import cartcontrol from 'components/cartcontrol/cartcontrol.vue';
  import split from 'components/split/split.vue';
  import ratingselect from 'components/ratingselect/ratingselect.vue';
  import { mapMutations } from 'vuex';

  // const POSITIVE = 0;
  // const NEGATIVE = 1;
  const ALL = 2;

  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false,
        activeOptions: {
          selectType: ALL,
          onlyContent: false
        },
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        },
        self: this
      };
    },
    mounted() {
      this.$on('refresh', () => {
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      });
    },
    methods: {
      show() {
        this.showFlag = true;
        this.activeOptions.selectType = ALL;
        this.activeOptions.onlyContent = false;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide() {
        this.showFlag = false;
      },
      addFirst(event) {
        if (!event._constructed) {
          return;
        }
        this.ADD_FIRST(this.food);
        // 优化动画效果
        this.$nextTick(() => {
          this.BAll_JUMP(event.target);
        });
      },
      needShow(type, text) {
        if (this.activeOptions.onlyContent && !text) {
          return false;
        }
        if (this.activeOptions.selectType === ALL) {
          return true;
        } else {
          return type === this.activeOptions.selectType;
        }
      },
      ...mapMutations([
        'ADD_FIRST',
        'BAll_JUMP'
      ])
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      cartcontrol,
      split,
      ratingselect
    }
  };

</script>

<style lang="stylus">
  @import './food.styl';
</style>