<template>
  <el-container>
    <el-header>
      <HeaderBindex></HeaderBindex>
    </el-header>
    <el-main>
      <div class="el-shoping">
        <div class="el-coniner">
          <div class="detaillr">
            <div class="dl">
              <div class="dleft">
                <dl class="section">
                  <dd class="section-dd">
                    <div class="box">
                      <div
                        class="small"
                        @mouseenter="menter"
                        @mouseleave="leave"
                        @mousemove="marks"
                      >
                        <img :src="img" class="small-img" />
                        <div
                          v-show="isShow"
                          class="bai"
                          :style="{ top: top + 'px', left: left + 'px' }"
                        ></div>
                      </div>
                      <div class="big" v-show="isShow">
                        <img
                          :src="img"
                          @touchmove.prevent="marks"
                          class="big-img"
                          :style="{
                            top: topLgImg + 'px',
                            left: leftLgImg + 'px',
                          }"
                        />
                      </div>
                    </div>
                    <div class="thumbnails">
                      <ul>
                        <li @click="getIndex(goods.src1)">
                          <img
                            :src="goods.src1"
                            style="width: 82px; height: 82px"
                          />
                        </li>
                        <li @click="getIndex(goods.src2)">
                          <img
                            :src="goods.src2"
                            style="width: 82px; height: 82px"
                          />
                        </li>
                      </ul>
                    </div>
                  </dd>
                  <dd class="section-dl">
                    <h1>{{ goods.title }}</h1>
                    <div class="fg-div"></div>
                    <div class="pinpai">
                      <p>{{ goods.brand }}</p>
                      <p>物理形态: 其他</p>
                      <p>适用对象: 通用</p>
                    </div>
                    <div class="price">
                      <span>{{ goods.price }}</span>
                    </div>
                    <div class="fenlei" v-if="goods.color && goods.color[0]">
                      <span class="color">颜色</span>
                      <a
                        href="javascript:;"
                        v-for="item in goods.color"
                        :key="item"
                        @click="selectType('颜色：', item)"
                        >{{ item }}</a
                      >
                    </div>
                    <div class="fenlei" v-if="goods.taste">
                      <span class="color" v-if="goods.taste && goods.taste[0]"
                        >口味</span
                      >
                      <a
                        href="javascript:;"
                        v-for="item in goods.taste"
                        :key="item"
                        @click="selectType('口味：', item)"
                        >{{ item }}</a
                      >
                    </div>
                    <div class="price">
                      <span>{{ goods.price }}</span>
                    </div>
                    <div class="cart-button">
                      <el-button class="el-button" @click="createCart(goods)"
                        >立即购买</el-button
                      >
                      <div v-show="isf" class="goshopp">
                        <div class="close" @click="close">×</div>
                        <p>添加成功</p>
                        <nuxt-link to="/cart">
                          <el-button class="el-shopp" @click="gocart"
                            >去购物车结算</el-button
                          >
                        </nuxt-link>
                      </div>
                      <el-input-number
                        v-model="num"
                        @change="handleChange"
                        :min="1"
                        :max="10"
                        label="描述文字"
                      ></el-input-number>
                    </div>
                    <div class="sku_wrapper">
                      <span>商品编号：</span>
                      <span>{{ goods.number }}</span>
                    </div>
                    <div class="posted_in">
                      <span>分类：</span>
                      <span class="alink">
                        <span v-for="item in goods.classify" :key="item">{{
                          item
                        }}</span>
                      </span>
                    </div>
                  </dd>
                </dl>
                <div class="column_container">
                  <div class="tabconter-inner">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                      <el-tab-pane label="详细信息" name="first">
                        <img :src="goods.src1" alt />
                      </el-tab-pane>
                      <el-tab-pane label="客户评价" name="second">
                        <p>目前还未有评论</p>
                        <p>只有买过此商品的客户登录后才能发表评论</p>
                      </el-tab-pane>
                    </el-tabs>
                  </div>
                </div>
              </div>
            </div>
            <div class="dr">
              <!-- <ShoppingDlright /> -->
              <div>
                <div class="content-tj">
                  <div class="tj-bt">
                    <h3>相关推荐</h3>
                  </div>
                  <ul class="ul">
                    <li v-for="item in goods.tuijian" :key="item.id" class="li">
                      <div class="li-list">
                        <img :src="item.src1" class="image" />
                        <div class="li-list-style">
                          <div class="li-ta">
                            {{ item.title.slice(0, 6) }}...
                          </div>
                          <div class="li-pa">{{ item.price }}</div>
                          <div class="li-btn">
                            <span
                              @click="clicks(item.id)"
                              style="cursor: pointer"
                              >立即购买</span
                            >
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-main>
    <el-footer>
      <FooterFindex></FooterFindex>
    </el-footer>
  </el-container>
</template>
<script >
export default {
  layout: "blank",
};
</script>
<script setup>
import { ref, watchEffect } from "vue";
import { ElMessage } from "element-plus/lib";
const config = useRuntimeConfig();
const { user } = useCount();
const img = ref();
const { goods } = useGoods();
const route = useRoute();
const router = useRouter();
const types = ref("");
let { data } = await useFetch("http://localhost:8888/api/user/getUser", {
  server: false,
  credentials:'include'
});

watchEffect(() => {
  if (data.value) {
    user.value = data.value;
  }
});
watch(route, async (routes) => {
  const { data: res1 } = await useFetch(
    `http://localhost:8888/api/test/goods?id=${routes.query.id}`
  );
  watchEffect(() => {
    if (res1.value) {
      goods.value = res1.value.test[0];
      img.value = goods.value.src1;
    }
  });
});
const { data: res2 } = await useFetch(
  `http://localhost:8888/api/test/goods?id=${route.query.id}`
);
watchEffect(() => {
  if (res2.value) {
    goods.value = res2.value.test[0];
  }
});

img.value = goods.value.src1;
const num = ref(1);
const activeName = ref("second");
const isPC = ref(true);
const isShow = ref(false); //控制遮罩层marks和大图片是否显示"
const left = ref("0"); //marks左移位置
const top = ref("0"); //marks下移位置
const leftLgImg = ref("0"); //大图lgImg移动的位置
const topLgImg = ref("0"); //大图lgImg移动的位置

//鼠标进入和离开
const menter = () => {
  isShow.value = true;
};
const leave = () => {
  isShow.value = false;
};
// 放大镜
const marks = (e) => {
  var marksWidth = 200; //marks的宽
  var marksHeight = 200; //marks的高
  if (isPC.value == true) {
    left.value = e.offsetX - 100;
    top.value = e.offsetY - 100;
    // 限制mark的位置
    if (left.value <= 0) {
      left.value = 0;
    } else if (left.value > 170) {
      left.value = 170;
    }
    if (top.value < 0) {
      top.value = 0;
    } else if (top.value > 230) {
      top.value = 230;
    }

    //大d图片除以小的图片的宽高
    leftLgImg.value = (-left.value * 130) / 170;
    topLgImg.value = (-top.value * 160) / 230;
  }
};

//点击小图片时将图片路径赋值给大图
const getIndex = (imgUrl) => {
  img.value = imgUrl;
};

// tab切换
const handleClick = (tab, event) => {
};
const isf = ref(false);
const close = () => {
  isf.value = false;
};
const handleChange = () => {};
// 立即购买
// { goodsNo: 3, img: 'http://localhost:8888/img/4.png', title: '维斯康 VITSCAN宠物保健品海藻颗粒', taste: '颜色:红色', price: 98, count: 1, userNo: userNo.value }
const createCart = async (goods) => {
  if (user.value.no) {
    let obj = {};
    obj.goodsNo = goods.id;
    obj.img = goods.src1;
    obj.title = goods.title;
    obj.taste = types.value;
    obj.price = parseFloat(goods.price.slice(1));
    obj.count = num.value;
    obj.userNo = user.value.no;
    const { data } = await useFetch("http://localhost:8888/api/addcart", {
      method: "post",
      body: obj,
    });
    isf.value = true;
  } else {
    ElMessage.info("请先登录");
  }
};
// 选择样式
const selectType = (name, type) => {
  types.value = name + type;
};
const clicks = (id) => {
  router.push(`/shopping?id=${id}`);
};
// const gocart=()=>{
//   router.
// }
</script>
<style lang="scss" scoped>
@import "@/assets/css/shopping/dright.scss";
@import "@/assets/css/shopping/dleft.scss";
@import "@/assets/css/public/layout.scss";
.el-header {
  height: 300px !important;
}
.el-footer {
  margin-top: 80px !important;
}
.el-shoping {
  width: 100%;
}
.cart-button {
  position: relative;
}
.el-coniner {
  border-top: 1px solid rgba(234, 234, 234, 1);
  width: 1190px;
  margin: 0 auto;
}
.el-header {
  height: 220px;
}
.detaillr {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
}
.dl {
  width: 75%;
}
.dr {
  margin-left: 25px;
  width: 25%;
}
.goshopp {
  position: absolute;
  top: 46px;
  left: 0;
  width: 337px;
  height: 70px;
  border: 1px solid #ccc;
  background-color: #fff;
  z-index: 99999;
}
.goshopp p {
  margin: 25px 0 0 30px;
  float: left;
  font-size: 12px;
  color: #555;
}
.goshopp .close {
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
}
.goshopp .el-shopp {
  margin: 12px 0 0 10px;
  float: left;
  width: 122px;
  height: 40px;
  color: #fff;
  background-color: #000 !important;
}
</style>