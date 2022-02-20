<template>
  <el-container>
    <el-header>
      <HeaderBindex></HeaderBindex>
    </el-header>
    <el-main> 
          <div class="container">
        <h2>谢谢。您的订单已收到</h2>
        <el-row class="title">
            <el-col :span="6">订单：</el-col>
            <el-col :span="6">日期：</el-col>
            <el-col :span="6">总计：</el-col>
            <el-col :span="6">付款方式：</el-col>
        </el-row>
        <el-row class="contain">
            <el-col :span="6">
                <strong>#{{ orderNo }}</strong>
            </el-col>
            <el-col :span="6">
                <strong>{{ orderDate && orderDate.split('T')[0] }}</strong>
            </el-col>
            <el-col :span="6">
                <strong>{{ price.toFixed(2) }}</strong>
            </el-col>
            <el-col :span="6">
                <strong>{{ way }}</strong>
            </el-col>
        </el-row>
        <p class="message">直接付款到我们的银行账户。请使用订单号作为付款名目。我们会在资金到账后配送订单。</p>
        <h2>我们的银行账户详情</h2>
        <h2>订单详情</h2>
        <div id="order_review">
            <div class="title">
                <div class="left">商品</div>
                <div class="right">合计</div>
            </div>
            <div class="goodsList">
                <el-row class="list" v-for="item in orders" :key="item.goodsNo">
                    <el-col :span="20">
                        <el-row>
                            <el-col>
                                <img :src="item.img" alt style="vertical-align: middle;" />
                                <div
                                    style="display:inline-block ;line-height:40px;vertical-align: middle;margin-left:5px"
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
                        <span class="prices">￥{{ (item.count * item.price).toFixed(2) }}</span>
                    </el-col>
                </el-row>
            </div>
            <div>
                <el-row class="count">
                    <el-col :span="18">购物车小计</el-col>
                    <el-col :span="6" class="right">￥{{ price.toFixed(2) }}</el-col>
                </el-row>
                <el-row class="count">
                    <el-col :span="14">运费</el-col>
                    <el-col :span="10" class="right">普通快递￥50.00</el-col>
                </el-row>
                <el-row class="count dd">
                    <el-col :span="14">订单总计</el-col>
                    <el-col :span="10" class="right">￥{{ (price + 50).toFixed(2) }}</el-col>
                </el-row>
            </div>
        </div>
        <div class="userDetail">
            <h2>客户详情</h2>
            <el-row>
                <el-col :span="4">姓名：</el-col>
                <el-col :span="20" class="two">{{ orderUser }}</el-col>
            </el-row>
            <el-row>
                <el-col :span="4">电话</el-col>
                <el-col :span="20" class="two">{{ orderPhone }}</el-col>
            </el-row>

            <h3>账单地址</h3>
            <address>
                <p class="address">{{ orderAddress }}</p>
                <p class="address">{{ orderUser }}</p>
                <p class="address">{{ orderPhone }}</p>
            </address>
        </div>
    </div>
      </el-main>
    <el-footer>
      <FooterFindex></FooterFindex>
    </el-footer>
  </el-container>

</template>
<script setup>
import { ref, computed, watchEffect } from 'vue'
const route = useRoute()
// const orders = ref([{ id: 1, img: '../assets/img/1.png', title: '顺口味 无尘豆腐猫砂6L 快速除臭结团', taste: '口味:绿茶味', price: 29, count: 1 }, { id: 2, img: '../assets/img/2.png', title: '亚禾 幼犬小型大型犬狗咬洁齿骨棒零食', price: '19.8', count: 1 }])
const orders = ref([])
const price = computed(() => {
    let sum = 0;
    orders.value.forEach(item => {
        sum += item.count * item.price
    })
    return sum
})
// 获取订单信息
let orderNo = ref('');
let orderDate = ref('');
let orderUser = ref('');
let orderAddress = ref('')
let orderPhone = ref('')
// 判断付款方式
const way = ref('');
if (route.query.way == '1') {
    way.value = '支付宝'
} else if (route.query.way == '2') {
    way.value = '微信支付'
} else {
    way.value = '银行汇款（线下）'
}
const { data } = useFetch(`http://localhost:8888/api/orderlist?id=${route.query.id}`, { server: false })
watchEffect(() => {
    if (data.value) {
        if (data.value.order) {
            orderNo.value = data.value.order.orderNo
            orderDate.value = data.value.order.date
            orderUser.value = data.value.order.name
            orders.value = data.value.order.goods
            orderAddress.value = data.value.order.address
            orderPhone.value = data.value.order.phone
        }
    }
})
</script>
<script>
export default {
    layout: "blank",
};
</script>
<style scoped lang="scss">
@import "@/assets/css/public/layout.scss";
.el-header {
  height: 300px !important;
}
.el-footer {
  margin-top: 80px !important;
}
.container {
    width: 1280px;
    margin: auto;
    .title {
        padding: 5px;
        border-bottom: 3px solid #ddd;
    }
    .contain {
        padding: 8px;
        color: #777;
    }
    .message {
        font-size: 14px;
        font-weight: normal;
        color: rgb(119, 119, 119);
        font-family: 微软雅黑;
    }
    h2 {
        font-size: 22px;
        font-weight: bold;
        color: rgb(85, 85, 85);
        font-family: 微软雅黑;
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
    .userDetail {
        .two {
            color: rgb(141, 144, 149) !important;
        }
        .el-row {
            border-bottom: 1px dotted #ddd;
            .el-col {
                font-size: 16px;
                font-weight: normal;
                color: rgb(68, 68, 68);
                font-family: 微软雅黑;
                padding-top: 4px;
                padding-bottom: 4px;
                padding-left: 12px;
                padding-right: 12px;
                border-color: rgb(221, 221, 221);
            }
        }
    }
    .address {
        margin: 0;
        font-size: 14px;
        font-weight: normal;
        color: rgb(119, 119, 119);
        font-family: 微软雅黑;
    }
    h3 {
        font-weight: normal;
    }
}
</style>