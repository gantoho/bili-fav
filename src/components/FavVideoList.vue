<script setup lang='ts'>
import FavVideoListItem from '@/components/FavVideoListItem.vue'
import draggable from 'vuedraggable'

defineProps<{favVideoList: any}>()
</script>

<template>
  <draggable :list="favVideoList" itemKey="id" tag="div" class="fav-video-list"  animation="300">
    <template #item="{ element }">
      <FavVideoListItem :favVideoListItem="element" />
    </template>
  </draggable>
</template>

<style lang='scss' scoped>
.fav-video-list {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  
  container-name: fav-video-list;
}
@media (max-width: 1000px) {
  .fav-video-list {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (max-width: 500px) {
  .fav-video-list {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
