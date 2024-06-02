<script setup lang='ts'>
defineProps<{favVideoListItem: any}>()
</script>

<template>
  <div class="fav-video-list-item">
    <a :href="`https://www.bilibili.com/video/${ favVideoListItem.bvid }`" target="blank">{{ favVideoListItem.title }}</a>
  </div>
</template>

<style lang='scss' scoped>

</style>
