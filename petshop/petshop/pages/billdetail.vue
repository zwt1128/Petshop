<template>
  <el-container>
    <el-header>
      <HeaderBindex></HeaderBindex>
    </el-header>
    <el-main>
        <div class="bill">
    <el-row :gutter="13">
      <el-col :span="14">
        <div class="title">账单地址</div>
        <el-form
          ref="Form"
          :model="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
          label-position="top"
          :rules="rules"
        >
          <el-form-item label="省市区">
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
              style="margin-left: 18px"
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
              style="margin-left: 10px"
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
            <el-col class="right">
              <el-form-item label="电话" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="right">
              <el-form-item>
                <div>
                  <h3>其他信息</h3>
                  <label for="order_comments">订单备注</label>
                  <el-input
                    id="order_comments"
                    placeholder="有关订单的注释，例如，交货的特殊注释。"
                    type="textarea"
                    v-model="ruleForm.textarea"
                    rows="5"
                    cols="5"
                  ></el-input>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
      <el-col :span="10">
        <div class="detail">
          <h3 id="order_review_heading">订单详情</h3>
          <div id="order_review">
            <div class="title">
              <div class="left">商品</div>
              <div class="right">合计</div>
            </div>
            <div class="goodsList">
              <el-row class="list" v-for="item in goods" :key="item.id">
                <el-col :span="20">
                  <el-row>
                    <el-col>
                      <img :src="item.img" alt style="vertical-align: middle" />
                      <div
                        style="
                          display: inline-block;
                          line-height: 40px;
                          vertical-align: middle;
                          margin-left: 5px;
                        "
                      >
                        <span>{{ item.title }}</span>
                        <strong>× {{ item.count }}</strong>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col class="taste">{{ item.taste }}</el-col>
                  </el-row>
                </el-col>
                <el-col :span="4" class="price">
                  <span class="prices"
                    >￥{{ (item.count * item.price).toFixed(2) }}</span
                  >
                </el-col>
              </el-row>
            </div>
            <div>
              <el-row class="count">
                <el-col :span="18">购物车小计</el-col>
                <el-col :span="6" class="right"
                  >￥{{ price.toFixed(2) }}</el-col
                >
              </el-row>
              <el-row class="count">
                <el-col :span="14">运费</el-col>
                <el-col :span="10" class="right">普通快递￥50.00</el-col>
              </el-row>
              <el-row class="count dd">
                <el-col :span="14">订单总计</el-col>
                <el-col :span="10" class="right"
                  >￥{{ (price + 50).toFixed(2) }}</el-col
                >
              </el-row>
            </div>
            <!-- 付款方式 -->
            <div class="paymethod">
              <el-row>
                <el-col>
                  <el-radio v-model="radio1" label="3">
                    <span class="pay">银行汇款（线下）</span>
                  </el-radio>
                  <div class="hint" v-if="radio1 == '3'">
                    直接付款到我们的银行账户。请使用订单号作为付款名目。我们会在资金到账后配送订单。
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-radio v-model="radio1" label="1">
                    <span class="pay">支付宝</span>
                    <img src="../assets/img/alipay.png" alt />
                  </el-radio>
                  <div class="hint" v-if="radio1 == '1'">
                    使用支付宝付款，如果您没有支付宝账户，也可通过借记卡或信用卡付款。
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-radio v-model="radio1" label="2">
                    <span class="pay">微信支付</span>
                    <img src="../assets/img/qfy_weixinpay_for_wc.png" alt />
                  </el-radio>
                  <div class="hint" v-if="radio1 == '2'">
                    通过微信扫码支付，或者公众号支付。
                  </div>
                </el-col>
              </el-row>
            </div>
            <!-- btn -->
            <div class="btn">
              <button v-if="radio1 == '2'" @click="pay">
                使用微信扫码支付
              </button>
              <button v-if="radio1 == '1'" @click="pay1">到支付宝付款</button>
              <button v-if="radio1 == '3'" @click="pay">下单</button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 优惠券 -->
    <div class="discount">
      <el-row>
        <el-col :span="6">
          <el-input placeholder="优惠券代码" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="two">
          <el-button style="width: 100%">使用优惠券</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
    </el-main>
    <el-footer>
      <FooterFindex></FooterFindex>
    </el-footer>
  </el-container>
</template>
<script setup>
const config = useRuntimeConfig();
import { ref, reactive, watchEffect, computed } from "vue";
const { city, user } = useCount();
const router = useRouter();
import { ElMessage } from "element-plus/lib";
let { data: res } = await useFetch("http://localhost:8888/api/user/getUser", {
  server: false,
  credentials:'include'
});

watchEffect(() => {
  if (res.value) {
    user.value = res.value;
  }
});
const goods = ref([]);
// const goods = ref([{ id: 1, img: '../assets/img/1.png', title: '顺口味 无尘豆腐猫砂6L 快速除臭结团', taste: '口味:绿茶味', price: 29, count: 1 }, { id: 2, img: '../assets/img/2.png', title: '亚禾 幼犬小型大型犬狗咬洁齿骨棒零食', price: '19.8', count: 1 }])
const { data: res1 } = await useFetch(
  `http://localhost:8888/api/cartList?userNo=${user.value.no}`,
  {
    server: false,
    credentials:'include'
  }
);
watchEffect(() => {
  if (res1.value) {
    if (res1.value.code !== -1) {
      goods.value = res1.value;
    }
  }
});
const price = computed(() => {
  let sum = 0;
  goods.value.forEach((item) => {
    sum += item.count * item.price;
  });
  return sum;
});
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
// 选择的账单地址
const value1 = ref(user.value.address ? user.value.address.address[0] : "");
const value2 = ref(user.value.address ? user.value.address.address[1] : "");
const value3 = ref(user.value.address ? user.value.address.address[2] : "");
// 表单信息
let ruleForm = reactive({
  address: user.value.address ? user.value.address.address[3] : "",
  name: user.value.address ? user.value.address.name : "",
  phone: user.value.address ? user.value.address.phone : "",
  textarea: "",
});
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
  ruleForm.name = "";
  ruleForm.address = "";
  ruleForm.phone = "";
  value1.value = "";
  value2.value = "";
  value3.value = "";
};
// 付款方式
const radio1 = ref("1");
// 支付
const pay = () => {
  Form.value.validate(async (valid) => {
    if (valid) {
      let obj = {};
      obj.address =
        value1.value + value2.value + value3.value + ruleForm.address;
      obj.name = ruleForm.name;
      obj.phone = ruleForm.phone;
      const { data } = await useFetch("http://localhost:8888/api/order", {
        method: "post",
        body: {
          address:
            value1.value + value2.value + value3.value + ruleForm.address,
          name: ruleForm.name,
          phone: ruleForm.phone,
          goods: goods.value,
          userNo: user.value.no,
          orderNo: Math.random().toString().slice(2, 8),
        },
        server: false,
      });
      // 付款过后清空这个对应的购物车
      const users = ref();
      const { data: res } = await useFetch(
        `http://localhost:8888/api/deletecart?id=${user.value.no}`
      );
      watchEffect(() => {
        if (data.value) {
          if (data.value.code === 0) {
            users.value = data.value.orderNo;
          }
        }
      });
      router.push(`/orderdetail?id=${users.value}&way=${radio1.value}`);
    }
  });
};
const pay1 = () => {
  Form.value.validate(async (valid) => {
    if (valid) {
      let obj = {};
      obj.address =
        value1.value + value2.value + value3.value + ruleForm.address;
      obj.name = ruleForm.name;
      obj.phone = ruleForm.phone;
      let orderNo = Math.random().toString().slice(2, 8);
      const { data } = await useFetch("http://localhost:8888/api/order", {
        method: "post",
        body: {
          address:
            value1.value + value2.value + value3.value + ruleForm.address,
          name: ruleForm.name,
          phone: ruleForm.phone,
          goods: goods.value,
          userNo: user.value.no,
          orderNo: orderNo,
        },
        server: false,
      });

      const users = ref();
      const { data: res2 } = await useFetch(
        `http://localhost:8888/api/test1?orderNo=${orderNo}`
      );
      let address = ref();
      watchEffect(() => {
        if (res2.value) {
          address.value = res2.value;
        }
      });
      // 付款过后清空这个对应的购物车
      // const users = ref()
      const { data: res } = await useFetch(
        `http://localhost:8888/api/deletecart?id=${user.value.no}`
      );
      window.open(address.value);
      // router.push(`/orderdetail?id=${users.value}&way=${radio1.value}`)
    }
  });
};
</script>
<script>
export default {
  layout: "blank",
};
</script>
<style  lang="scss" scoped>
@import "@/assets/css/public/layout.scss";
.el-header {
  height: 300px !important;
}
.el-footer {
  margin-top: 80px !important;
}.bill {
  width: 1200px;
  margin: auto;
  h3 {
    font-size: 24px;
    font-weight: normal;
    color: #000000;
    margin: 0;
  }
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
  #order_comments {
    margin-top: 10px;
    font-size: 14px;
    font-weight: normal;
    color: #999999;
    border-color: #cccccc;
    background-color: #ffffff;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 7px;
    padding-right: 7px;
    box-sizing: border-box;
    width: 100%;
  }
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
  :deep(.el-form-item__label) {
    padding: 0 !important;
  }
  :deep(.el-form-item) {
    margin-bottom: 0;
  }
  .detail {
    border: solid 2px #e8e8e8;
    padding: 20px;
    #order_review_heading {
      font-size: 22px;
      font-weight: bold;
      color: #000000;
    }
    #order_review {
      .title {
        padding: 8px 10px;
        border-bottom: solid 3px #e8e8e8;
        overflow: hidden;
        .left {
          float: left;
        }
        .right {
          float: right;
        }
      }
    }
    .goodsList {
      .taste {
        font-size: 12px;
        color: rgb(141, 144, 149);
        padding: 10px 0;
      }
      .price {
        // position: relative;
        display: flex;
        justify-content: right;
        align-items: center;
        .prices {
          // position: absolute;
          // top: 50%;
          // left: 50%;
          // transform: translate(-50%, -50%);
          color: rgb(141, 144, 149);
        }
      }
      img {
        width: 40px;
        height: 40px;
      }

      .list {
        padding: 8px 0;
        border-bottom: solid 1px #dddddd;
      }
    }
    .count {
      border-bottom: solid 1px #e8e8e8;

      .el-col {
        padding: 10px 0;
      }
      .right {
        text-align: right;
        color: rgb(141, 144, 149);
      }
    }
    .dd {
      border-bottom: none;
      margin-bottom: 20px;
    }
    .paymethod {
      .pay {
        vertical-align: middle;
      }
      img {
        vertical-align: middle;
        margin-left: 15px;
      }
      .hint {
        font-size: 15px;
        font-weight: normal;
        color: #777777;
        border-bottom: solid 1px #dddddd;
        padding: 10px 0;
      }
    }
    .btn {
      margin-top: 20px;
      button {
        padding: 14px 80px;
        background-color: rgb(255, 144, 3);
        color: #fff;
        font-size: 16px;
        border: none;
        cursor: pointer;
      }
    }
  }
  > .discount {
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 30px 10px;
    border-top: solid 2px #e8e8e8;
    border-bottom: solid 2px #e8e8e8;
    .two {
      margin-top: 20px;
    }
  }
}
</style>