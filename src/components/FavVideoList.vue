<script setup lang='ts'>
import FavVideoListItem from '@/components/FavVideoListItem.vue'

defineProps<{favVideoList: any}>()
</script>

<template>
  <div class="fav-video-list">
    <FavVideoListItem v-for="item in favVideoList" :key="item.id" :favVideoListItem="item" />
  </div>
</template>

<style lang='scss' scoped>
</style>
