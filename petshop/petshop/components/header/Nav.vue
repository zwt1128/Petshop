<template>
  <div class="el-content">
    <div class="el-img">
      <img
        class="cimage"
        src="https://ccdn.goodq.top/caches/b743838f302c63c3a9df703d21b43e81/aHR0cDovLzVjOTk4MTZiNGQ0NjkudDczLnFpZmVpeWUuY29tL3FmeS1jb250ZW50L3VwbG9hZHMvMjAxOS8wMy82YjQ3NDk5OTg1OTdmODRjNzk5OWUwYTFkYjMyMzA5Yy05MC53ZWJw.webp"
      />
    </div>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#ff9003"
      text-color="#fff"
      active-text-color="#fff"
      @select="handleSelect"
      :router="true"
      :default-active="$route.path"
    >
      <el-menu-item style="width:135px" class="el_menu_item" index="/">首页</el-menu-item>
      <el-menu-item style="width:135px" class="el_menu_item" index="/dog">狗狗专区</el-menu-item>
      <el-menu-item style="width:135px" class="el_menu_item" index="/cat">猫咪专区</el-menu-item>
      <el-menu-item style="width:135px" class="el_menu_item" index="/food">主食专区</el-menu-item>
      <el-menu-item style="width:135px" class="el_menu_item" index="/drug">医药专区</el-menu-item>
      <el-menu-item style="width:135px" class="el_menu_item" index="/snack">零食专区</el-menu-item>
      <el-menu-item style="width:135px" class="el_menu_item" index="/life">日用专区</el-menu-item>
      <el-menu-item style="width:135px" class="el_menu_item" index="/login">登录</el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const activeIndex = ref("1");
const handleSelect = (key, keyPath) => {
  // activeIndex.value=key
};
</script>
<style scoped>
@import "@/assets/css/public/header.scss";
</style>

