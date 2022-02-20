<template>
  <div class="dleft">
    <dl class="section">
      <dd class="section-dd">
        <div class="box">
          <div class="small" @mouseenter="menter" @mouseleave="leave" @mousemove="marks">
            <img :src="img" class="small-img" />
            <div v-show="isShow" class="bai" :style="{ top: top + 'px', left: left + 'px' }"></div>
          </div>
          <div class="big" v-show="isShow">
            <img
              :src="img"
              @touchmove.prevent="marks"
              class="big-img"
              :style="{ top: topLgImg + 'px', left: leftLgImg + 'px' }"
            />
          </div>
        </div>
        <div class="thumbnails">
          <ul>
            <li @click="getIndex(data.child[0].src1)" v-if="data.child[0].src1">
              <img :src="data.child && data.child[0].src1" style="width: 82px; height: 82px" />
            </li>
            <li @click="getIndex(data.child[0].src2)" v-if="data.child[0].src2">
              <img :src="data.child && data.child[0].src2" style="width: 82px; height: 82px" />
            </li>
          </ul>
        </div>
      </dd>
      <dd class="section-dl">
        <h1>{{ data.child && data.child[0].title }}</h1>
        <div class="fg-div"></div>
        <div class="pinpai">
          <p>{{ data.child && data.child[0].pinpai }}</p>
          <p>物理形态: 其他</p>
          <p>适用对象: 通用</p>
        </div>
        <div class="price">
          <span>¥99.00</span>
        </div>
        <div class="fenlei" v-if="data.child[0].kouwei1">
          <span class="color">颜色</span>
          <a href="javascript:;">{{ data.child && data.child[0].kouwei1 }}</a>
          <a href="javascript:;">{{ data.child && data.child[0].kouwei2 }}</a>
        </div>
        <div class="price">
          <span>{{ data.child && data.child.price }}</span>
        </div>
        <div class="cart-button">
          <el-button class="el-button">立即购买</el-button>
          <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
        </div>
        <div class="sku_wrapper">
          <span>商品编号：</span>
          <span>{{ data.child && data.child[0].spbh }}</span>
        </div>
        <div class="posted_in">
          <span>分类：</span>
          <span class="alink">
            <span>{{ data.child && data.child[0].fenlei1 }}</span>
            <span>{{ data.child && data.child[0].fenlei2 }}</span>
            <span>{{ data.child && data.child[0].fenlei3 }}</span>
          </span>
        </div>
      </dd>
    </dl>
    <div class="column_container">
      <div class="tabconter-inner">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="详细信息" name="first">
            <img :src="data.child && data.child[0].src1" alt />
          </el-tab-pane>
          <el-tab-pane label="客户评价" name="second">
            <p>目前还未有评论</p>
            <p>只有买过此商品的客户登录后才能发表评论</p>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const img = ref();
const props = defineProps({
  data: {
    type: Object,
    default() {
      return {}
    }
  }
})
img.value = props.data.child && props.data.child[0].src2
const num = ref("1");
const activeName = ref('second')
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
  console.log(tab, event);
}
const handleChange = () => { };
const createCart = () => {
  console.log("加入购物车");
};
</script>

<style>
@import "@/assets/css/shopping/dleft.scss";
</style>