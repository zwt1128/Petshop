<template>
    <div class="el-shop"> 
        <img @mousemove="imgmove" class="el-dimg" src="https://ccdn.goodq.top/caches/b743838f302c63c3a9df703d21b43e81/aHR0cDovLzVjOTk4MTZiNGQ0NjkudDczLnFpZmVpeWUuY29tL3FmeS1jb250ZW50L3VwbG9hZHMvMjAxOS8wMy8yNDM3MjQ0YTZjZjI4MWI2MDAwNTNmOWNjN2M0NzZiMy05MC53ZWJw.webp" alt="">
       <div class="el-inner">
           <div class="inner-title">
               宠物用品商城
           </div>
           <div class="inner-text">
               我们的流线式网页布局设计方案和可视化图文内容编辑模式让网站制作和维护成为一件轻松惬意的事。起飞页的核心竞争力来自于它集流线式布局方案与可视化内容编辑于一体，支持打字传图、自由拖拽，不需要专业编写代码，您可以随心所欲创建区块、添加组件…
           </div>
       </div>
    </div>
</template>
<style>
@import "@/assets/css/index/petshop.scss";
</style>
<script setup>
const imgmove = (e)=>{
    if(e.clientX<615){
        document.querySelector('.el-dimg').style.left=-40+'px';
    }
    else {
         document.querySelector('.el-dimg').style.left=-53+'px';
    }

}
</script>