<script setup lang="ts">

let title = $ref("wdf");

const a: T = 1;

function fn() {
  // hello();
}



EventBus.on("触发", () => {
  title = new Date().toLocaleString();
});

let urls = ["http://localhost:3000/daikuan"];
let urlIndex = ref(0);

// setTimeout(() => {
//   urlIndex.value++;
// }, 5000);
</script>


<template>
  <uni-icons type="contact" size="30"></uni-icons>
  <swiper>
    <swiper-item>1</swiper-item>
    <swiper-item>2</swiper-item>
  </swiper>
  <i-vscode-icons:file-type-actionscript2></i-vscode-icons:file-type-actionscript2>
  <uni-tag text="标签" type="error" circle></uni-tag>
  <button @click="$uni.navigateTo({ url: '/views/about/index' })" m="t-240rpx">跳转about</button>
  <button @click="$apis.test1({ body: { a: 1, b: 2 }, param: { a: 1, b: 2 }, query: { a: 1, b: 2 } })">发送请求</button>

  <picker mode="region" start="09:01" end="21:01" bindchange="bindTimeChange">
    <view class="picker">
      当前选择:
    </view>
  </picker>


  <!-- <web-view src="http://localhost:3000/daikuan"></web-view> -->

  <!-- 
  <button @click="urlIndex++">触发事件</button> -->



</template>



<style lang="scss" scoped>
</style>


