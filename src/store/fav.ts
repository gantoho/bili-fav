import { defineStore } from 'pinia'
import { nextTick, onMounted, ref, toRefs } from 'vue'
import { request } from '@/utils'
import { Fav } from '@/types/fav'
import { useMessage } from 'naive-ui'
import { useUserStore } from '@/store/user';

export const useFavStore = defineStore('fav', () => {
  const { upMid } = toRefs(useUserStore())

  const message = useMessage()

  const favList = ref<Fav[]>([]) // 收藏夹列表
  const favVideoList = ref<any>() // 收藏夹内的视频列表
  const pn = ref<number>(1) // 分页页面

  /**
   * 请求获取收藏夹列表
   */
  const getFavListRequest = async (up_mid?: string) => {
    const { code, data, msg } = await request({
      url: '/v3/fav/folder/created/list-all',
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
      url: '/v3/fav/resource/list',
      method: 'get',
      params: {
        media_id: mediaId,
        pn: pn.value,
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

  onMounted( async () => {
    const favListStorage = localStorage.getItem('favList')
    if (favListStorage) {
      favList.value = JSON.parse(favListStorage)
      return
    }
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
  })

  return {
    favList,
    favVideoList,
    pn,
    getFavListRequest,
    getFavVideoListRequest
  }
})
