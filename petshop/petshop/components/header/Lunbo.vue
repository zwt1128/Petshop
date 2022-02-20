<template>
  <div class="el-lunbo">
    <!-- 轮播图 -->
    <el-carousel height="550px" :interval="5000" class="el-image">
      <el-carousel-item v-for="item in img" :key="item.img">
        <img
          :src="item.img"
          style="height: 100%; width: 100%"
          alt="图片丢失了"
        />
      </el-carousel-item>
    </el-carousel>
    <!-- 专区 -->
    <div class="el-prefe">
      <div class="el-pre" v-for="item in prefe" :key="item.img">
        <div class="el-title">
          <img :src="item.img" alt="" />
          <div class="title">{{ item.title }}</div>
          <div class="text">
            <span
              ><a href="">{{ item.cont1 }}</a></span
            >
            <span
              ><a href="">{{ item.cont2 }}</a></span
            >
            <span
              ><a href="">{{ item.cont3 }}</a></span
            >
            <span
              ><a href="">{{ item.cont4 }}</a></span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const config = useRuntimeConfig();
const img = ref([
  {
    img: "https://ccdn.goodq.top/caches/b743838f302c63c3a9df703d21b43e81/aHR0cDovLzVjOTk4MTZiNGQ0NjkudDczLnFpZmVpeWUuY29tL3FmeS1jb250ZW50L3VwbG9hZHMvMjAxOS8wMy82OGEwNWE3ZWM3ZGU0MDk3YTcyZWExOGU2ZTk0ODEyMS05MC53ZWJw.webp",
  },
  {
    img: "https://ccdn.goodq.top/caches/b743838f302c63c3a9df703d21b43e81/aHR0cDovLzVjOTk4MTZiNGQ0NjkudDczLnFpZmVpeWUuY29tL3FmeS1jb250ZW50L3VwbG9hZHMvMjAxOS8wMy8xMDZjNzM3ZmY5YzVlMGM4OTJiYmM4YWEzMDE2ZDQwNi05MC53ZWJw.webp",
  },
]);

// const imagesBox = ref();
// const prefe = ref([])
const { prefe } = usePrefe();
</script>
<style scoped>
@import "@/assets/css/header/lunbo.scss";
</style>