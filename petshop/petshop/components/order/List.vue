<template>
    <div class="list">
        <div class="title">
            <span>订单：{{ orderList.orderNo }}</span>
            <span>状态：{{ orderList.status == 1 ? '已支付' : '未支付' }}</span>
            <span>日期：{{ orderList.date && orderList.date.split('T')[0] }}</span>
            <span class="total">合计：￥{{ totalPrice.toFixed(2) }}</span>
        </div>
        <div class="goodsList">
            <ul>
                <li v-for="item in orderList.goods" :key="item.title">
                    <el-row>
                        <el-col :span="4">
                            <img :src="item.img" alt />
                        </el-col>
                        <el-col :span="12" class="info">
                            {{ item.title }}
                            <div v-if="item.taste" class="taste">口味:{{ item.taste }}</div>
                        </el-col>
                        <el-col :span="4">
                            <span>{{ item.price.toFixed(2) }}×{{ item.count }}</span>
                        </el-col>
                        <el-col :span="4">
                            <span>￥{{ (item.price * item.count).toFixed(2) }}</span>
                        </el-col>
                    </el-row>
                </li>
            </ul>
        </div>
        <div class="look">
            <button @click="look(orderList.orderNo)">查看</button>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, computed } from 'vue'
const props = defineProps({
    orderList: {
        type: Object,
        default: () => {
            return {}
        }
    }
})
const emit = defineEmits(['func'])
const totalPrice = computed(() => {
    let total = 0
    props.orderList.goods.forEach(item => {
        total += item.count * item.price
    });
    return total
})
const look = (id) => {
    // console.log(id);
    emit('func', id)
}
</script>
<style lang="scss" scoped>
.list {
    .look {
        padding: 15px;
        border-top: solid 1px #e8e8e8;
        text-align: right;
    }
    .title {
        position: relative;
        border: solid 1px #e8e8e8;
        padding: 13px 15px;
        span {
            margin-right: 15px;
        }
        .total {
            position: absolute;
            right: 0;
        }
    }
    .goodsList {
        > ul {
            padding-left: 0;
            > li {
                list-style: none;
                height: 94px;
                line-height: 94px;
                padding: 5px 15px;
                .info {
                    position: relative;
                    .taste {
                        position: absolute;
                        line-height: 30px;
                        top: 55px;
                        font-size: 12px;
                        color: #828282;
                    }
                }
                img {
                    height: 90px;
                    width: 90px;
                }
            }
        }
    }
}
</style>