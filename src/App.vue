<script setup lang="ts">
import { onHide, onLaunch, onShow } from "@dcloudio/uni-app";
import "uno.css";

onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>

<!-- <style lang="scss">
</style> -->
