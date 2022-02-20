<template>
  <el-container>
    <el-header>
      <HeaderBindex></HeaderBindex>
    </el-header>
    <el-main>
      <div class="container">
        <el-row :gutter="20">
          <el-col :span="6">
            <div>
              <div class="header">
                <el-row class="info">
                  <el-col :span="6">
                    <div class="headerimg">
                      <img :src="user.photo" v-if="user.photo" />
                      <img v-else src="../assets/img/img.png" alt />
                    </div>
                  </el-col>
                  <el-col :span="18">
                    <div class="headerInfo">
                      <div class="name">
                        {{ user && user.nickname }}
                        <el-icon class="edit" @click="edit">
                          <Edit />
                        </el-icon>
                      </div>
                      <div>
                        <el-tag size="mini" @click="phone">修改手机</el-tag>
                        <el-tag size="mini" @click="modify">修改密码</el-tag>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <ul class="tabs">
                <li
                  @click="clickLi('order')"
                  :class="title === 'order' ? 'title' : ''"
                  class="top"
                >
                  <el-icon>
                    <Expand />
                  </el-icon>
                  <span>我的订单</span>
                  <i class="count">17</i>
                  <el-icon class="right">
                    <ArrowRightBold />
                  </el-icon>
                </li>
                <li
                  @click="clickLi('tag')"
                  :class="title === 'tag' ? 'title' : ''"
                >
                  <el-icon>
                    <PriceTag />
                  </el-icon>
                  <span>优惠卷</span>
                  <el-icon class="right">
                    <ArrowRightBold />
                  </el-icon>
                </li>
                <li
                  @click="clickLi('date')"
                  :class="title === 'date' ? 'title' : ''"
                >
                  <el-icon>
                    <User />
                  </el-icon>
                  <span>个人资料</span>
                  <el-icon class="right">
                    <ArrowRightBold />
                  </el-icon>
                </li>
                <li
                  @click="clickLi('address')"
                  :class="title === 'address' ? 'title' : ''"
                >
                  <el-icon>
                    <Location />
                  </el-icon>
                  <span>账单地址</span>
                  <el-icon class="right">
                    <ArrowRightBold />
                  </el-icon>
                </li>
              </ul>
            </div>
          </el-col>
          <el-col :span="16" class="list">
            <div>
              <PersonOrder v-if="title == 'order'"></PersonOrder>
              <PersonDiscount v-if="title == 'tag'"></PersonDiscount>
              <PersonData v-if="title == 'date'"></PersonData>
              <PersonAddress v-if="title == 'address'"></PersonAddress>
              <PersonModify v-if="title == 'modify'"></PersonModify>
              <PersonPhone v-if="title == 'phone'"></PersonPhone>
            </div>
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
import {
  Expand,
  PriceTag,
  User,
  Location,
  ArrowRightBold,
  Edit,
} from "@element-plus/icons";
import { ref, reactive } from "vue";
const title = ref("order");
const { user } = useCount();
const clickLi = (item) => {
  title.value = item;
};
// 修改密码
const modify = () => {
  title.value = "modify";
};
// 修改手机
const phone = () => {
  title.value = "phone";
};
// 跳转到编辑
const edit = () => {
};
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
.el-col {
  border: solid 1px #e8e8e8;
  padding: 0 !important;
}
.header {
  margin-top: 20px;
}
.el-tag {
  margin-left: 4px;
  &:hover {
    cursor: pointer;
  }
}
.info > .el-col {
  border: none;
}
.headerimg {
  width: 72px;
  height: 72px;
  background-color: pink;
  border-radius: 50%;
  box-shadow: 0 0 0 1px #e8e8e8;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
.headerInfo {
  padding: 0 15px;
  height: 72px;
  .name {
    margin-left: 5px;
  }
  > div {
    padding-top: 10px;
    > .edit {
      font-size: 18px;
      color: #000;
      cursor: pointer;
    }
  }
}
.count {
  position: absolute;
  right: 35px;
  width: 40px;
  height: 22px;
  text-align: center;
  background-color: #ccc;
  border-radius: 10px;
  font-size: 12px;
  line-height: 22px;
}
.header {
  padding: 0 13px;
}
li.title {
  > span {
    font-size: 16px;
    font-weight: 700;
  }
  > .el-icon.right {
    color: #000;
  }
}
.tabs {
  padding-left: 0px;
  .top {
    border-top: solid 1px #e8e8e8;
  }
  > li {
    cursor: pointer;
    position: relative;
    list-style: none;
    padding: 15px 10px;
    border-bottom: solid 1px #e8e8e8;

    &:hover {
      > span {
        font-size: 16px;
        font-weight: 700;
      }
      .right {
        color: #000;
      }
    }
  }
}
.el-icon {
  font-size: 20px;
  vertical-align: middle;
  color: rgb(255, 144, 3);
  margin-right: 15px;
}
.el-icon.right {
  position: absolute;
  right: 0;
  font-size: 16px;
  top: 18px;
}
.list {
  margin-left: 20px;
}
</style>