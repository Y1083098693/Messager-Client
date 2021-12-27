<template>
  <div class="custom-upload-img-com">
    <div class="upload-img-com-wrapper" v-show="useType !== 'slot'">
      <el-alert title="只能上传小于 1M 的图片" type="warning" effect="dark" :closable="false" />
      <div class="option">
        <label for="up-to-server">
          <i class="option-item ok el-icon-picture">上传服务器
            <input
              id="up-to-server"
              class="img-inp upload"
              type="file"
              title="选择图片"
              accept="image/png, image/jpeg, image/gif, image/jpg"
              @change="uploadServer"
            >
          </i>
        </label>
        <label for="up-to-qiniu">
          <i class="option-item ok el-icon-picture">上传七牛云
            <input
              id="up-to-qiniu"
              class="img-inp upload"
              type="file"
              title="选择图片"
              accept="image/png, image/jpeg, image/gif, image/jpg"
              @change="uploadQiniu"
            >
          </i>
        </label>
      </div>
    </div>
    <slot v-bind:trigger="customTriggerInp" />
  </div>
</template>

<script>
/**
 * 上传图片组件，支持上传方式：1.七牛云，2.本地服务器
 * props: 1.token：七牛云token，
 * emit: 1.getLocalUrl：获取图片的本地URL
 */
import { imgRandomName, isProduction, genGuid } from "@/utils";
import { uploadImgStatusMap, server_URL, qiniu_URL } from "@/const";
import { connect } from "tls";
export default {
  props: ["token", "getStatus", "getLocalUrl", "useType"],
  methods: {
    customTriggerInp() {
      // 自定义上传图片的触发事件
      const fileInp = document.querySelector("#up-to-qiniu"); // 七牛云上传
      fileInp.click(); // 触发上传
    },
    createObjetURL(file, guid) {
      // 创建图片的URL
      const url = window.URL.createObjectURL(file); // 创建图片的URL
      this.getLocalUrl(url, guid); // 获取图片的本地URL
    },
    /**上传至七牛云 */
    uploadQiniu(e) {
      const IMG_URL = qiniu_URL;
      const guid = genGuid(); // 生成guid
      const [file] = e.target.files; // 获取文件
      typeof this.getLocalUrl === "function" && this.createObjetURL(file, guid); // 创建图片的URL
      // return
      const fileType = file.type && file.type.split("/")[1]; // 获取文件类型
      const fileSize = file.size / 1024 / 1024; // 获取文件大小
      if (fileSize > 1) {
        // 判断文件大小
        this.$message.error("只能上传小于1M的图片！换一个小图片试试吧~~");
        return;
      }
      const putExtra = {
        // 上传参数
        fname: "", // 文件名
        params: "", // 参数
        mineType: ["image/png", "image/jpeg", "image/gif"] // 允许上传的文件类型
      };
      const config = {
        useCdnDomain: true // 使用七牛云的CDN域名
      };
      const error = err => {
        // 上传失败
        this.getStatus({ status: uploadImgStatusMap.error, data: err, guid }); // 获取上传状态
      };
      const next = res => {
        // 上传成功
        // console.log(res)
        this.getStatus({ status: uploadImgStatusMap.next, data: res, guid }); // 获取上传状态
      };
      const complete = res => {
        // 上传完成
        this.getStatus({
          status: uploadImgStatusMap.complete, // 上传完成
          data: res,
          guid
        });
      };
      const subObject = {
        // 上传参数
        next, // 上传成功
        error, // 上传失败
        complete // 上传完成
      };
      const imgName = imgRandomName() + "." + fileType; // 生成图片名
      const observable = window.qiniu.upload(
        file, // 文件
        imgName, // 图片名
        this.token, // 上传凭证
        putExtra, // 上传参数
        config // 上传配置
      );
      const subScription = observable.subscribe(subObject); // 订阅
    },
    /**上传至本地服务器 */
    uploadServer(e) {
      if (isProduction()) {
        // 判断是否为生产环境
        return this.$message.error("为减少服务器压力线上请上传至七牛云哟~");
      }
      const IMG_URL = server_URL; // 图片上传地址
      const guid = genGuid(); // 生成guid
      const [file] = e.target.files; // 获取文件
      typeof this.getLocalUrl === "function" && this.createObjetURL(file, guid); // 创建图片的URL
      const fileType = file.type && file.type.split("/")[1]; // 获取文件类型
      const fileSize = file.size / 1024 / 1024; // 获取文件大小
      const formdata = new FormData(); // 创建formdata
      formdata.append("file", file); // 添加文件
      this.$http.uploadFile(formdata).then(res => {
        // 上传图片
        console.log("上传文件结果", res); // 打印结果
        const { data } = res; // 获取数据
        if (data.status === 2000) {
          // 判断是否上传成功
          this.getStatus({
            // 获取上传状态
            status: uploadImgStatusMap.server_complete,
            data: { key: data.data },
            guid
          });
        } else {
          console.log(res);
        }
      });
    }
  }
};
</script>

<style lang="scss">
.custom-upload-img-com {
  width: 270px;
  background-color: #fff;
  .upload-img-com-wrapper {
    padding: 10px;
    .option {
      margin-top: 10px;
      text-align: right;
      .option-item {
        display: inline-block;
        padding: 5px;
        background-color: #c35673;
        color: #fff;
        height: 40px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
        border-radius: 5px;
        &::before {
          margin-right: 5px;
        }
      }
      .img-inp {
        display: none;
      }
    }
  }
}
</style>
