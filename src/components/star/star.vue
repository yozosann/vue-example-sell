<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script>
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';

  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType() {
        return 'star-' + this.size;
      },
      itemClasses() {
        let result = [];
        let score = Math.floor(this.score * 2) / 2;
        let hasDecimal = score % 1 !== 0;
        let integer = Math.floor(score);
        for (let i = 0; i < LENGTH; i++) {
          if (i < integer) {
            result.push(CLS_ON);
          } else if (i === integer && hasDecimal) {
            result.push(CLS_HALF);
          } else {
            result.push(CLS_OFF);
          }
        }
        return result;
      }
    }
  };

</script>

<style lang="stylus">
  @import './star.styl'
</style>