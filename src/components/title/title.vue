<template>
  <div class="detail-title">
    <div class="line"></div>
    <div class="text" :style="styleObject">{{text}}</div>
    <div class="line"></div>
  </div>
</template>

<script>
  export default {
    props: {
      text: {
        type: String
      },
      styleObject: {
        type: Object
      }
    }
  };

</script>

<style lang="stylus">
  @import './title.styl';
</style>