<template>
    <div class="modify1">
        <div class="title">
            <el-icon>
                <PhoneFilled />
            </el-icon>
            <span>修改手机</span>
        </div>
        <div class="right">
            <el-form ref="ruleForm" :model="formInfo" :rules="rules">
                <div>
                    <el-row>
                        <el-col :span="8">新手机号码</el-col>
                        <el-col :span="16">
                            <el-input v-model="formInfo.newPhone" size="mini" />
                        </el-col>
                    </el-row>
                </div>
                <div>
                    <el-row>
                        <el-col :span="8">验证码</el-col>
                        <el-col :span="16">
                            <el-input v-model="formInfo.code" size="mini">
                                <template #append>
                                    <el-button>发送</el-button>
                                </template>
                            </el-input>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
            <div class="modify">
                <div class="one">保存更改</div>
                <div class="two">取消</div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { PhoneFilled } from '@element-plus/icons'
import { ref, reactive, watchEffect } from 'vue'
const phoneRules = (rule, value, callback) => {
    const reg = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/
    if (!reg.test(value)) {
        callback(new Error('请输入正确形式的手机号'))
    } else {
        callback()
    }
}
const trigger = ref(false)
const info = ref()
// 表单信息
const formInfo = reactive({
    newPhone: '',
    code: '',
})
// 表单验证规则
const rules = {
    newPhone: [{
        validator: phoneRules,
        trigger: 'blur'
    }]
}
</script>
<style lang="scss" scoped>
.modify1 {
    font-size: 12px;
    .right {
        padding: 0 15px;
        :deep(.el-form-item) {
            margin-bottom: 0;
        }
        :deep(.el-input) {
            .el-input-group__append {
                background-color: rgb(255, 144, 3);
                color: rgb(239, 239, 239);
                // height: 20px;
                // vertical-align: middle;
                // margin-bottom: -7px;
                // line-height: 8px;
            }
        }

        :deep(.el-form-item__content) {
            line-height: normal;
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
        .modify {
            text-align: center;
            margin-top: 15px;
            margin-bottom: 15px;
            border-top: solid 1px #ddd;
            line-height: 30px;
            padding: 15px 0;
            overflow: hidden;
            .one {
                float: left;
                width: 74px;
                height: 30px;
                background-color: rgb(255, 144, 3);
                border: solid 1px #ddd;
                color: #fff;
            }
            .two {
                float: left;
                margin-left: 30px;
                color: #8d9095;
                background-color: rgb(239, 239, 239);
                width: 65px;
                height: 30px;
                border: solid 1px #ddd;
            }
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
    .el-row {
        margin-top: 15px;
    }
    .info {
        .pto {
            width: 64px;
            height: 64px;
            border-radius: 10px;
            background-color: pink;
            margin-bottom: 6px;
        }
        .del {
            background-color: rgb(255, 144, 3);
            margin-left: 15px;
            border: none;
            padding: 6px 8px;
            color: #fff;
        }
    }
}
</style>