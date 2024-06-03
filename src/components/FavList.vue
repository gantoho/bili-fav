<script setup lang='ts'>
import { NButton } from 'naive-ui'
import FavVideoList from '@/components/FavVideoList.vue'
import { Fav } from '@/types/fav'
import { useFavStore } from '@/store/fav';
import { toRefs } from 'vue';

defineProps<{
  favList: Fav[] | undefined
}>()

const { getFavVideoListRequest } = useFavStore()
const { favVideoList } = toRefs(useFavStore())
</script>

<template>
  <div class="start">
    <div class="fav-list-content">
      <div class="fav-item" v-for="(item, _index) in favList" :key="item.id">
        <n-button :color="item['children'] ? '#419' : '#ff5555'" size="tiny" @click="async () => { return await getFavVideoListRequest(item.id); item['children'] = favVideoList}">{{ item.title }}</n-button>
      </div>
    </div>
    <FavVideoList :favVideoList />
  </div>
</template>

<style lang='scss' scoped>
.start {
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
