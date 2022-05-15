<template>
  <div class="copyright-cmp">
    <p class="copyright-item">Copyright© 2021-{{endTime}}</p> 
      <p class="copyright-item">WeChat • Powered by Hz1</p>
      <p class="copyright-item"><a href="http://beian.miit.gov.cn" class="copyright-item1">备案号:桂ICP备2022003755号</a></p>
      <p class="copyright-item">Email:cn18077566421@gmail.com</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      endTime: new Date().getFullYear()
    };
  }
};
</script>

<style lang="scss">
.copyright-cmp {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  .copyright-item {
    margin: 0 0 5px;
    color: #ffffff;
    font-size: 14px;
  }
  .copyright-item1 {
    color: #ffffff;
    font-size: 14px;
  }
}
</style>
