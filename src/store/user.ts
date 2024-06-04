import { onMounted, ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const upMid = ref<string>('')
  const upMidStatus = ref<boolean>(false) 

  watch(upMid, (newUpMid) => {
    if (newUpMid.trim() !== '') {
      upMidStatus.value = true
      return
    }
    upMidStatus.value = false
    localStorage.setItem('upMid', newUpMid)
  })

  onMounted(() => {
    const upMidStorage = localStorage.getItem('upMid')
    if (!upMidStorage) {
      return
    }
    upMid.value = upMidStorage
  })

  return {
    upMid,
    upMidStatus
  }
})
