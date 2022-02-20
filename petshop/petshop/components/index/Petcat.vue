<template>
  <div class="el-dog">
    <div class="el-dog-l">
      <div class="el-wrapper">
        <span></span>
        <div class="title-inner">
          <div class="title-bg">
            <div class="title">猫咪专区</div>
            <p>OG</p>
          </div>
        </div>
      </div>
      <div class="el-products">
        <ul class="ibody">
          <li class="ibody-li" v-for="(item,index) in petcat" :key="item.id">
            <nuxt-link :to="{ path: '/shopping', query: { id: item.id } }">
              <!--:body-style="{ padding: '0px' }"  修改card的样式-->
              <el-card :body-style="{ padding: '0px' }" shadow="never">
                <img
                  :src="categoryIndex === index ? item.src2 : item.src1"
                  class="image"
                  @mouseenter="mperent(index, item.id)"
                />
                <ul class="cbody">
                  <li class="title">
                    <a>{{ item.title }}</a>
                  </li>
                  <li class="price">
                    <em>{{ item.price }}</em>
                  </li>
                </ul>
              </el-card>
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div class="el-bigimage">
        <div class="el-right">
          <a>
            <img
              src="https://ccdn.goodq.top/caches/b743838f302c63c3a9df703d21b43e81/aHR0cDovLzVjOTk4MTZiNGQ0NjkudDczLnFpZmVpeWUuY29tL3FmeS1jb250ZW50L3VwbG9hZHMvMjAxOS8wMy85NGI1NGUwYmE3ZTNhNTYxYTQzNGQ3OTBhMjJhY2I2OC05MC53ZWJw.webp"
              alt
            />
          </a>
        </div>
        <div class="el-left">
          <a>
            <img
              src="https://ccdn.goodq.top/caches/b743838f302c63c3a9df703d21b43e81/aHR0cDovLzVjOTk4MTZiNGQ0NjkudDczLnFpZmVpeWUuY29tL3FmeS1jb250ZW50L3VwbG9hZHMvMjAxOS8wMy9jMGQ3YTkwMmIxMzllODkzOTdjN2U0NGExZjQ2YjA5Zi05MC53ZWJw.webp"
              alt
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const listid = ref('')
const categoryIndex = ref("0");
const { petcat } = usePetcat();
const mperent = (i, id) => {
  listid.value = id
  categoryIndex.value = i;
};
</script>
<style>
@import "@/assets/css/index/petdog.scss";
</style>