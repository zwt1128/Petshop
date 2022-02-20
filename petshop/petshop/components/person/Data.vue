<template>
    <div class="data">
        <div class="title">
            <el-icon>
                <User />
            </el-icon>
            <span>个人资料</span>
        </div>
        <div class="right">
            <div class="info">
                <el-row>
                    <el-col :span="8">照片</el-col>
                    <el-col :span="16">
                        <div class="pto"></div>
                        <button class="upload">上传图片</button>
                        <button class="del">删除</button>
                    </el-col>
                </el-row>
            </div>
            <div>
                <el-row>
                    <el-col :span="8">昵称</el-col>
                    <el-col :span="16">
                        <el-input v-model="formInfo.nickname" size="mini" />
                    </el-col>
                </el-row>
            </div>
            <div>
                <el-row>
                    <el-col :span="8">性别</el-col>
                    <el-col :span="16">
                        <el-radio-group v-model="sex">
                            <el-radio :label="'男'">男</el-radio>
                            <el-radio :label="'女'">女</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-row>
            </div>
            <div>
                <el-row>
                    <el-col :span="8">电话号码</el-col>
                    <el-col :span="16">
                        <el-input v-model="formInfo.phone" class="input-with-select" size="mini">
                            <template #append>
                                <el-button>修改</el-button>
                            </template>
                        </el-input>
                    </el-col>
                </el-row>
            </div>
            <div class="modify">
                <div class="one">保存更改</div>
                <div class="two">取消</div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { User } from '@element-plus/icons'
import { ref, reactive, watchEffect } from 'vue'
const sex = ref('男')
// 表单信息
const formInfo = reactive({
    photo: '',
    phone: '',
    nickname: '',
    sex: ''
})
let { data } = await useFetch('http://localhost:8888/api/user/getUser', { server: false,credentials:'include' })
watchEffect(() => {
    if (data.value) {
        formInfo.nickname = data.value.nickname;
        formInfo.phone = data.value.phone;
        formInfo.photo = data.value.photo;
    }
})
</script>
<style lang="scss" scoped>
.data {
    .right {
        padding: 0 15px;
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
                float: right;
                width: 48px;
                height: 30px;
                background-color: #fff;
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