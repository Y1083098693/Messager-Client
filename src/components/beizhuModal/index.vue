<template>
  <div class="beizhu-modal-cmp all0">
    <div class="beizhu hor-ver-center" v-loading="confirmLoading">
      <span class="p-r-t el-icon-close" @click="close"></span>
      <div class="header">
        <span class="title">修改备注姓名</span>
      </div>
      <div class="body">
        <el-input v-model="beizhu" />
      </div>
      <div class="footer">
        <el-button @click="ok" size="mini" type="success">确认</el-button>
        <el-button @click="close" size="mini" type="danger">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["currentConversation"],
  data() {
    return {
      confirmLoading: false,
      beizhu: this.currentConversation.beizhu // 备注姓名
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo; // 用户信息
    }
  },
  methods: {
    async ok() {
      // 确认
      this.confirmLoading = true; // 按钮加载状态
      const params = {
        // 参数
        userId: this.userInfo._id, // 用户id
        friendId: this.currentConversation._id, // 好友id
        friendBeizhu: this.beizhu // 备注姓名
      };
      await this.$http.modifyFriendBeizhu(params); // 修改备注姓名
      const userInfo = await this.$http.getUserInfo(this.userInfo._id); // 获取用户信息
      this.$store.dispatch("user/LOGIN", userInfo.data.data); // 更新用户信息
      this.$eventBus.$emit("toggleBeizhuModal", {
        show: false, // 显示隐藏
        data: {}
      });
      this.confirmLoading = false; // 按钮加载状态
    },
    close() {
      this.$eventBus.$emit("toggleBeizhuModal", {
        show: false,
        data: {
          currentConversation: {}
        }
      });
    }
  }
};
</script>

<style lang="scss">
.beizhu-modal-cmp {
  position: fixed;
  z-index: 1006;
  background-color: rgba(0, 0, 0, 0.2);
  .beizhu {
    width: 300px;
    padding: 10px 20px;
    background-color: #fff;
    border-radius: 10px;
    .body {
      margin: 10px 0;
    }
  }
}
</style>
