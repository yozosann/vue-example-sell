import Vue from 'vue';

export default {
  INIT_STORE_GOODS(state, goods) {
    state.goods = goods;
  },
  ADD_CART(state, food) {
    if (!state.order.has(food)) {
      Vue.set(food, 'count', 1);
      state.order.add(food);
    } else {
      food.count++;
    }
  },
  ADD_FIRST(state, food) {
    Vue.set(food, 'count', 1);
    state.order.add(food);
  },
  DECREASE_CART(state, food) {
    if (food.count) {
      food.count--;
      if (food.count === 0) {
        state.order.delete(food);
      }
    }
  },
  BAll_JUMP(state, el) {
    let ball = state.balls.find((ball) => {
      return ball.show === false;
    });
    ball.show = true;
    ball.el = el;
    state.dropBalls.push(ball);
  }
};