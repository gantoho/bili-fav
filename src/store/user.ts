import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const upMid = ref<string>('')

  const setUpMid = (up_mid: string) => {
    upMid.value = up_mid
  }

  const getUpMid = (): string | null => {
    return upMid.value.trim() !== '' ? upMid.value : null 
  }

  onMounted(() => {
    const upMidStorage = localStorage.getItem('upMid')
    if (!upMidStorage) {
      return
    }
    setUpMid(upMidStorage)
  })

  return {
    getUpMid,
    setUpMid
  }
})
