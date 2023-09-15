<script setup lang="ts">
import "uno.css";

onLaunch(() => {
	console.log("App Launch");
	uni.hideTabBar();
});
onShow(() => {
	console.log("App Show");
});
onHide(() => {
	console.log("App Hide");
});
</script>

<style>
@import url("@tuniao/tn-style/dist/uniapp/index.css");
</style>
