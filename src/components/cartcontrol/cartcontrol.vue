<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop="decreaseCart($event)">
      </div>
    </transition>
    <transition name="fade">
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    </transition>
    <div class="cart-add icon-add_circle" @click.stop="addCart($event)"></div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return;
        }

        this.ADD_CART(this.food);
        this.BAll_JUMP(event.target);
      },
      decreaseCart(event) {
        if (!event._constructed) {
          return;
        }
        this.DECREASE_CART(this.food);
      },
      ...mapMutations([
        'ADD_CART',
        'DECREASE_CART',
        'BAll_JUMP'
      ])
    }
  };

</script>

<style lang="stylus">
  @import './cartcontrol.styl';
</style>