<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import { NSpace, NButton, NInput } from 'naive-ui'
import FavList from '@/components/FavList.vue'
import { useFav } from '@/hooks/useFav'
import { Fav } from '@/types/fav'

const { upMidStatus, upMid, getFavList, getFavVideoList, getFavListRequest, getFavVideoListRequest } = useFav()

const favList = ref<Fav[]>([])
const favVideoList = ref<any[]>([])


onMounted(() => {
  favList.value = getFavList()
  favVideoList.value = getFavVideoList()
})

</script>

<template>
  <div class="start">
    <n-space v-if="!upMidStatus">
      <n-input v-model:value="upMid" size="tiny" placeholder="请输入BiliID"/>
      <n-button type="primary" size="tiny" @click="getFavListRequest">Start</n-button>
    </n-space>
    <FavList
      v-else
      :favList
      :favVideoList
      :getFavVideoListRequest
    />
  </div>
</template>

<style lang='scss' scoped>

</style>
