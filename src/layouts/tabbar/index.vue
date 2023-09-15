<script setup lang="ts"></script>

<template>
	<view class="tabbar layout">
		<view class="content">
			<slot />
		</view>
		<view class="tabbar">
			<view @click="$uni.switchTab({ url: '/pages/home/index' })">
				<view>icon</view>
				<view>主页</view>
			</view>

			<view @click="$uni.switchTab({ url: '/pages/about/index' })">
				<view>icon</view>
				<view>我的</view>
			</view>
		</view>
	</view>
</template>

<style lang="less" scoped>
.tabbar.layout {
	display: grid;
	grid-template-rows: 1fr max-content;
	min-height: 100vh;

	.tabbar {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
}
</style>
