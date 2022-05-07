<template>
  <div class="editor-blog">
    <div class="header">
      <el-input v-model="blogParams.title" />
      <el-button class="publish-btn" @click="setShowDialog(true)" type="primary">发表博客</el-button>
    </div>
    <div class="editor-area">
      <mavon-editor ref="md" v-model="blogParams.content" @imgAdd="$imgAdd" :token="token" class="container"/>
    </div>
    <meta-dialog @change="metaChange" @setShow="setShowDialog" @publish="publish" v-show="showDialog" />
  </div>
</template>

<script>
import metaDialog from "./blogMetaDialog";
import { imgRandomName, isProduction, genGuid } from "@/utils";
import { uploadImgStatusMap, server_URL, qiniu_URL } from "@/const";
import axios from "axios";
export default {
  name: "Editor",
  data() {
    return {
      token: "",
      showDialog: false,
      blogParams: {
        category: "",
        tags: [],
        cover: "",
        title: "",
        content: "",
        desc: ""
      }
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo;
    }
  },
  methods: {
    setBlogParams() {
      for (const key in this.blogParams) {
        if (this.blogParams.hasOwnProperty(key)) {
          this.blogParams[key] = "";
        }
      }
    },
    async publish() {
      const params = Object.assign({}, this.blogParams, {
        authorId: this.userInfo._id
      });
      const { data } = await this.$http.publishBlog(params);
      this.setBlogParams();
      if (data.status === 2000) {
        this.showDialog = false;
        this.$message.success("发表成功");
        this.$router.go(-1);
      }
      // this.$confirm("恭喜你，发布成功！", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "success"
      // })
      //   .then(() => {
      //     this.$router.go(-1);
      //   })
      //   .catch(() => {
      //
      //   });
      // if (data.status === 2000) {
      //   this.$confirm("恭喜你，发布成功！", "提示", {
      //     confirmButtonText: "回到列表",
      //     cancelButtonText: "取消",
      //     type: "warning"
      //   })
      //     .then(() => {
      //       this.$router.go(-1);
      //     })
      //     .catch(() => {
      //       this.setShowDialog(false);
      //     });
      // }
    },
    metaChange(type, value) {
      this.blogParams[type] = value;
    },
    setShowDialog(flag) {
      const blogParams = this.blogParams;
      if (!blogParams.title || !blogParams.content) {
        this.$message({ type: "error", message: "信息未填写完整！" });
        return;
      }
      this.showDialog = flag;
    },
    //上传图片
    $imgAdd(pos, $file) {
      const formData = new FormData();
      formData.append("file", $file);
      formData.append("token", this.token);
      axios.post(`${qiniu_URL}`, formData).then(url => {
        $vm.$img2Url(pos, url);
      });
    },
    created() {
      // 初始化
      const token = this.$$http.getQiniuToken().then(res => {
        this.token = res.data.token;
      });
      console.log(token);
    }

    // $imgAdd(pos, $file) {
    //   // 第一步.将图片上传到服务器.
    //   var formdata = new FormData();
    //   formdata.append("image", $file);
    //   formdata.append("token", this.pictoken.token);
    //   console.log(this.pictoken.token);
    //   axios({
    //     url: qiniu_URL,
    //     method: "post",
    //     data: formdata,
    //     headers: { "Content-Type": "multipart/form-data" },
    //     config: { useCdnDomain: true }
    //   }).then(url => {
    //     // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
    //     /**
    //      * $vm 指为mavonEditor实例，可以通过如下两种方式获取
    //      * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
    //      * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
    //      */
    //     $vm.$img2Url(pos, url);
    //   });
    // }
  },
  components: {
    metaDialog
  }
};
</script>

<style lang="scss">
.editor-blog {
  height: 100%;
  padding: 10px;
  .header {
    display: flex;
    margin-bottom: 10px;
    .publish-btn {
      margin-left: 10px;
    }
  }
  .editor-area {
    height: calc(100% - 50px);
    .v-note-wrapper.shadow {
      height: 100%;
    }
  }
}
</style>
