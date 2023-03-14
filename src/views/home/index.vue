<script setup lang="ts">
const main = useMainStore();
</script>

<template>
  <view text="center">
    {{ main.count }}
  </view>
  <button @click="main.count++">
    count++
  </button>
</template>

<style lang="less" scoped>
//
</style>
