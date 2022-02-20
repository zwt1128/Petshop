<template>
    <div class="modify1">
        <div class="title">
            <el-icon>
                <Lock />
            </el-icon>
            <span>修改密码</span>
            <el-alert v-if="error" :title="error" type="warning" show-icon :closable="false"></el-alert>
        </div>
        <div class="right">
            <el-form ref="ruleForm" :model="formInfo" :rules="rules">
                <div>
                    <el-row>
                        <el-col :span="8">旧密码</el-col>
                        <el-col :span="16">
                            <el-input v-model="formInfo.prpassword" size="mini" type="password" />
                        </el-col>
                    </el-row>
                </div>
                <div>
                    <el-row>
                        <el-col :span="8" style="line-height: 40px;">
                            密码
                            <el-tooltip content="密码至少为8位" placement="bottom" effect="dark">
                                <span class="tip"></span>
                            </el-tooltip>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item prop="newPassword">
                                <el-input
                                    v-model="formInfo.newPassword"
                                    size="mini"
                                    @input="inputEvent"
                                    type="password"
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <div>
                    <el-row>
                        <el-col :span="8">在输入一次密码</el-col>
                        <el-col :span="16">
                            <el-form-item prop="repassword">
                                <el-input
                                    v-model="formInfo.repassword"
                                    size="mini"
                                    type="password"
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-form>

            <div>
                <el-row>
                    <el-col :span="8"></el-col>
                    <el-col :span="16" style="color:rgb(255, 144, 3)">
                        <span ref="info">密码强度</span>
                        <div class="strength">
                            <div :class="{ weak: tip, streng: tip1 }"></div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="modify">
                <div class="one" @click="modifyPassword">保存更改</div>
                <div class="two">取消</div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { Lock } from '@element-plus/icons'
import CryptoJS from 'crypto-js'
import { ref, reactive, watchEffect } from 'vue'
const reg = /^(?=.*[a-zA-Z]+)(?=.*[0-9]+)[a-zA-Z0-9]+$/
const passwordRules = (rule, value, callback) => {
    const reg = /^(?=.*[a-zA-Z]+)(?=.*[0-9]+)[a-zA-Z0-9]+$/
    if (value.length < 8) {
        callback(new Error('你的密码太短了'))
    } else if (!reg.test(value)) {
        callback(new Error('你的密码强度太低了'))
    } else {
        callback()
    }
}
const repassRules = (rule, value, callback) => {
    if (value !== formInfo.newPassword) {
        callback(new Error('两次密码不一致'))
    } else {
        callback()
    }
}
// 密码输入触发事件
const inputEvent = (plength) => {
    if (plength.trim().length < 8) {
        info.value.innerText = '密码太短';
    } else if (reg.test(plength.trim())) {
        info.value.innerText = '密码强度强';
        tip1.value = true
        tip.value = false

    } else {
        info.value.innerText = '密码强度弱';
        tip.value = true
        tip1.value = false
    }
}
let error = ref(false)
let router = useRouter()
const tip = ref(false);
const tip1 = ref(false)
const info = ref()
const sex = ref('男')
// 表单元素
const ruleForm = ref()
let { user } = useCount()
console.log(user.value, '=====');
// 表单信息
const formInfo = reactive({
    prpassword: '',
    newPassword: '',
    repassword: '',
})
// 表单验证规则
const rules = {
    newPassword: [{
        validator: passwordRules,
        trigger: 'blur'
    }],
    repassword: [{
        validator: repassRules,
        trigger: 'blur'
    }]
}
// 修改密码
const modifyPassword = () => {
    ruleForm.value.validate(async valid => {
        if (valid) {
            const { data } = await useFetch('http://localhost:8888/api/user/modify', {
                method: 'post',
                body: {
                    phone: user.value.phone,
                    prpassword: CryptoJS.MD5(formInfo.prpassword).toString(),
                    newPassword: CryptoJS.MD5(formInfo.newPassword).toString(),
                },
                server: false
            });
            if (data.value.code === 0) {
                error.value = data.value.msg
                setTimeout(() => {
                    router.push('/login')
                }, 1000)
            } else {
                error.value = data.value.msg
                setTimeout(() => {
                    error.value = false
                }, 2000)
            }
        }
    })
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
        .tip {
            position: relative;
            display: inline-block;
            top: 3px;
            width: 14px;
            height: 14px;
            background: url("../../assets/img/help.png") no-repeat;
        }
        .strength {
            width: 200px;
            height: 5px;
            margin-top: 10px;
            background-color: #ccc;
            border: solid 1px #ccc;
            .inner {
                height: 100%;
            }
            .weak {
                width: 30%;
                height: 100%;
                background-color: #4ec130;
            }
            .streng {
                width: 70%;
                height: 100%;
                background-color: #4ec130;
            }
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