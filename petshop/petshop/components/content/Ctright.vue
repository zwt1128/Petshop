<template>
  <div class="cr-index">
    <div class="el-products3">
      <ul class="ibody1">
        <li class="ibody-li1" v-for="(item, index) in ctrightContent" :key="item.id">
          <nuxt-link :to="{ path: '/shopping', query: { id: item.id } }">
            <!--:body-style="{ padding: '0px' }"  修改card的样式-->
            <el-card :body-style="{ padding: '0px' }" shadow="never">
              <img
                :src="categoryIndex === index ? item.src2 : item.src1"
                class="image"
                @mouseenter="mperent(index)"
              />
              <ul class="cbody1">
                <li class="title1">
                  <a>{{ item.title }}</a>
                </li>
                <li class="price1">
                  <em>{{ item.price }}</em>
                </li>
              </ul>
            </el-card>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.cr-index {
  width: 100% !important;
}

.el-products3 {
  width: 100%;
  height: 1270px;
  margin-right: 0 !important;
}

.el-products3 .ibody1 {
  float: left;
  list-style: none;
  width: 100%;
  height: 410px;
  background-color: #fff;
  box-sizing: border-box;
  padding-left: 0;
}

.el-card {
  border: 0;
}
.el-products3 .ibody1 .ibody-li1 {
  width: 25%;
  height: 410px !important;
  box-sizing: border-box;
  float: left;
  background: #fff;
  transition: background-color 0.5s;
}

.el-products3 .ibody1 .ibody-li1 a {
  width: 225px;
  height: 410px !important;
  text-decoration: none;
}

.el-products3 .ibody1 .ibody-li1 img {
  margin: 0;
  width: 100%;
  height: 325px;
  margin-bottom: 11px;
  cursor: pointer;
}

.el-products3 .ibody1 .ibody-li1 .cbody {
  padding: 0;
  text-align: center;
}

.el-products3 .ibody1 .ibody-li1 .title {
  font-size: 16px;
  color: #222;
  height: 22px;
  line-height: 22px;
  margin-bottom: 8px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}

.el-products3 .ibody1 .ibody-li1 .title a {
  font-size: 12px;
  color: #ccc;
}
.el-products3 .ibody1 .ibody-li1 .title1 a:hover {
  color: #000;
}

.el-products3 .ibody1 .ibody-li1 .price1 {
  height: 27px;
  overflow: hidden;
  margin-bottom: 10px;
  font-size: 14px;
  color: #be9e4d;
  font-weight: 500;
}

.el-products3 .ibody1 .ibody-li1 em {
  font-size: 20px;
  color: #be9e4d;
  margin-right: 6px;
  letter-spacing: -0.8px;
  cursor: pointer;
  font-style: normal;
}
</style>

<script setup>
import { ref, reactive } from "vue";
const categoryIndex = ref("0");
const handleClick = () => { };
// const aa = ref();
const mperent = (i) => {
  categoryIndex.value = i;
};

const config = useRuntimeConfig();
const { ctrightContent } = usectrightContent();
let { data } = await useFetch(`http://localhost:8888/api/content/city`);
if (data.value) {
  ctrightContent.value = data.value.chengshi;
}
</script>
