<script setup lang='ts'>
import { onMounted, ref, toRefs, nextTick } from 'vue'
import { NSpace, NButton, NInput, useMessage } from 'naive-ui'
import FavList from '@/components/FavList.vue'
import { useUserStore } from '@/store/user';
import { useFavStore } from '@/store/fav';
import { Fav } from '@/types/fav'

const message = useMessage()

const { upMid } = toRefs(useUserStore())
const { favList, favVideoList, pn } = toRefs(useFavStore())
const { getFavListRequest, getFavVideoListRequest } = useFavStore()

const biliId = ref<string>('')

const start = async () => {
  upMid.value = biliId.value
  localStorage.setItem('upMid', upMid.value)
  if (upMid.value.trim() !== '') {
    await getFavListRequest(upMid.value)
    if (!favList.value || favList.value?.length === 0) {
      message.info('该UP主没有收藏夹')
      localStorage.setItem('favList', 'null')
      return
    }

    favList.value?.forEach( async (item: Fav) => {
      const arr: any = []
      for (let i = 1; i <= Math.ceil(item.media_count / 20); i++) {
        pn.value = i
        await getFavVideoListRequest(item.id)
        arr.push(...favVideoList.value)
      }
      item['children'] = arr
      nextTick(() => {
        localStorage.setItem('favList', JSON.stringify(favList.value))
      })
    })
  }
}

onMounted(() => {
  biliId.value = upMid.value
})
</script>

<template>
  <div class="start">
    <n-space>
      <n-input v-model:value="biliId" size="tiny" placeholder="请输入BiliID"/>
      <n-button type="primary" size="tiny" @click="start" :disabled="biliId !== '' && biliId === upMid">Start</n-button>
    </n-space>
  </div>
  <div class="main">
    <FavList v-model:favList="favList" />
  </div>
</template>

<style lang='scss' scoped>
.start {
  display: flex;
  justify-content: center;
  padding: 40px 20px;
}
.main {
  padding: 0 20px;
}
</style>
