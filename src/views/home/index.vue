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
  <button @click="testGet({ q: { a: '我带你们打' } })">
    312
  </button>
</template>

<style lang="less" scoped>
//
</style>
