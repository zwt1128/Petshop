<template>
  <el-container>
    <el-header>
      <HeaderHindex></HeaderHindex>
    </el-header>
    <el-main>
      <div class="page-index">
        <el-row>
          <IndexPetshop></IndexPetshop>
        </el-row>
        <el-row>
          <IndexPetvideo></IndexPetvideo>
        </el-row>
        <el-row>
          <IndexPetdog></IndexPetdog>
        </el-row>
        <el-row>
          <IndexPetcat></IndexPetcat>
        </el-row>
        <el-row>
          <IndexPetlike></IndexPetlike>
        </el-row>
      </div>
    </el-main>
    <el-footer>
      <FooterFindex></FooterFindex>
    </el-footer>
  </el-container>
</template>
<script setup>
import { watchEffect, ref } from "vue";
const { user } = useCount();
const router = useRouter();
const userNo = ref("");
const goCart = () => {
  router.push("/cart");
};
// const goods = ref([
//   {
//     id: 1,
//     img: "../assets/img/1.png",
//     title: "顺口味 无尘豆腐猫砂6L 快速除臭结团",
//     taste: "口味:绿茶味",
//     price: 29,
//     count: 1,
//   },
//   {
//     id: 2,
//     img: "../assets/img/2.png",
//     title: "亚禾 幼犬小型大型犬狗咬洁齿骨棒零食",
//     price: "19.8",
//     count: 1,
//   },
// ]);
watchEffect(() => {
  if (user.value) {
    userNo.value = user.value.no;
  }
});
const addCart = async () => {
  const { data } = await useFetch("http://localhost:8888/addcart", {
    method: "post",
    body: {
      goodsNo: 3,
      img: "http://localhost:8888/img/4.png",
      title: "维斯康 VITSCAN宠物保健品海藻颗粒",
      taste: "颜色:红色",
      price: 98,
      count: 1,
      userNo: userNo.value,
    },
  });
};
const { prefe } = usePrefe();

let { data:res3 } = await useFetch(`http://localhost:8888/api/prefe/prefe`);
if (res3.value) {
  prefe.value = res3.value.prefe;
} 
const { petdog } = usePetdog();
const { petcat } = usePetcat();
const { goods } = useGoods();
let goods1 = ref([]);
let goods2 = ref([]);
let { data } = await useFetch(`http://localhost:8888/api/test/test`);
if (data.value) {
  goods.value = data.value.test;
  data.value.test.forEach((item) => {
    if (item.type == "dog") {
      goods1.value.push(item);
    } else {
      goods2.value.push(item);
    }
  });
  petdog.value = goods1.value;
  petcat.value = goods2.value;

}
</script>
<script>
</script>
<style scoped>
.page-index {
  padding-top: 60px;
  text-align: center;
}
@import "@/assets/css/public/layout.scss";
.el-header {
    width: 100%;
    height: 550px;
}
</style>
