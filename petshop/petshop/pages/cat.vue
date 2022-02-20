<template>
  <el-container>
    <el-header>
      <HeaderBindex></HeaderBindex>
    </el-header>
    <el-main>
      <div class="page-index">
        <ContentCat />
      </div>
    </el-main>
    <el-footer>
      <FooterFindex></FooterFindex>
    </el-footer>
  </el-container>
</template>
<script setup>
const { cityContent } = usecityContent();

let { data } = await useFetch(`http://localhost:8888/api/content/city`);
watchEffect(() => {
  if (data.value) {
    cityContent.value = data.value.chengshi;
  }
});
</script>
<style scoped>
@import "@/assets/css/public/layout.scss";
.el-header {
  height: 300px !important;
}
.el-footer {
  margin-top: 80px !important;
}
.page-index {
  text-align: center;
}
</style>