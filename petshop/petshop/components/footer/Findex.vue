<template>
  <footer class="com-footer" @scroll="mscroll">
    <div class="footer-content">
      <div class="foot-list">
        <div class="footer-col">
          <dl>
            <img
              src="https://ccdn.goodq.top/caches/b743838f302c63c3a9df703d21b43e81/aHR0cDovLzVjOTk4MTZiNGQ0NjkudDczLnFpZmVpeWUuY29tL3FmeS1jb250ZW50L3VwbG9hZHMvMjAxOS8wMy8xYzkxYjMxNGQxMDc2MTJkYjAyYTcxOTMzMjA0NmUzMC05MC53ZWJw.webp"
            />
            <dt>速享</dt>
            <dd>尽享便捷服务</dd>
          </dl>
        </div>
        <div class="footer-col">
          <dl>
            <img
              src="https://ccdn.goodq.top/caches/b743838f302c63c3a9df703d21b43e81/aHR0cDovLzVjOTk4MTZiNGQ0NjkudDczLnFpZmVpeWUuY29tL3FmeS1jb250ZW50L3VwbG9hZHMvMjAxOS8wMy9hYTg1ZjY4MjFiYTRiYmMwZTdhODljYjZiZmFjN2I1Zi05MC53ZWJw.webp"
              alt=""
            />
            <dt>惠普</dt>
            <dd>诚意惠及大众</dd>
          </dl>
        </div>
        <div class="footer-col">
          <dl>
            <img
              src="https://ccdn.goodq.top/caches/b743838f302c63c3a9df703d21b43e81/aHR0cDovLzVjOTk4MTZiNGQ0NjkudDczLnFpZmVpeWUuY29tL3FmeS1jb250ZW50L3VwbG9hZHMvMjAxOS8wMy9iNDA2ZTExMTQ5Y2RkYjUyYWIyNTczMDMyZjI3M2QzYi05MC53ZWJw.webp"
            />
            <dt>专业</dt>
            <dd>十年专注母婴</dd>
          </dl>
        </div>
        <div class="footer-col">
          <dl>
            <img
              src="https://ccdn.goodq.top/caches/b743838f302c63c3a9df703d21b43e81/aHR0cDovLzVjOTk4MTZiNGQ0NjkudDczLnFpZmVpeWUuY29tL3FmeS1jb250ZW50L3VwbG9hZHMvMjAxOS8wMy8xMjFhOGU5M2NhNmE4YTg4ODRlM2MyNmE5MDkxZDMzMi05MC53ZWJw.webp"
              alt=""
            />
            <dt>品质</dt>
            <dd>正规品质保障</dd>
          </dl>
        </div>
      </div>
      <div class="footer-link clearfix">
        <div class="footer-column">
          <dl>
            <dt>新手指南</dt>
            <dd>购物流程</dd>
            <dd>会员介绍</dd>
            <dd>积分制度</dd>
          </dl>
        </div>
        <div class="footer-column">
          <dl>
            <dt>物流配送</dt>
            <dd>配送服务</dd>
            <dd>验货签收</dd>
            <dd>合作快递</dd>
          </dl>
        </div>
        <div class="footer-column">
          <dl>
            <dt>支付方式</dt>
            <dd>货到付款</dd>
            <dd>在线支付</dd>
            <dd>现金账户</dd>
          </dl>
        </div>
        <div class="footer-column">
          <dl>
            <dt>售后服务</dt>
            <dd>赔偿承诺</dd>
            <dd>发票制度</dd>
            <dd>退货政策</dd>
          </dl>
        </div>
        <div class="footer-column">
          <dl>
            <dt>常见问题</dt>
            <dd>购物问题</dd>
            <dd>账户安全</dd>
          </dl>
        </div>
        <div class="footer-column">
          <dl>
            <dt>联系我们</dt>
            <dd>联系客服</dd>
            <dd>意见反馈</dd>
          </dl>
        </div>
        <div class="footer-img">
          <img
            src="https://ccdn.goodq.top/caches/b743838f302c63c3a9df703d21b43e81/aHR0cDovLzVjOTk4MTZiNGQ0NjkudDczLnFpZmVpeWUuY29tL3FmeS1jb250ZW50L3VwbG9hZHMvMjAxOS8wMy82NmE5OWQ2ZDFhN2MyYzkwMGFkOTcxMDA0NWJjNmJmOC04MHg4MC05MC53ZWJw.webp"
            alt=""
          />
        </div>
      </div>
    </div>
    <ul class="right-bar" v-show="goTopShow">
      <li>
        <img src="~/assets/img/p.png" alt="" />
      </li>
      <li>
        <img src="~/assets/img/q.png" alt="" />
      </li>
      <li>
        <img src="~/assets/img/l.png" alt="" />
      </li>
      <li class="top" @click="toTop">
        <img src="~/assets/img/t.png" alt="" />
      </li>
    </ul>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      scrollTop: "",
      goTopShow: false,
    };
  },
  methods: {
    handleScroll() {
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (this.scrollTop > 500) {
        this.goTopShow = true;
      } else if (this.scrollTop < 200) {
        this.goTopShow = false;
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
<script setup>
const toTop = () => {
  document.documentElement.scrollTop = 0;
};
</script>
<style lang="scss">
// @import "@/assets/css/public/footer.scss";
</style> 