<template>
  <div :style="computedStyle"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "RowCenterDiv",
  props: {
    mode: {
      type: String,
      default: "center",
    },
  },
  computed:{
    computedStyle(){
      return {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: this.mode,
      }
    }
  }
};
</script>

<style scoped></style>
