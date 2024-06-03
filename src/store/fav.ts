import { defineStore } from 'pinia'
import { ref, toRefs, watch } from 'vue'
import { request } from '@/utils'
import { Fav } from '@/types/fav'
import { useMessage } from 'naive-ui'
import { useUserStore } from '@/store/user';

export const useFavStore = defineStore('fav', () => {
  const { upMid } = toRefs(useUserStore())

  const message = useMessage()

  const favList = ref<Fav[]>([]) // 收藏夹列表
  const favVideoList = ref<any>() // 收藏夹内的视频列表

  /**
   * 请求获取收藏夹列表
   */
  const getFavListRequest = async (up_mid?: string) => {
    const { code, data, msg } = await request({
      url: '/folder/created/list-all',
      method: 'get',
      params: {
        up_mid: up_mid ? up_mid : upMid.value
      }
    })
    if (code !== 200) {
      message.error(msg)
      return
    }
    favList.value = data?.list
  }
  /**
   * 请求获取收藏夹内的视频列表
   */
  const getFavVideoListRequest = async (mediaId: number) => {
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

  watch(upMid, async (newUpMid) => {
    if (upMid.value.trim() !== '') {
      await getFavListRequest(newUpMid)

      favList.value.forEach( async (item: Fav) => {
        await getFavVideoListRequest(item.id)
        item['children'] = favVideoList.value
        localStorage.setItem('favList', JSON.stringify(favList.value))
      })
    }
  })

  

  return {
    favList,
    favVideoList,
    getFavListRequest,
    getFavVideoListRequest
  }
})
