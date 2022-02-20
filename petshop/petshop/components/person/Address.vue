<template>
  <div class="address">
    <div class="title">
      <el-icon>
        <Location />
      </el-icon>
      <span>账单地址</span>
    </div>
    <el-form
      ref="Form"
      :model="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
      label-position="top"
      :rules="rules"
    >
      <el-form-item label="省市区" prop="address">
        <!-- <el-input v-model="ruleForm.name"></el-input> -->
        <el-select
          v-model="value1"
          placeholder="Select"
          :popper-append-to-body="false"
          @change="citychange()"
        >
          <el-option
            v-for="item in city"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select
          v-model="value2"
          collapse-tags
          style="margin-left: 20px"
          placeholder="Select"
          :popper-append-to-body="false"
          @change="citychange2()"
        >
          <el-option
            v-for="item in town"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select
          v-model="value3"
          placeholder="Select"
          :popper-append-to-body="false"
          style="margin-left: 20px"
        >
          <el-option
            v-for="item in area"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="ruleForm.address"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="11">
          <el-form-item label="Email地址" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" class="right">
          <el-form-item label="电话" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="modify">
      <div class="one" @click="saveAddress">保存更改</div>
      <div class="two" @click="reset">取消</div>
    </div>
  </div>
</template>
<script setup>
import { Location } from "@element-plus/icons";
const config = useRuntimeConfig();
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus/lib";
const { city, user } = useCount();
let town = ref([]);
let area = ref([]);
const citychange = () => {
  value2.value = "";
  value3.value = "";
  city.value.some((item) => {
    if (item.label == value1.value) {
      town.value = item.children;
      return true;
    }
  });
};
console.log(user,'用户eeeeeeeeeeeeeeeeeeeeeeeee')
const citychange2 = () => {
  town.value.some((item) => {
    if (item.label == value2.value) {
      area.value = item.children;
      return true;
    }
  });
};

var { data } = await useFetch(`http://localhost:8888/api/city`);
city.value = data.value;
// 获取表单元素
const Form = ref();
// 表单信息
let ruleForm = reactive({
  address: user.value.address ? user.value.address.address[3] : "",
  name: user.value.address ? user.value.address.name : "",
  email: user.value.address ? user.value.address.email : "",
  phone: user.value.address ? user.value.address.phone : "",
});
// 选择的账单地址
const value1 = ref(user.value.address ? user.value.address.address[0] : "");
const value2 = ref(user.value.address ? user.value.address.address[1] : "");
const value3 = ref(user.value.address ? user.value.address.address[2] : "");
// 电话验证规则
const phoneRules = (rule, value, callback) => {
  const reg = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/;
  if (!reg.test(value)) {
    callback(new Error("请输入正确形式的手机号"));
  } else {
    callback();
  }
};
let rules = {
  name: [
    {
      required: true,
      message: "请填写姓名",
      trigger: "blur",
    },
  ],

  address: [
    {
      required: true,
      message: "请填写地址",
      trigger: "blur",
    },
  ],
  email: [
    {
      required: true,
      message: "请填写email",
      trigger: "blur",
    },
    {
      type: "email",
      message: "请填写正确的email",
      trigger: "blur",
    },
  ],
  phone: [
    {
      required: true,
      message: "请填写电话",
      trigger: "blur",
    },
    {
      validator: phoneRules,
      trigger: "blur",
    },
  ],
};
// 修改地址
const saveAddress = () => {
  Form.value.validate(async (valid) => {
    if (valid) {
      let obj = {};
      obj.address = [
        value1.value,
        value2.value,
        value3.value,
        ruleForm.address,
      ];
      obj.name = ruleForm.name;
      obj.email = ruleForm.email;
      obj.phone = ruleForm.phone;
      console.log(obj);
      const { data } = await useFetch(
        "http://localhost:8888/api/user/address",
        {
          method: "post",
          body: {
            phone: user.value.phone,
            address: obj,
          },
          server: false,
        }
      );
      if (data.value.code === 0) {
        ElMessage.success("保存地址成功");
      } else {
        ElMessage.error("保存地址失败");
      }
    }
  });
};

// 重置表单
const reset = () => {
  // Form.value.resetFields()
  ruleForm.email = "";
  ruleForm.name = "";
  ruleForm.address = "";
  ruleForm.phone = "";
  value1.value = "";
  value2.value = "";
  value3.value = "";
};
</script>
<style  lang="scss" scoped>
.address {
  :deep(.el-form-item__error) {
    // position:;
    position: static;
    display: inline-block;
    margin-top: 6px;
    font-size: 12px;
    padding: 5px 10px;
    background-color: #d14242;
    color: #fff;
    border-radius: 5px;
  }
  .el-form {
    padding: 0 15px;
    .right {
      margin-left: 65px;
    }
    :deep(.el-form-item__label) {
      padding: 0 !important;
    }
    :deep(.el-form-item) {
      margin-bottom: 0 !important;
    }
  }
  .modify {
    text-align: center;
    margin-top: 15px;
    border-top: solid 1px #ddd;
    line-height: 30px;
    padding: 15px;
    overflow: hidden;
    .one {
      float: left;
      width: 74px;
      height: 30px;
      background-color: rgb(255, 144, 3);
      border: solid 1px #ddd;
      color: #fff;
      cursor: pointer;
    }
    .two {
      float: right;
      width: 48px;
      height: 30px;
      background-color: #fff;
      border: solid 1px #ddd;
      cursor: pointer;
    }
  }
  .title {
    padding: 15px 10px;
    border-bottom: solid 1px #e8e8e8;
    font-size: 17px;
    .el-icon {
      font-size: 20px;
      vertical-align: middle;
      color: color;
    }
    > span {
      vertical-align: middle;
      margin-left: 10px;
    }
  }
}
</style>
