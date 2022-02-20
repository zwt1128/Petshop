<template>
  <div class="el-like">
    <div class="el-wrapper">
      <div class="title-inner">
        <div class="title-bg"></div>
        <p>猜你喜欢</p>
        <div class="title"></div>
      </div>
    </div>

    <el-carousel
      height="520px"
      :interval="5000"
      arrow="always"
      type="card"
      class="el-image"
    >
      <el-carousel-item
        v-for="item in petcat"
        :key="item.src1"
      >
        <a href="" class="ibody-a">
          <el-card shadow="never">
            <div class="el-img">
              <img :src="item.src1" class="image" />
            </div>            
            <ul class="cbody">
              <li class="title">
                <a>{{ item.title }}</a>
              </li>
              <li class="price">
                <em>{{ item.price }}</em>
              </li>
            </ul>
          </el-card>
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script setup>
import { ref } from "vue";
const { petcat } = usePetcat();
</script>
<style scoped>
@import "@/assets/css/index/petlike.scss";
</style>