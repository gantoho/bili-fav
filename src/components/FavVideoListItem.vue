<script setup lang='ts'>
import { NCard } from 'naive-ui';

defineProps<{favVideoListItem: any}>()

const openVideo = (url: string) => {
  window.open(url, 'blank')
}
</script>

<template>
  <div class="fav-video-list-item">
    <n-card
      hoverable
      @click="openVideo(`https://www.bilibili.com/video/${ favVideoListItem.bvid }`)"
    >
      <template #cover>
        <img :src="favVideoListItem.cover" />
      </template>
      <div class="item-content">
        <div class="title">{{ favVideoListItem.title }}</div>
        <div class="intro">{{ favVideoListItem.intro }}</div>
      </div>
    </n-card>
  </div>
</template>

<style lang='scss' scoped>
.fav-video-list-item {
  cursor: pointer;
  img {
    width: 100%;
    height: 10vw;
    object-fit: cover;
  }
  .item-content {
    padding: 10px;
    .title {
      font-size: 16px;
      font-weight: 900;
      margin-bottom: 10px;
      height: 50px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    .intro {
      height: 67px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }
  }
  :deep(.n-card__content) {
    padding: 0;
  }
}
@media (max-width: 1000px) {
  .fav-video-list-item {
    img {
      height: 16vw;
    }
  }
}
@media (max-width: 500px) {
  .fav-video-list-item {
    img {
      height: 32vw;
    }
  }
}
</style>
