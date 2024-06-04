<script setup lang='ts'>
import { watch, ref } from 'vue'
import FavVideoListItem from '@/components/FavVideoListItem.vue'
// import draggable from 'vuedraggable'

const favVideoList = defineModel<any>('favVideoList')
const favVideoListBackup = ref<any>()

watch(favVideoList, (newValue) => {
  favVideoListBackup.value = newValue
})
</script>

<template>
  <!-- <draggable :list="favVideoListBackup" itemKey="id" tag="div" class="fav-video-list"  animation="300">
    <template #item="{ element }">
      <FavVideoListItem :favVideoListItem="element" />
    </template>
  </draggable> -->
  <div class="fav-video-list">
    <FavVideoListItem v-for="(item) in favVideoListBackup" :key="item.id" :favVideoListItem="item" />
  </div>
</template>

<style lang='scss' scoped>
.fav-video-list {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
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
