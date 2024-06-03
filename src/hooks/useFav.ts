import { onMounted, ref } from 'vue'
import { request } from '@/utils'
import { Fav } from '@/types/fav'
import { useMessage } from 'naive-ui'
import { getActivePinia } from 'pinia'
import { useUserStore } from '@/store/user';


export const useFav = () => {
  getActivePinia()
  
  const message = useMessage()
  const userStore = useUserStore()

  const upMid = ref<string>() // 用户ID
  const upMidStatus = ref<boolean>(true) // 用户ID状态
  const favList = ref<Fav[]>([]) // 收藏夹列表
  const favVideoList = ref<any>() // 收藏夹内的视频列表

  /**
   * 获取收藏夹列表
   */
  const getFavList = (): Fav[] => {
    return favList.value
  }
  /**
   * 获取收藏夹内的视频列表
   */
  const getFavVideoList = (): any => {
    return favVideoList.value
  }
  /**
   * 请求获取收藏夹列表
   */
  const getFavListRequest = async () => {
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

  onMounted(() => {
    if (!userStore.getUpMid()) {
      message.warning('请先输入BiliID')
      upMidStatus.value = false
      return
    }
    upMidStatus.value = true
    upMid.value = userStore.getUpMid() as string
  })
  
  return {
    upMid,
    upMidStatus,
    getFavList,
    getFavVideoList,
    getFavListRequest,
    getFavVideoListRequest
  }
}
