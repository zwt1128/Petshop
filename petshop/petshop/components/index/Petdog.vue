<template>
  <div class="el-dog">
    <div class="el-dog-l">
      <div class="el-wrapper">
        <span></span>
        <div class="title-inner">
          <div class="title-bg">
            <div class="title">狗狗专区</div>
            <p>OG</p>
          </div>
        </div>
      </div>
      <div class="el-products">
        <ul class="ibody">
          <li class="ibody-li" v-for="(item, index) in petdog" :key="item.id">
            <nuxt-link :to="{ path: '/shopping', query: { id: item.id } }">
              <el-card :body-style="{ padding: '0px' }" shadow="never">
                <img
                  :src="categoryIndex === index ? item.src2 : item.src1"
                  class="image"
                  @mouseenter="mperent(index)"
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
        <div class="el-left">
          <a>
            <img
              src="https://ccdn.goodq.top/caches/b743838f302c63c3a9df703d21b43e81/aHR0cDovLzVjOTk4MTZiNGQ0NjkudDczLnFpZmVpeWUuY29tL3FmeS1jb250ZW50L3VwbG9hZHMvMjAxOS8wMy9mYTk2ZmRkMDg0MTQ5NzI5YjllMmM4Y2ZjMDY5MjUyNC05MC53ZWJw.webp"
              alt
            />
          </a>
        </div>
        <div class="el-right">
          <a>
            <img
              src="https://ccdn.goodq.top/caches/b743838f302c63c3a9df703d21b43e81/aHR0cDovLzVjOTk4MTZiNGQ0NjkudDczLnFpZmVpeWUuY29tL3FmeS1jb250ZW50L3VwbG9hZHMvMjAxOS8wMy80MWFiNTEzMDcwMjYwYjY1NDkzNDQzZDY1OTFjZWVhMy05MC53ZWJw.webp"
              alt
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
const { petdog } = usePetdog();
const { petcat } = usePetcat();
const { goods } = useGoods();
const categoryIndex = ref("0");
// let goods1 = ref([]);
// let goods2 = ref([]);
// let { data } = await useFetch(`http://localhost:8888/api/test/test`);
// if (data.value) {
//   goods.value = data.value.test;
//   data.value.test.forEach((item) => {
//     if (item.type == "dog") {
//       goods1.value.push(item);
//     } else {
//       goods2.value.push(item);
//     }
//   });
//   petdog.value = goods1.value;
//   petcat.value = goods2.value;
// }
const mperent = (i) => {
  categoryIndex.value = i;
};
</script>
<style>
@import "@/assets/css/index/petdog.scss";
</style>