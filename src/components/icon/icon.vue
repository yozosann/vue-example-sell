<template>
  <span class="icon" :class="classMap[iconType]+'-'+colorType" :style="{width:size+'px',height:size+'px'}"></span>
</template>

<script>
  export default {
    props: {
      iconType: {
        type: Number
      },
      colorType: {
        type: Number
      },
      size: {
        type: Number
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'speical', 'invoice', 'guarantee'];
    }
  };

</script>

<style lang="stylus">
  @import './icon.styl';
</style>