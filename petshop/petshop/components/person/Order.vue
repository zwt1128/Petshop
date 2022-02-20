<template>
    <div class="order">
        <div class="title">
            <el-icon>
                <Expand />
            </el-icon>
            <span v-if="tagger">我的订单</span>
            <span v-else>订单详情</span>
            <span class="iconfont icon-fanhui back" v-if="!tagger" @click="backorder"></span>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick" v-if="tagger">
            <el-tab-pane label="全部订单" name="allOrder">
                <OrderList
                    :orderList="item"
                    v-for="item in allOrder"
                    :key="item.orderNo"
                    @func="orderId"
                ></OrderList>
            </el-tab-pane>
            <el-tab-pane label="已取消" name="cancel">Config</el-tab-pane>
        </el-tabs>
        <div v-else>
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
                <div style="padding:0 15px">
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
    </div>
</template>
<script setup>
import { ref, watchEffect } from 'vue'
import { Expand } from '@element-plus/icons'
const orderList = reactive({ no: '#40016', status: 1, data: '2021-12-20 11:24:26', goods: [{ img: '../../assets/img/1.png', title: '亚禾 幼犬小型大型犬狗咬洁齿骨棒零食', price: 19.80, count: 12, }, { img: '../../assets/img/2.png', title: '麦富迪 宠物猫粮藻趣儿 金枪鱼猫粮', price: 255.00, count: 1, taste: '三文鱼味' }] });
const activeName = ref('allOrder')
const allOrder = ref([])
const { user } = useCount()
const tagger = ref(true)
const orders = ref([])
// 获取订单信息
let orderNo = ref('');
let orderDate = ref('');
let orderUser = ref('');
let orderAddress = ref('')
let orderPhone = ref('')
const price = computed(() => {
    let sum = 0;
    orders.value.forEach(item => {
        sum += item.count * item.price
    })
    return sum
})
let { data } = await useFetch('http://localhost:8888/api/user/getUser', { server: false,credentials:'include' })
watchEffect(() => {
    if (data.value) {
        user.value = data.value
    }
})
// 获取所有订单信息
let { data: res } = await useFetch(`http://localhost:8888/api/orderall?id=${user.value.no}`, { server: false });
watchEffect(() => {
    if (res.value) {
        console.log(res.value);
        allOrder.value = res.value.order
    }
})
// 处理子元素传递过来的订单id
const orderId = async (id) => {
    tagger.value = false
    // 获取对应订单的信息
    const { data } = await useFetch(`http://localhost:8888/api/orderlist?id=${id}`, { server: false })
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
    console.log(data.value);
}
// 点击返回订单
const backorder = () => {
    tagger.value = true
}
const handleClick = () => { }
</script>
<style scoped lang="scss">
.order {
    // padding: 0 10px;
    .title {
        position: relative;
        padding: 15px 10px;
        border-bottom: solid 1px #e8e8e8;
        font-size: 17px;
        .back {
            position: absolute;
            right: 20px;
        }
        .el-icon {
            font-size: 20px;
            vertical-align: middle;
        }
        > span {
            vertical-align: middle;
            margin-left: 20px;
        }
    }
    :deep(.el-tabs__item) {
        margin-top: 8px;
        margin-bottom: 8px;
        margin-left: 15px;
        padding: 0 12px;
    }
    h2 {
        font-size: 14px;
        font-weight: normal;
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
            padding: 0 10px;
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
            padding: 8px 15px;
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
        padding:0 15px;
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
        font-size: 14px;
    }
}
@font-face {
    font-family: "iconfont"; /* Project id 3063746 */
    src: url("//at.alicdn.com/t/font_3063746_f57otsagsb.woff2?t=1640509826546")
            format("woff2"),
        url("//at.alicdn.com/t/font_3063746_f57otsagsb.woff?t=1640509826546")
            format("woff"),
        url("//at.alicdn.com/t/font_3063746_f57otsagsb.ttf?t=1640509826546")
            format("truetype");
}
.iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.icon-fanhui:before {
    content: "\e615";
    font-size: 18px;
}
</style>