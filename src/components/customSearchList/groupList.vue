<template>
  <div class="custom-search-list-com">
    <div class="wrapper" v-for="item in searchlist" :key="item._id">
      <div class="details">
        <el-avatar
          class="avatar"
          shape="square"
          :src="IMG_URL + item.img"
        >
        </el-avatar>
        <div class="info">
          <p class="item primary-font nickname">
            <span>
              {{item.title}}
            </span>
          </p>
          <p class="item secondary-font">{{ item.desc }}</p>
        </div>
      </div>
      <div class="operation">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-plus"
          :disabled="(groups || []).includes(item._id)"
          @click="showAdditionDialog(item)"
        >添加
        </el-button>
        <el-dialog
          title="附加消息"
          :visible.sync="showAdditionMessage"
          width="60%"
        >
          <div v-loading="loading">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="additionMessage">
            </el-input>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="showAdditionMessage = false">取 消</el-button>
            <el-button type="primary" @click="sendApply()">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { fromatTime } from "@/utils";
export default {
  props: ["searchlist"],
  data() {
    return {
      IMG_URL: process.env.IMG_URL, // 图片地址
      groups: JSON.parse(window.localStorage.getItem("groups")), // 已加入的群
      showAdditionMessage: false, // 是否显示附加消息
      additionMessage: "", // 附加消息
      seleceItem: {}, // 选中的群
      loading: false
    };
  },
  methods: {
    // 添加群
    showAdditionDialog(item) {
      // 显示附加消息
      this.showAdditionMessage = !this.showAdditionMessage;
      // 选中的群
      this.seleceItem = item;
    },
    // 发送申请
    sendApply() {
      this.loading = true;
      // 发送申请
      setTimeout(() => {
        this.loading = false;
        // 关闭附加消息
        this.showAdditionMessage = false;
        // 关闭弹窗
        this.additionMessage = ""; // 附加消息
        // 添加群
        this.$alert("验证消息发送成功！", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
      }, 500);
      // 关闭弹窗
      const validateSysUsr = this.sysUsers.filter(
        item => item.code === "111111"
      )[0]; // 验证系统用户
      const val = {
        // 参数
        roomid: validateSysUsr._id + "-" + this.seleceItem.holderUserId._id, // 群id
        senderId: this.userInfo._id, // 发送者id
        senderName: this.userInfo.name, // 发送者名称
        senderNickname: this.userInfo.nickname, // 发送者昵称
        senderAvatar: this.userInfo.photo, // 发送者头像
        reveiverId: this.seleceItem.holderUserId._id, // 接收者id
        groupId: this.seleceItem._id, // 群id
        time: fromatTime(new Date()), // 时间
        additionMessage: this.additionMessage, // 附加消息
        status: 0, // 状态
        validateType: 1 // 验证类型
      };
      this.$socket.emit("sendValidateMessage", val); // 发送验证消息
      console.log(val);
    }
  },
  computed: {
    ...mapState("app", {
      // 全局状态
      sysUsers: "sysUsers" // 系统用户
    }),
    ...mapState("user", {
      // 用户状态
      userInfo: "userInfo" // 用户信息
    }),
    noMeSerchList() {
      // 排除自己
      return this.searchlist.filter(item => item._id !== this.userInfo._id);
    }
  }
};
</script>

<style lang="scss">
.custom-search-list-com {
  .wrapper {
    border-top: 1px solid #c0c4cc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    &:last-child {
      border-bottom: 1px solid #c0c4cc;
    }
    .details {
      display: flex;
      align-items: center;
      .avatar {
        width: 100px;
        height: 100px;
      }
      .info {
        margin-left: 27px;
        .item {
          font-family: "Helvetica, Arial, sans-serif";
          margin: 0;
          &:last-child {
            margin-top: 5px;
          }
        }
        .nickname {
          cursor: pointer;
          color: hsla(230, 84%, 63%, 1);
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
