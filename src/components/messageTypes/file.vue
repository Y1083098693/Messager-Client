<template>
  <div class="message-type__file">
  
    <span>{{message.message}}</span>
  </div>
</template>

<script>
import "./../../../static/iconfont/iconfont.css";
import "./../../../static/css/animation.scss";
import picturePreview from "@/components/picturePreview";
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
    setshowPicturePreview(flag) {
      this.showPicturePreview = flag;
    },
    load() {
      this.FileLoading = false;
    },
    imgError() {
      this.FileLoading = false;
    }
  },
  components: {
    picturePreview
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
