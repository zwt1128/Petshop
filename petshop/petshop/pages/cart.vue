<template>
 <el-container>
    <el-header>
      <HeaderBindex></HeaderBindex>
    </el-header>
    <el-main> 
     <div class="carts" v-if="tag">
        <el-table :data="goods" style="width: 100%">
            <el-table-column label="商品" width="180">
                <template #default="scope">
                    <img :src="scope.row.img" alt width="90" height="90" />
                </template>
            </el-table-column>
            <el-table-column width="380">
                <template #default="scope">
                    <div>{{ scope.row.title }}</div>
                    <div>{{ scope.row.taste }}</div>
                </template>
            </el-table-column>
            <el-table-column label="价格" width="180" align="center">
                <template #default="scope">
                    <span style="margin-left: 10px">￥{{ (scope.row.price * 1).toFixed(2) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="数量" width="180" align="center">
                <template #default="scope">
                    <el-input-number
                        v-model="scope.row.count"
                        :min="1"
                        size="mini"
                        @change="numberChange(scope.row)"
                    />
                </template>
            </el-table-column>
            <el-table-column label="合计" width="120" align="center">
                <template #default="scope">
                    <span
                        style="margin-left: 10px"
                    >￥{{ (scope.row.count * scope.row.price).toFixed(2) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="120" align="center">
                <template #default="scope">
                    <span style="margin-left: 10px" @click="dele(scope.row)">删除</span>
                </template>
            </el-table-column>
        </el-table>
        <!-- 总价 -->
        <div class="total">
            <div class="allprice">
                <el-row>
                    <el-col :span="8" class="tips">运费</el-col>
                    <el-col :span="16" style="text-align:right" class="price">普通快递:￥50.00</el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" class="tips">订单总计</el-col>
                    <el-col
                        :span="16"
                        style="text-align:right"
                        class="price"
                    >￥{{ (allPrire + 50).toFixed(2) }}</el-col>
                </el-row>
                <div class="counter" @click="gocount">前往收银台</div>
            </div>
        </div>
        <!-- 优惠劵 -->
        <div class="discount">
            <div class="title">优惠券:</div>
            <el-row :gutter="10">
                <el-col :span="6">
                    <el-input placeholder="优惠券代码" />
                </el-col>
                <el-col :span="6" class="two">
                    <el-button style="width:100%">使用优惠券</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
    <el-card class="box-card" v-else>
        <h4>你还没有登录请先登录</h4>
        <el-button type="primary" @click="gologin" class="btn">前往登录</el-button>
    </el-card>
      </el-main>
    <el-footer>
      <FooterFindex></FooterFindex>
    </el-footer>
  </el-container>
    
</template>
<script setup>
import { ref, computed, watchEffect } from 'vue'
import { ElMessage } from 'element-plus/lib'
const router = useRouter()
const { user } = useCount()
let { data } = await useFetch('http://localhost:8888/api/user/getUser', { server: false,credentials:'include' })
watchEffect(() => {
    if (data.value) {
        user.value = data.value
    }
})
const goods = ref([])
let allPrire = computed(() => {
    let sum = 0
    goods.value.forEach(item => {
        sum += item.price * item.count
    })
    return sum
})
const tag = ref(false)
// const user=JSON.parse(sessionStorage.getItem("user"));
const goodss = ref([])
const { data: res } = await useFetch(`http://localhost:8888/api/cartList?userNo=${user.value.no}`, {
    server: false,
    credentials:'include'
})
watchEffect(() => {
    if (res.value) {
        if (res.value.code !== -1) {
            tag.value = true
            goods.value = res.value
        }
    }
})
const gocount = () => {
    router.push('/billdetail')
}
// 删除
const dele = async (row) => {
    // 向数据库发送请求删除对应的商品
    const { data } = await useFetch(`http://localhost:8888/api/delete?id=${row.goodsNo}`,{
        credentials:'include'
    })
    if (data.value.code === 0) {
        const { data: res } = await useFetch(`http://localhost:8888/api/cartList?userNo=${user.value.no}`, {
            server: false,
            credentials:'include'
        })

        watchEffect(() => {
            if (res.value) {
                goods.value = res.value
            }
        })
    }
}
// 修改商品数量
const numberChange = async (row) => {
    const { data } = await useFetch(`http://localhost:8888/api/updata?id=${row.goodsNo}&count=${row.count}&userNo=${user.value.no}`,{
        credentials:'include'
    })
    if (data.value.code !== 0) {
        ElMessage.error(data.value.message)
    }
}
// 前往登录
const gologin = () => {
    router.push('/login')
}
</script>
<script>
export default {
    layout: "blank",
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
.el-card {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    text-align: center;
    .btn {
        background-color: rgb(64, 158, 255);
    }
}
.carts {
    width: 1190px;
    margin: 0 auto;
    .el-table {
        border: solid 1px rgb(223, 220, 220);
    }
    .total {
        height: 120px;
        padding: 10px;
        border: solid 1px rgb(223, 220, 220);
        margin-top: 20px;
        .allprice {
            width: 200px;
            height: 100%;
            float: right;
            .counter {
                width: 124px;
                height: 42px;
                line-height: 42px;
                background-color: rgb(255, 144, 3);
                text-align: center;
                float: right;
                margin-top: 10px;
                color: #fff;
                cursor: pointer;
            }
            .el-row {
                line-height: 30px;
            }
            .tips {
                font-size: 14px;
                font-weight: bold;
                color: #777777;
            }
            .price {
                font-size: 14px;
                font-weight: normal;
                color: #777777;
            }
        }
    }
    .discount {
        height: 120px;
        padding: 10px;
        border: solid 1px rgb(223, 220, 220);
        margin-top: 20px;
        .title {
            padding: 10px;
            font-size: 14px;
            font-weight: bold;
            color: #777777;
            margin-bottom: 10px;
        }
    }
}
</style>
