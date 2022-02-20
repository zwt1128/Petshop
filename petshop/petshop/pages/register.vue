<template>
  <el-container>
    <el-header>
      <HeaderBindex></HeaderBindex>
    </el-header>
    <el-main>
      <div class="container">
        <el-row>
          <el-col :md="12" :sm="24">
            <img
              src="https://ccdn.goodq.top/caches/b743838f302c63c3a9df703d21b43e81/aHR0cDovLzVjOTk4MTZiNGQ0NjkudDczLnFpZmVpeWUuY29tL3FmeS1jb250ZW50L3VwbG9hZHMvMjAxOS8wMy85NTZkMTQzNTZjZmNiYmIzNTdkZDEyYzAyMjlkNjkxNC05MC53ZWJw.webp"
              alt
            />
          </el-col>
          <el-col :md="12" :sm="24">
            <el-card class="box-card">
              <div class="title">商城注册</div>
              <el-form
                label-position="top"
                label-width="100px"
                :model="formLogin"
                :rules="rulesLogin"
              >
                <el-form-item prop="nickname">
                  <el-input
                    v-model="formLogin.nickname"
                    placeholder="昵称"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="phone">
                  <el-input
                    v-model="formLogin.phone"
                    placeholder="手机号码"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    v-model="formLogin.password"
                    placeholder="请输入密码"
                    type="password"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="repassword">
                  <el-input
                    v-model="formLogin.repassword"
                    placeholder="在输入一次密码"
                    type="password"
                  ></el-input>
                </el-form-item>
                <el-row>
                  <el-button-group>
                    <el-row>
                      <el-button class="register" @click="register"
                        >注册</el-button
                      >
                    </el-row>
                    <el-row>
                      <el-button class="login" @click="login">登录</el-button>
                    </el-row>
                  </el-button-group>
                </el-row>
              </el-form>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-main>
    <el-footer>
      <FooterFindex></FooterFindex>
    </el-footer>
  </el-container>
</template>
<script setup>
import { ref, reactive, watchEffect } from "vue";
// import { ElMessage } from 'element-plus'
import { ElMessage } from "element-plus/lib";
const router = useRouter();
import CryptoJS from "crypto-js";
const phoneRules = (rule, value, callback) => {
  const reg = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/;
  if (!reg.test(value)) {
    callback(new Error("请输入正确形式的手机号"));
  } else {
    callback();
  }
};
// 表单校验
const rulesLogin = {
  phone: [
    {
      required: true,
      message: "请输入手机号码",
      trigger: "blur",
    },
    {
      validator: phoneRules,
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
  ],
  nickname: [
    {
      required: true,
      message: "请输入昵称",
      trigger: "blur",
    },
  ],
  repassword: [
    {
      required: true,
      message: "请确认密码",
      trigger: "blur",
    },
  ],
};
// 表单数据
const formLogin = reactive({
  phone: "",
  password: "",
  nickname: "",
  repassword: "",
});
// 选框
const checked = ref(false);
// 跳转到登录页面
const login = () => {
  router.push("/login");
};
const register = async () => {
  const { data } = await useFetch("http://localhost:8888/api/user/register", {
    method: "post",
    body: {
      phone: formLogin.phone,
      nickname: formLogin.nickname,
      password: CryptoJS.MD5(formLogin.password).toString(),
      no: Math.random().toString().slice(3, 9),
    },
    server: false,
  });
  watchEffect(() => {
    if (data.value) {
      if (data.value.code === 0) {
        ElMessage({
          message: data.value.msg,
          type: "success",
        });

        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else {
        ElMessage({
          message: data.value.msg,
          type: "error",
        });
      }
    }
  });
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/public/layout.scss";
.el-header {
  height: 300px !important;
}
.el-footer {
  margin-top: 80px !important;
}
.container {
  width: 1280px;
  margin: 0 auto;
}
img {
  width: 100%;
  height: auto;
}
.box-card {
  width: 400px;
  margin: 0 auto;
}
.el-button {
  width: 100%;
  margin-top: 5px;
}
.el-button-group {
  margin-top: 20px;
  border-top: solid 1px rgb(223, 220, 220);
  padding-top: 20px;
  width: 100%;
}
.el-card {
  background-color: rgb(248, 248, 248);
}
.login {
  background-color: rgb(255, 144, 3);
  color: #fff;
}
.register {
  border: solid 1px rgb(255, 144, 3);
  color: rgb(255, 144, 3);
  background-color: #fff;
}
.register:hover {
  background-color: #fff;
}
.forget {
  margin-top: 10px;
  text-align: right;
  a {
    color: #606266;
    font-size: 12px;
    text-decoration: none;
  }
}
:deep(.el-form-item) {
  margin-bottom: 35px;
}
:deep(.el-form-item__error) {
  margin-top: 6px;
  font-size: 12px;
  padding: 5px 10px;
  background-color: #d14242;
  color: #fff;
  border-radius: 5px;
}
@media screen and (max-width: 992px) {
  .container {
    margin: 0 auto;
    width: 100%;
  }
}
.title {
  font-size: 25px;
  text-align: center;
  padding: 30px 0;
}
</style>