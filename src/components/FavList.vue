<script setup lang='ts'>
import { computed, ref } from 'vue';
import { NButton, NPagination, NModal, NInput, useMessage, NScrollbar } from 'naive-ui'
import FavVideoList from '@/components/FavVideoList.vue'
import { Fav } from '@/types/fav'
import { request } from '@/utils';

const message = useMessage()
const favList = defineModel<Fav[]>('favList')

const favVideoList = ref<any>()
const page = ref(1)
const pageSize = ref(12)
const showModal = ref(false)
const selectFavId = ref<number>()
const addFavVideoBvid = ref<string>()

const pageCount = computed(() => {
  return Math.ceil((favVideoList.value ? favVideoList.value?.length : 0) / pageSize.value)
})

const favVideoListPagination = computed(() => {
  return favVideoList.value?.slice((page.value - 1) * pageSize.value, page.value * pageSize.value)
})

const showFavVideoList = (children: any) => {
  favVideoList.value = children
}

const handleShowModal = (favId: number) => {
  selectFavId.value = favId
  showModal.value = true
}

const addFavVideo = async () => {
  const { code, data, msg } = await request({
    url: '/web-interface/view',
    method: 'get',
    params: {
      bvid: addFavVideoBvid.value,
    }
  })
  if (code !== 200) {
    message.error(msg)
    return
  }
  favList.value?.map((item: any) => {
    if (item.id === selectFavId.value) {
      item['children'].unshift({
        ...data,
        bv_id: data.bvid,
        bvid: data.bvid,
        intro: data.desc,
        cover: data.pic,
        title: data.title,
        id: data.aid,
      })
    }
  })
}
</script>

<template>
  <div class="fav-list">
    <n-scrollbar style="max-height: 300px;">
      <div class="fav-list-content">
        <div class="fav-list-item" v-for="(item, _index) in favList" :key="item.id">
          <n-button
            class="btn"
            :color="item['children'] ? '#4eaf82' : '#ff5555'"
            @click="showFavVideoList(item['children'])"
          >{{ item.title }} [{{ item.media_count }}]</n-button>
          <n-button
            class="add"
            color="#039"
            size="tiny"
            @click="handleShowModal(item.id)"
          >添加</n-button>
        </div>
      </div>
    </n-scrollbar>
    <FavVideoList :favVideoList="favVideoListPagination" />
  </div>
  <n-pagination
    v-model:page="page"
    v-model:page-size="pageSize"
    :page-count="pageCount"
    :page-sizes="[6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 96]"
    size="small"
    show-quick-jumper
    show-size-picker
  />
  <n-modal v-model:show="showModal" preset="dialog" title="Dialog">
    <template #header>
      <div>B站视频BVID</div>
    </template>
    <n-input v-model:value="addFavVideoBvid"/>
    <template #action>
      <n-button type="primary" @click="addFavVideo">确定</n-button>
    </template>
  </n-modal>
</template>

<style lang='scss' scoped>
.fav-list {
  .fav-list-content {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 10px;
    margin-bottom: 20px;
    .fav-list-item {
      position: relative;
      .btn {
        width: 100%;
      }
      .add {
        position: absolute;
        right: 0;
        top: 0;
        z-index: 99;
        display: none;
      }
      &:hover {
        .add {
          display: block;
        }
      }
    }
  }
  
  @media (max-width: 1200px) {
    .fav-list-content {
      grid-template-columns: repeat(5, 1fr);
    }
  }
  @media (max-width: 700px) {
    .fav-list-content {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (max-width: 450px) {
    .fav-list-content {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>
