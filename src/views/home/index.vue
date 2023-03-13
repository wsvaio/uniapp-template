<script setup lang="ts">
import { ref } from "vue";
const title = ref("Hello");
const popup = $ref<UniHelper.UniPopupInstance>();
const open = () => {
  if (!popup) return;
  popup.open!("top");
};
</script>

<template>
  <view class="content">
    <image class="logo" src="@/assets/logo.png" />
    <view class="text-area">
      <text class="title mt-200px" m="l-200px">
        {{ title }}123
      </text>
    </view>

    <button @click="open">
      打开弹窗
    </button>
    <uni-popup ref="popup" type="bottom">
      底部弹出 Popup
    </uni-popup>
  </view>
</template>

<style lang="less" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  width: 200rpx;
  height: 200rpx;
  margin: 200rpx auto 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  color: #8f8f94;
  font-size: 36rpx;
}
</style>
