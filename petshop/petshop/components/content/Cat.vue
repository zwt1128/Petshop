<template>
  <div class="contentlr">
    <el-row style="width:100%">
      <el-col :span="5">
        <div class="cl">
          <div class="ctleft">
            <div class="content-zq">
              <h3 class="zq-h3">
                <img src="~/assets/zhuanqu.webp" /> 
                喵咪专区
              </h3>
              <div class="zq-bt">
                <ul class="bt-ul">
                  <li class="bt-li1" @click="switchType1('foot')">
                    <div class="bt-li-div">喵咪主粮</div>
                  </li>
                  <li class="bt-li2" @click="switchType2('life')">
                    <div class="bt-li-div">喵咪日用</div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="content-tj">
              <div class="tj-bt">
                <h3>
                  <!-- <img src="~/assets/img/tuijian.webp" />  -->
                  相关推荐
                </h3>
              </div>

              <ul class="ul">
                <li class="li" v-for="item in recommend" :key="item.id">
                  <div class="li-list">
                    <img :src="item.src1" class="image" />
                    <div class="li-list-style">
                      <div class="li-ta">{{ item.title.slice(0, 8) }}...</div>
                      <div class="li-pa">{{ item.price }}</div>
                      <div class="li-btn">
                        <nuxt-link
                          :to="{ path: '/shopping', query: { id: item.id } }"
                          >立即购买</nuxt-link
                        >
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :span="18" style="margin-left: 20px">
        <div class="cr">
          <div class="cr-index1">
            <img src="~/assets/img/s1.webp" class="imgs" />
            <div class="ctright">
              <!-- <ContentCtright></ContentCtright> -->
              <div class="cr-index">
                <div class="el-products3">
                  <ul class="ibody1" v-if="typess == 'all'">
                    <li
                      class="ibody-li1"
                      v-for="(item, index) in goodslist"
                      :key="item.id"
                    >
                      <nuxt-link
                        :to="{ path: '/shopping', query: { id: item.id } }"
                      >
                        <!--:body-style="{ padding: '0px' }"  修改card的样式-->
                        <el-card
                          :body-style="{ padding: '0px' }"
                          shadow="never"
                        >
                          <img
                            :src="
                              categoryIndex === index ? item.src2 : item.src1
                            "
                            class="image"
                            @mouseenter="mperent(index)"
                          />
                          <ul class="cbody1">
                            <li class="title1">
                              <a>{{ item.title.slice(0, 10) }}...</a>
                            </li>
                            <li class="price1">
                              <em>{{ item.price }}</em>
                            </li>
                          </ul>
                        </el-card>
                      </nuxt-link>
                    </li>
                  </ul>
                  <ul class="ibody1" v-if="typess == 'food'">
                    <li
                      class="ibody-li1"
                      v-for="(item, index) in goodslist1"
                      :key="item.id"
                    >
                      <nuxt-link
                        :to="{ path: '/shopping', query: { id: item.id } }"
                      >
                        <!--:body-style="{ padding: '0px' }"  修改card的样式-->
                        <el-card
                          :body-style="{ padding: '0px' }"
                          shadow="never"
                        >
                          <img
                            :src="
                              categoryIndex === index ? item.src2 : item.src1
                            "
                            class="image"
                            @mouseenter="mperent(index)"
                          />
                          <ul class="cbody1">
                            <li class="title1">
                              <a>{{ item.title.slice(0, 10) }}...</a>
                            </li>
                            <li class="price1">
                              <em>{{ item.price }}</em>
                            </li>
                          </ul>
                        </el-card>
                      </nuxt-link>
                    </li>
                  </ul>
                  <ul class="ibody1" v-if="typess == 'life'">
                    <li
                      class="ibody-li1"
                      v-for="(item, index) in goodslist2"
                      :key="item.id"
                    >
                      <nuxt-link
                        :to="{ path: '/shopping', query: { id: item.id } }"
                      >
                        <!--:body-style="{ padding: '0px' }"  修改card的样式-->
                        <el-card
                          :body-style="{ padding: '0px' }"
                          shadow="never"
                        >
                          <img
                            :src="
                              categoryIndex === index ? item.src2 : item.src1
                            "
                            class="image"
                            @mouseenter="mperent(index)"
                          />
                          <ul class="cbody1">
                            <li class="title1">
                              <a>{{ item.title.slice(0, 10) }}...</a>
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
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
@import "@/assets/css/zhuanqu/zhuanqu.scss";

.title1 a {
  color: #666;
  font-size: 13px;
}
.price1 {
  margin-top: 8px;
  em {
    color: rgb(255, 144, 3) !important;
  }
}
.el-products1 {
  width: 940px;
  height: 1270px;
  display: none;
  position: absolute;
  left: 248px;
  // top: 342px;
}

.el-products2 {
  width: 940px;
  height: 1270px;
  display: none;
  position: absolute;
  left: 360px;
  top: 342px;
}
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
import { defineComponent, ref, computed, watchEffect } from "vue";
const categoryIndex = ref("0");
const typess = ref("all");
const mperent = (i) => {
  categoryIndex.value = i;
};
const activeIndex = ref("1");
const activeIndex2 = ref("1");
const handleSelect = (key, keyPath) => {};
const { ctrightContent } = usectrightContent();
const config = useRuntimeConfig();
let goodslist = ref([]);
let goodslist1 = ref([]);
let goodslist2 = ref([]);
const { cityContent } = usecityContent();
// let { data } = await useFetch(`http://localhost:8888/api/content/city`);
// watchEffect(() => {
//   if (data.value) {
//     cityContent.value = data.value.chengshi;
//   }
// });
// goodslist.value = cityContent.value;
cityContent.value.forEach((item) => {
  if (item.type == "cat") {
    goodslist.value.push(item);
  }
});
let types = ref("");
const route = useRoute();
const recommend = computed(() => {
  let array = [];
  for (var i = 0; i < 5; i++) {
    array[i] = cityContent.value[i];
  }
  return array;
});
const switchType1 = (type1) => {
  let array = [];
  typess.value = "food";
  goodslist1.value = [];
  cityContent.value.forEach((item) => {
    if (item.type1 == "food" && item.type == "cat") {
      goodslist1.value.push(item);
    }
  });
};

const switchType2 = (type1) => {
  typess.value = "life";
  goodslist2.value = [];
  cityContent.value.forEach((item) => {
    if (item.type1 != "food" && item.type == "cat") {
      goodslist2.value.push(item);
    }
  });
};
</script>