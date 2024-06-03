<script setup lang='ts'>
import { NButton } from 'naive-ui'
import FavVideoList from '@/components/FavVideoList.vue'
import { Fav } from '@/types/fav'

defineProps<{
  favList: Fav[],
  getFavVideoListRequest: (mediaId: number) => void,
  favVideoList: any[]
}>()

</script>

<template>
  <div class="start">
    <div class="fav-list-content">
      <div class="fav-item" v-for="(item, _index) in favList" :key="item.id">
        <n-button type="primary" size="tiny" @click="getFavVideoListRequest(item.id)">{{ item.title }}</n-button>
      </div>
    </div>
    <FavVideoList :favVideoList />
  </div>
</template>

<style lang='scss' scoped>
.start {
  width: 100vw;
  height: 100vh;
  .query {
    display: flex;
    justify-content: center;
  }
  .fav-list-content {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
}
</style>
