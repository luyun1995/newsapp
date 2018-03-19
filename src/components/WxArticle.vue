<template>
  <div>
    <iframe id="iframe" :src="'http://v.juhe.cn/weixin/redirect?wid='+$route.query.id" frameborder="0">1</iframe>
  </div>
</template>

<script>
  export default {
    name: "wx-article",
    created() {
      this.$emit('title', '微信精读');
    }
  }
</script>

<style scoped>
  #iframe {
    width: 100%;
    height: 600px;
  }
</style>
