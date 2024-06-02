<script setup lang='ts'>
import { ref } from 'vue'
import { NSpace, NButton, NInput, useMessage } from 'naive-ui'
import { request } from '@/utils'
import { Fav } from '@/types/fav'
import FavVideoList from '@/components/FavVideoList.vue'

const message = useMessage()

const upMid = ref<string>('1112912961') // 用户ID
const favList = ref<Fav[]>([]) // 收藏夹列表
const favVideoList = ref<any>() // 收藏夹内的视频列表
/**
 * 获取收藏夹列表
 */
const getFavList = async () => {
  const { code, data, msg } = await request({
    url: '/folder/created/list-all',
    method: 'get',
    params: {
      up_mid: upMid.value
    }
  })
  if (code !== 200) {
    message.error(msg)
    return
  }
  favList.value = data.list
}
/**
 * 获取收藏夹内的视频列表
 */
const getFavVideoList = async (mediaId: number) => {
  const { code, data, msg } = await request({
    url: '/resource/list',
    method: 'get',
    params: {
      media_id: mediaId,
      pn: 1,
      ps: 20,
      keyword: '',
      order: 'mtime',
      type: 0,
      tid: 0,
      platform: 'web'
    }
  })
  if (code !== 200) {
    message.error(msg)
    return
  }
  favVideoList.value = data.medias
}
</script>

<template>
  <div class="start">
    <div class="query">
      <n-space>
        <n-input v-model:value="upMid" size="tiny" placeholder="请输入BiliID"/>
        <n-button type="primary" size="tiny" @click="getFavList">Start</n-button>
      </n-space>
    </div> 
    <div class="fav-list-content">
      <div class="fav-item" v-for="(item, _index) in favList" :key="item.id">
        <n-button type="primary" size="tiny" @click="getFavVideoList(item.id)">{{ item.title }}</n-button>
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
