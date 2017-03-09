export default {
  // 目前vue暂不支持set／map
  // 由于goods和order拥有相同的food引用，可以利用goods激发计算属性
  selectFoods(state) {
    state.goods.forEach((good) => {
      good.foods.forEach((food) => {
        if (food.count) {
          // foods.push(food);
        }
      });
    });
    return [...state.order];
  }
};