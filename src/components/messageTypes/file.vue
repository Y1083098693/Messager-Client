<template>
  <div class="message-type__file">
    <!-- <img v-show="!FileLoading" height="200" style="cursor: zoom-in" :src="message.message" alt="图片加载失败" @load="load" @click="setshowPicturePreview(true)" @error="imgError">
    <div v-if="FileLoading" class="img-loading-tips"></div>
    <div v-if="message.uploading && !message.uploadPercent" class="all0 img-cover">图片上传中...</div>
    <div v-if="message.uploadPercent" class="all0 img-cover progress">
      <div class="content">
        <el-progress :width="50" type="circle" :percentage="message.uploadPercent"></el-progress>
      </div>
    </div>
    <transition name="fade">
      <file-preview
        v-if="showFilePreview"
        :img-list="FileUrlList"
        @setshow="setshowFilePreview"
      />
    </transition> -->
    <img src="../../assets/file.png" alt="" class="fileImage">
    <span class="fileWord">
      <div :title="message.message">{{message.message.lastIndexOf('.') > 12 ? message.message.slice(0, 12) +
        '...' + message.message.slice(message.message.lastIndexOf('.')) : message.message}}</div>
      <div class="fileMessageSendSuccess">
        发送成功
      <i class="el-icon-success"></i>
      </div>
    </span>
    <!-- <span>{{message.message}}</span> -->
  </div>
</template>

<script>
import "./../../../static/iconfont/iconfont.css";
import "./../../../static/css/animation.scss";
import FilePreview from "@/components/picturePreview";
export default {
  props: ["message", "fileTypeMsgList"],
  data() {
    return {
      showPicturePreview: false,
      FileLoading: true
    };
  },
  computed: {
    FileUrlList() {
      return (this.FileTypeMsgList || []).map(item => item.message);
    }
  },
  methods: {
    setshowFilePreview(flag) {
      this.showFilePreview = flag;
    },
    load() {
      this.FileLoading = false;
    },
    imgError() {
      this.FileLoading = false;
    }
  },
  components: {
    FilePreview
  }
};
</script>

<style lang="scss">
.message-type__img {
  position: relative;
  img {
    background-color: #f2f2f2;
  }
  .img-cover {
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.2);
    color: #fff;
    &.progress {
      .content {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 5px;
        .el-progress {
          // flex: 1;
          .el-progress__text {
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
