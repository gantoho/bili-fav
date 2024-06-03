<script setup lang='ts'>
import { ref, toRefs } from 'vue'
import { NSpace, NButton, NInput } from 'naive-ui'
import FavList from '@/components/FavList.vue'
import { useUserStore } from '@/store/user';
import { useFavStore } from '@/store/fav';

const { upMid, upMidStatus } = toRefs(useUserStore())
const { favList } = toRefs(useFavStore())

const biliId = ref<string>('')

const start = () => {
  localStorage.setItem("upMid", biliId.value)
  upMid.value = biliId.value
}
</script>

<template>
  <n-space v-if="!upMidStatus">
    <n-input v-model:value="biliId" size="tiny" placeholder="请输入BiliID"/>
    <n-button type="primary" size="tiny" @click="start">Start</n-button>
  </n-space>
  <FavList v-else :favList />
</template>

<style lang='scss' scoped>

</style>
